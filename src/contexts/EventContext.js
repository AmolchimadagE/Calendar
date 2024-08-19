import React, { createContext, useState, useEffect } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events'));
    if (storedEvents && storedEvents.length > 0) {
      setEvents(storedEvents);
    } else {
      // Add default events in different months
      const defaultEvents = [
        {
          id: 1,
          title: "Team Meeting",
          date: "2024-08-15",
          category: "Work"
        },
        {
          id: 2,
          title: "Family Picnic",
          date: "2024-09-05",
          category: "Personal"
        },
        {
          id: 3,
          title: "Conference",
          date: "2024-10-20",
          category: "Work"
        },
        {
          id: 4,
          title: "Birthday Party",
          date: "2024-11-10",
          category: "Personal"
        }
      ];
      setEvents(defaultEvents);
      localStorage.setItem('events', JSON.stringify(defaultEvents));
    }
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