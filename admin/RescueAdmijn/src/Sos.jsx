import React, { useState, useEffect } from 'react';
import location from './assets/location.png';

const Sos = () => {
  const [sosData, setSosData] = useState([]);

  useEffect(() => {
    fetchSosRequests();
  }, []);

  const fetchSosRequests = async () => {
    try {
      const response = await fetch('http://localhost:3000/SOS');
      if (response.ok) {
        const data = await response.json();
        setSosData(data);
      } else {
        console.error('Error fetching SOS requests:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching SOS requests:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/SOS/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // Remove the deleted SOS request from the state
        setSosData(prevSosData => prevSosData.filter(sos => sos._id !== id));
      } else {
        console.error('Error deleting SOS request:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting SOS request:', error);
    }
  };

  return (
    <div>
      <h2>SOS Requests</h2>
      <div>
        {sosData.map((sos, index) => (
          <div key={index} className='request'>
            <p>
              SOS Request <br />
              <span>Id: {sos._id}</span>
            </p>
            <div className='inner'>
              <a href={`https://www.google.com/maps/search/?api=1&query=${sos.latitude},${sos.longitude}`} target="_blank" rel="noopener noreferrer">
                <img src={location} style={{ height: 50 }} alt="location" />
              </a>
              <button onClick={() => handleDelete(sos._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sos;
