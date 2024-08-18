import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import EventDetails from './components/EventDetails';
import { EventProvider } from './contexts/EventContext';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: pink;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [filter, setFilter] = useState('All');

  const handleEdit = (event) => {
    setEditingEvent(event);
    setIsAddingEvent(true);
  };

  return (
    <EventProvider>
      <AppContainer>
        <h1>Calendar App</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
        </select>
        <button onClick={() => {setIsAddingEvent(true); setEditingEvent(null);}}>Add Event</button>
        <Calendar filter={filter} onSelectEvent={setSelectedEvent} />
        {isAddingEvent && (
          <Modal>
            <EventForm 
              event={editingEvent} 
              onCancel={() => {setIsAddingEvent(false); setEditingEvent(null);}} 
            />
          </Modal>
        )}
        {selectedEvent && (
          <EventDetails
            event={selectedEvent}
            onEdit={() => handleEdit(selectedEvent)}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AppContainer>
    </EventProvider>
  );
}

export default App;