import React, { useState, useEffect } from 'react';

const API = 'http://localhost:5001';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const login = async () => {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      setLoggedIn(true);
      fetchItems();
    } else {
      alert('Invalid credentials');
    }
  };

  const fetchItems = async () => {
    const res = await fetch(`${API}/items`);
    const data = await res.json();
    setItems(data);
  };

  const createItem = async () => {
    const res = await fetch(`${API}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newItem })
    });
    const item = await res.json();
    setItems([...items, item]);
    setNewItem('');
  };

  const updateItem = async (id) => {
    const res = await fetch(`${API}/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editValue })
    });
    const updated = await res.json();
    setItems(items.map(i => i.id === id ? updated : i));
    setEditIndex(null);
  };

  const deleteItem = async (id) => {
    await fetch(`${API}/items/${id}`, { method: 'DELETE' });
    setItems(items.filter(i => i.id !== id));
  };

  if (!loggedIn) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Login</h2>
        <input
          data-testid="username-input"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          data-testid="login-btn"
          onClick={login}
        >Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Item List</h2>
      <input
        data-testid="new-item-input"
        placeholder="New item name"
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
      />
      <button
        data-testid="add-btn"
        onClick={createItem}
      >Add</button>
      <ul>
        {items.map(i => (
          <li
            key={i.id}
            role="listitem"
            aria-label={i.name}
            data-testid={`item-${i.id}`}
          >
            {editIndex === i.id ? (
              <>
                <input
                  data-testid="edit-input"
                  placeholder="Edit item name"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                />
                <button
                  data-testid="save-btn"
                  onClick={() => updateItem(i.id)}
                >Save</button>
              </>
            ) : (
              <>
                <span data-testid="item-name">{i.name}</span>
                <button
                  data-testid="edit-btn"
                  onClick={() => {
                    setEditIndex(i.id);
                    setEditValue(i.name);
                  }}
                >Edit</button>
              </>
            )}
            <button
              data-testid="delete-btn"
              onClick={() => deleteItem(i.id)}
            >Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
