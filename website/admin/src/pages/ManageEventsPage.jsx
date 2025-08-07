import React from 'react';
import { Link } from 'react-router-dom';
import { eventData } from '../eventData'; // Import our mock data

const ManageEventsPage = () => {
    const eventTypes = Object.values(eventData);

    return (
        <div>
            <h1 className="admin-page-header">Manage Event Types</h1>
            <div className="event-type-grid">
                {eventTypes.map(event => (
                    <Link to={`/admin/events/${event.id}`} key={event.id} className="event-type-card">
                        <img src={event.image} alt={event.title} />
                        <div className="event-type-card-content">
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ManageEventsPage;
