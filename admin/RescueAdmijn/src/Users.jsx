// RequestUsers.js
import React, { useState, useEffect } from 'react';

const Users = () => {
  const [requestUsers, setRequestUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/RequestUsers')
      .then(response => response.json())
      .then(data => {
        setRequestUsers(data);
      })
      .catch(error => console.error('Error fetching request users:', error));
  }, []);

  return (
    <div>
      <h2>Request Users</h2>
      <div>
        {requestUsers.map((user, index) => (
          <div key={index} className='contact'>
            <p>Name: {user.fullName}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
            <p>Phone:{user.Number}</p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
