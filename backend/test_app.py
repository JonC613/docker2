import unittest
import json
import os
from app import app, db, Item

class FlaskApiTest(unittest.TestCase):
    def setUp(self):
        # Set up test client and use in-memory database for testing
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.client = app.test_client()
        
        with app.app_context():
            db.create_all()
            
    def tearDown(self):
        # Clean up after each test
        with app.app_context():
            db.session.remove()
            db.drop_all()
    
    def test_hello_world(self):
        # Test the hello world endpoint
        response = self.client.get('/api/hello')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'Hello, World!')
    
    def test_create_item(self):
        # Test creating a new item
        response = self.client.post(
            '/api/items',
            data=json.dumps({'name': 'Test Item', 'description': 'Test Description'}),
            content_type='application/json'
        )
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(data['name'], 'Test Item')
        self.assertEqual(data['description'], 'Test Description')
        
    def test_get_items(self):
        # Add a test item and then retrieve all items
        with app.app_context():
            item = Item(name='Test Item', description='Test Description')
            db.session.add(item)
            db.session.commit()
        
        response = self.client.get('/api/items')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['name'], 'Test Item')
        
    def test_get_item(self):
        # Add a test item and then retrieve it by ID
        with app.app_context():
            item = Item(name='Test Item', description='Test Description')
            db.session.add(item)
            db.session.commit()
            item_id = item.id
        
        response = self.client.get(f'/api/items/{item_id}')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['name'], 'Test Item')
        
    def test_update_item(self):
        # Add a test item, then update it
        with app.app_context():
            item = Item(name='Test Item', description='Test Description')
            db.session.add(item)
            db.session.commit()
            item_id = item.id
        
        response = self.client.put(
            f'/api/items/{item_id}',
            data=json.dumps({'name': 'Updated Item', 'description': 'Updated Description'}),
            content_type='application/json'
        )
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['name'], 'Updated Item')
        self.assertEqual(data['description'], 'Updated Description')
        
    def test_delete_item(self):
        # Add a test item, then delete it
        with app.app_context():
            item = Item(name='Test Item', description='Test Description')
            db.session.add(item)
            db.session.commit()
            item_id = item.id
        
        response = self.client.delete(f'/api/items/{item_id}')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'Item deleted')
        
        # Verify item no longer exists
        response = self.client.get(f'/api/items/{item_id}')
        self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
    unittest.main()
