import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [contactMessages, setContactMessages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/Contact')
      .then(response => response.json())
      .then(data => {
        setContactMessages(data);
      })
      .catch(error => console.error('Error fetching contact messages:', error));
  }, []);

  return (
    <div>
      <h2>Contact Messages</h2>
      <div>
        {contactMessages.map((message, index) => (
          <div key={index} className='contact'>
            <p>From: {message.email}</p>
            <p>subject: {message.subject}</p>
            <p>Message: {message.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
