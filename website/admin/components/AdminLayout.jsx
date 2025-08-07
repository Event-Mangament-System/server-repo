import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="admin-layout">
            <button className="mobile-menu-toggle" onClick={toggleSidebar}>
                <div style={{ width: '20px', height: '2px', background: 'white', margin: '4px 0' }}></div>
                <div style={{ width: '20px', height: '2px', background: 'white', margin: '4px 0' }}></div>
                <div style={{ width: '20px', height: '2px', background: 'white', margin: '4px 0' }}></div>
            </button>
            <Sidebar isOpen={isSidebarOpen} />
            {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};
export default AdminLayout;
