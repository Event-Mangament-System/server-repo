import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn');
        navigate('/login');
    };
    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">Admin<span>Panel</span></div>
            <ul className="sidebar-nav">
                <li><NavLink to="/admin/dashboard">Booked Events</NavLink></li>
                {/* --- ADD THIS NEW LINK --- */}
                <li><NavLink to="/admin/events">Manage Events</NavLink></li>
                <li><NavLink to="/admin/venues">Venues</NavLink></li>
                <li><NavLink to="/admin/availability">Availability</NavLink></li>
            </ul>
            <ul className="sidebar-nav" style={{ marginTop: 'auto' }}>
                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </aside>
    );
};
export default Sidebar;