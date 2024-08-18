import React, { createContext, useState, useEffect } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};