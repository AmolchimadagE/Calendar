import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { EventContext } from '../contexts/EventContext';

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MonthContainer = styled.div`
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
  background-color: ${props => props.category === 'Work' ? '#ffd700' : '#98fb98'};
  margin: 2px 0;
  padding: 2px;
  font-size: 12px;
  cursor: pointer;
`;

const MonthTitle = styled.h2`
  text-align: center;
`;

const MonthSelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

function Calendar({ filter, onSelectEvent }) {
  const { events } = useContext(EventContext);
  const [currentDate, setCurrentDate] = useState(new Date());

  const filteredEvents = filter === 'All' ? events : events.filter(event => event.category === filter);

  const changeMonth = (increment) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + increment);
      return newDate;
    });
  };

  const renderMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    return (
      <>
        <MonthSelector>
          <button onClick={() => changeMonth(-1)}>Previous</button>
          <MonthTitle>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</MonthTitle>
          <button onClick={() => changeMonth(1)}>Next</button>
        </MonthSelector>
        <MonthContainer>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <Day key={day}>{day}</Day>
          ))}
          {Array.from({ length: firstDay }, (_, i) => <Day key={`empty-${i}`} />)}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = filteredEvents.filter(event => event.date === date);
            return (
              <Day key={day}>
                <div>{day}</div>
                {dayEvents.map(event => (
                  <Event 
                    key={event.id} 
                    onClick={() => onSelectEvent(event)}
                    category={event.category}
                  >
                    {event.title}
                  </Event>
                ))}
              </Day>
            );
          })}
        </MonthContainer>
      </>
    );
  };

  return (
    <CalendarContainer>
      {renderMonth()}
    </CalendarContainer>
  );
}

export default Calendar;