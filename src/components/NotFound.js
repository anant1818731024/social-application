import React from 'react';
import '../styles/NotFound.css'; // Import the CSS file for styling

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h2 className="not-found-heading">404 - Not Found</h2>
      <p className="not-found-text">The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;