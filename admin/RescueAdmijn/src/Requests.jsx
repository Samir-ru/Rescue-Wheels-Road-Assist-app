// Requests.js
import React, { useState, useEffect } from 'react';
import location from './assets/location.png'

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('http://localhost:3000/Service');
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      } else {
        console.error('Error fetching requests:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/Service/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // Remove the deleted request from the state
        setRequests(prevRequests => prevRequests.filter(request => request._id !== id));
      } else {
        console.error('Error deleting request:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  return (
    <div>
      <h2>Service Requests</h2>
      <div>
        {requests.map(request => (
          <div key={request._id} className='request'>
            <p>{request.serviceType} Request <br />
            <span>ID:{request._id}</span>
            </p>

            <div className='inner'>
              <a href={`https://www.google.com/maps/search/?api=1&query=${request.latitude},${request.longitude}`} target="_blank" rel="noopener noreferrer">
                <img src={location} style={{ height: 50 }} alt="location" />
              </a>
              <button onClick={() => handleDelete(request._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
