import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default calendar styling

// Placeholder for dates that are already booked
const bookedDates = [
    new Date(2025, 9, 15), // Note: Month is 0-indexed (9 = October)
    new Date(2025, 10, 5),
    new Date(2025, 8, 20),
];

const AvailabilityPage = () => {
    const [date, setDate] = useState(new Date());

    // Function to add a custom class to booked dates
    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            if (bookedDates.some(bookedDate => 
                date.getFullYear() === bookedDate.getFullYear() &&
                date.getMonth() === bookedDate.getMonth() &&
                date.getDate() === bookedDate.getDate()
            )) {
                return 'booked-day';
            }
        }
    };

    return (
        <div>
            <h1 className="admin-page-header">Venue Availability Calendar</h1>
            <div className="content-container availability-container">
                <Calendar
                    onChange={setDate}
                    value={date}
                    tileClassName={tileClassName}
                />
                <div className="availability-details">
                    <h2>Selected Date</h2>
                    <p>{date.toDateString()}</p>
                    <p>Check the calendar for dates marked in red (booked).</p>
                </div>
            </div>
        </div>
    );
};

export default AvailabilityPage;