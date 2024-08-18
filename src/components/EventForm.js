import React, { useState, useContext, useEffect } from 'react';
import { EventContext } from '../contexts/EventContext';

function EventForm({ event, onCancel }) {
  const { addEvent, updateEvent } = useContext(EventContext);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Personal');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDate(event.date);
      setCategory(event.category);
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { id: event ? event.id : Date.now(), title, date, category };
    if (event) {
      updateEvent(newEvent);
    } else {
      addEvent(newEvent);
    }
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event Title"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
      </select>
      <button type="submit">{event ? 'Update' : 'Add'} Event</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default EventForm;