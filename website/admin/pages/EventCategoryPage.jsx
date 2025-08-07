import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventData } from '../eventData'; // Import our mock data

const EventCategoryPage = () => {
    // Get the dynamic part of the URL (e.g., 'weddings')
    const { eventType } = useParams();
    const currentEvent = eventData[eventType];

    // Handle cases where the event type doesn't exist
    if (!currentEvent) {
        return (
            <div>
                <h1 className="admin-page-header">Event Not Found</h1>
                <p>The event category you are looking for does not exist.</p>
                <Link to="/admin/events">← Back to All Events</Link>
            </div>
        );
    }

    // Function to format price nicely
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div>
            <Link to="/admin/events" className="back-link">← Back to All Event Types</Link>
            <h1 className="admin-page-header">{currentEvent.title}</h1>

            <div className="sub-category-grid">
                {currentEvent.subCategories.map(sub => (
                    <div key={sub.id} className="sub-category-card">
                        <img src={sub.photo} alt={sub.name} />
                        <div className="sub-category-card-content">
                            <h3>{sub.name}</h3>
                            <p className="description">{sub.description}</p>
                            <p className="price">{formatPrice(sub.price)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventCategoryPage;