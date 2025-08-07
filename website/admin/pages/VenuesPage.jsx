import React from 'react';

// Placeholder data
const venues = [
    { id: 1, name: 'Grand Ballroom', capacity: 500, location: 'Downtown City', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd51622?auto=format&fit=crop&w=800&q=60' },
    { id: 2, name: 'Seaside Pavilion', capacity: 150, location: 'Oceanfront', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=60' },
    { id: 3, name: 'The Garden Tent', capacity: 250, location: 'Botanical Gardens', img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=60' },
];

const VenuesPage = () => {
    return (
        <div>
            <h1 className="admin-page-header">Manage Venues</h1>
            <div className="venue-grid">
                {venues.map(venue => (
                    <div key={venue.id} className="venue-card">
                        <img src={venue.img} alt={venue.name} />
                        <div className="venue-card-content">
                            <h3>{venue.name}</h3>
                            <p><strong>Location:</strong> {venue.location}</p>
                            <p><strong>Capacity:</strong> {venue.capacity} guests</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VenuesPage;
