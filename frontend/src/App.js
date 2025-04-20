import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    // Fetch hello message
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => {
        console.error('Error fetching hello message:', error);
        setMessage('Failed to load message');
      });
    
    // Fetch items
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch('/api/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching items:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingItem({ ...editingItem, [name]: value });
  };

  const createItem = (e) => {
    e.preventDefault();
    fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    })
      .then(response => response.json())
      .then(data => {
        setItems([...items, data]);
        setNewItem({ name: '', description: '' });
      })
      .catch(error => console.error('Error creating item:', error));
  };

  const startEditing = (item) => {
    setEditingItem({ ...item });
  };

  const updateItem = (e) => {
    e.preventDefault();
    fetch(`/api/items/${editingItem.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingItem)
    })
      .then(response => response.json())
      .then(data => {
        setItems(items.map(item => item.id === data.id ? data : item));
        setEditingItem(null);
      })
      .catch(error => console.error('Error updating item:', error));
  };

  const deleteItem = (id) => {
    fetch(`/api/items/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Docker App</h1>
        <p>{message}</p>
      </header>
      
      <div className="container mt-4">
        <h2>Items List</h2>
        
        {/* Create New Item Form */}
        <div className="card mb-4">
          <div className="card-header">Add New Item</div>
          <div className="card-body">
            <form onSubmit={createItem}>
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description:</label>
                <textarea 
                  className="form-control"
                  name="description"
                  value={newItem.description}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">Create Item</button>
            </form>
          </div>
        </div>
        
        {/* Edit Item Form */}
        {editingItem && (
          <div className="card mb-4">
            <div className="card-header">Edit Item</div>
            <div className="card-body">
              <form onSubmit={updateItem}>
                <div className="mb-3">
                  <label className="form-label">Name:</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="name"
                    value={editingItem.name}
                    onChange={handleEditInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description:</label>
                  <textarea 
                    className="form-control"
                    name="description"
                    value={editingItem.description}
                    onChange={handleEditInputChange}
                  />
                </div>
                <button type="submit" className="btn btn-success me-2">Save Changes</button>
                <button type="button" className="btn btn-secondary" onClick={() => setEditingItem(null)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
        
        {/* Items List */}
        {items.length === 0 ? (
          <p>No items found. Add a new item above.</p>
        ) : (
          <div className="list-group">
            {items.map(item => (
              <div key={item.id} className="list-group-item">
                <h5>{item.name}</h5>
                <p>{item.description}</p>
                <p><small>Created: {new Date(item.created_at).toLocaleString()}</small></p>
                <div>
                  <button className="btn btn-sm btn-info me-2" onClick={() => startEditing(item)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteItem(item.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
