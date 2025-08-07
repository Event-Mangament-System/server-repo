import React from 'react';

// Placeholder data - in a real app, this would come from an API
const bookings = [
    { id: 'BK001', user: 'Alice Johnson', email: 'alice@example.com', venue: 'Grand Ballroom', date: '2025-10-15', status: 'Confirmed' },
    { id: 'BK002', user: 'Bob Williams', email: 'bob@example.com', venue: 'Seaside Pavilion', date: '2025-11-05', status: 'Pending' },
    { id: 'BK003', user: 'Charlie Brown', email: 'charlie@example.com', venue: 'The Garden Tent', date: '2025-09-20', status: 'Confirmed' },
];

const BookedEventsPage = () => {
    return (
        <div>
            <h1 className="admin-page-header">Booked Events</h1>
            <div className="data-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Venue</th>
                            <th>Event Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.user}</td>
                                <td>{booking.email}</td>
                                <td>{booking.venue}</td>
                                <td>{booking.date}</td>
                                <td><span className={`status-badge status-${booking.status}`}>{booking.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookedEventsPage;
