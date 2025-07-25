import React from 'react'
import { useNavigate } from 'react-router';
import "./eventcard.css";

function Eventcard({ event }) {
    const navigate = useNavigate();
  return (
    <div className='"event-card' onClick={(e) => {
        navigate(`/event/${event._id}`);
    }}>
      <img src={event.image} alt={event.title} className='event-card__image' />
      <div className="event-card"__content>
        <h3>{event.title}</h3>
        <p>
            {event.description.length > 15 
            ? `${event.description.slice(0, 15)}...`
            : event.description}
        </p>
        <p>Date: {new Date(event.date).toLocaleDateString()}</p>
        <p>Time: {event.time}</p>
      </div>
    </div>
  );
}

export default Eventcard;