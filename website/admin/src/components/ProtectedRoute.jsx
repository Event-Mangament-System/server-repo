import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

    if (!isLoggedIn) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to. This is a good practice for user experience.
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;