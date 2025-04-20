import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => {
        console.error('Error fetching data:', error);
        setMessage('Failed to load message');
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Docker App</h1>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
