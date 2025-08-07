import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css'; 

// Import Layouts and Pages
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import BookedEventsPage from './pages/BookedEventsPage';
import VenuesPage from './pages/VenuesPage';
import AvailabilityPage from './pages/AvailabilityPage';
// --- IMPORT THE TWO NEW PAGES ---
import ManageEventsPage from './pages/ManageEventsPage';
import EventCategoryPage from './pages/EventCategoryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/admin" 
          element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
        >
          <Route path="dashboard" element={<BookedEventsPage />} />
          <Route path="venues" element={<VenuesPage />} />
          <Route path="availability" element={<AvailabilityPage />} />
          
          {/* --- ADD THE NEW ROUTES HERE --- */}
          {/* This is the main page for selecting an event type */}
          <Route path="events" element={<ManageEventsPage />} />
          {/* This is the dynamic page for viewing sub-categories */}
          <Route path="events/:eventType" element={<EventCategoryPage />} />
          
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;