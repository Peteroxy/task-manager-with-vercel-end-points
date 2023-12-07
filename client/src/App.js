

import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [creationDate, setCreationDate] = useState(getCurrentDate());
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');
  const [updateCreationDate, setUpdateCreationDate] = useState('');

  function getCurrentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  }

  // Add new todo item to the database
  const addItem = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please fill in both title and description fields.');
      return;
    }
  
    try {
      const res = await axios.post('http://localhost:5500/api/item', {
        title,
        description,
        status,
        creationDate,
      });
      setListItems((prev) => [...prev, res.data]);
      setTitle('');
      setDescription('');
      setStatus('pending'); // Reset status to 'pending' after adding item
    } catch (err) {
      console.log(err);
    }
    alert('item added to list')
  };


  // Create function to fetch all todo items from the database -- useEffect hook
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get('http://localhost:5500/api/items');
        setListItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
  }, []);

  // Delete item when clicking on delete
  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5500/api/item/${id}`);
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
    } catch (err) {
      console.log(err);
    }
    alert('item deleted from list sucesssfully')
  };

  // Update item
  const updateItem = async (e) => {
    e.preventDefault();
  
    const originalItem = listItems.find((item) => item._id === isUpdating);
  
    const updatedItem = {
      title: updateTitle || originalItem.title,
      description: updateDescription || originalItem.description,
      status: updateStatus || originalItem.status,
      creationDate: updateCreationDate || originalItem.creationDate,
    };
  
    try {
      await axios.put(`http://localhost:5500/api/item/${isUpdating}`, updatedItem);
      const updatedListItems = listItems.map((item) =>
        item._id === isUpdating ? { ...item, ...updatedItem } : item
      );
      setListItems(updatedListItems);
      setIsUpdating('');
      setUpdateTitle('');
      setUpdateDescription('');
      setUpdateStatus('');
      setUpdateCreationDate('');
    } catch (err) {
      console.log(err);
    }
    alert('item updated sucessfully')
  };

  // Before updating item, show an input field where we will create our updated item
  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e) => updateItem(e)}>
      <label>
        New Title:
        <input
          className="update-new-input"
          type="text"
          placeholder="New Title"
          onChange={(e) => setUpdateTitle(e.target.value)}
          value={updateTitle}
        />
      </label>
      <label>
        New Description:
        <input
          className="update-new-input"
          type="text"
          placeholder="New Description"
          onChange={(e) => setUpdateDescription(e.target.value)}
          value={updateDescription}
        />
      </label>
      <label>
        New Status:
        <input
          className="update-new-input"
          type="text"
          placeholder="New Status"
          onChange={(e) => setUpdateStatus(e.target.value)}
          value={updateStatus}
        />
      </label>
      <label>
        New Creation Date:
        <input
          className="update-new-input"
          type="date"
          placeholder="New Creation Date"
          onChange={(e) => setUpdateCreationDate(e.target.value)}
          value={updateCreationDate}
        />
      </label>
      <button className="update-new-btn" type="submit">
        Update
      </button>
    </form>
  );

  return (
    <div className="App">
      <h1>Todo List - {getCurrentDate()}</h1>
      <form className="form" onSubmit={(e) => addItem(e)}>
        <label>
          Title:
          <input
            type="text"
            placeholder="Add Todo Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            placeholder="Add Todo Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </label>
        <label>
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <label>
          Creation Date:
          <input
            type="date"
            placeholder="Add Todo Creation Date"
            onChange={(e) => setCreationDate(e.target.value)}
            value={creationDate}
          />
        </label>
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {listItems.map((item) => (
          <div className="todo-item" key={item._id}>
            {isUpdating === item._id ? (
              renderUpdateForm()
            ) : (
              <>
                <p className="item-content">
                  <strong>Title:</strong> {item.title} <br />
                  <strong>Description:</strong> {item.description} <br />
                  <strong>Status:</strong> {item.status} <br />
                  <strong>Creation Date:</strong> {item.creationDate}
                </p>
                <button className="update-item" onClick={() => setIsUpdating(item._id)}>
                  Update
                </button>
                <button className="delete-item" onClick={() => deleteItem(item._id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
