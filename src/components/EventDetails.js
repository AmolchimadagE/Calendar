import React, { useContext } from 'react';
import styled from 'styled-components';
import { EventContext } from '../contexts/EventContext';

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

function EventDetails({ event, onEdit, onClose }) {
  const { deleteEvent } = useContext(EventContext);

  const handleDelete = () => {
    deleteEvent(event.id);
    onClose();
  };

  return (
    <Modal>
      <h2>{event.title}</h2>
      <p>Date: {event.date}</p>
      <p>Category: {event.category}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
}

export default EventDetails;