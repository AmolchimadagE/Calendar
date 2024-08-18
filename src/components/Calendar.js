import React, { useContext } from 'react';
import styled from 'styled-components';
import { EventContext } from '../contexts/EventContext';

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const Day = styled.div`
  border: 1px solid #ccc;
  padding: 5px;
  min-height: 100px;
`;

const Event = styled.div`
  background-color: #f0f0f0;
  margin: 2px 0;
  padding: 2px;
  font-size: 12px;
  cursor: pointer;
`;

function Calendar({ filter, onSelectEvent }) {
  const { events } = useContext(EventContext);

  const filteredEvents = filter === 'All' ? events : events.filter(event => event.category === filter);

  return (
    <CalendarContainer>
      {Array.from({ length: 30 }, (_, i) => (
        <Day key={i + 1}>
          <div>{i + 1}</div>
          {filteredEvents
            .filter(event => new Date(event.date).getDate() === i + 1)
            .map(event => (
              <Event key={event.id} onClick={() => onSelectEvent(event)}>
                {event.title}
              </Event>
            ))}
        </Day>
      ))}
    </CalendarContainer>
  );
}

export default Calendar;