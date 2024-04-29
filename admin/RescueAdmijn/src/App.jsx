// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import SOS from './Sos.jsx';
import Requests from './Requests.jsx';
import Users from './Users.jsx';
import Contacts from './Contact.jsx';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/sos" element={<SOS />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/users" element={<Users />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/" element={<SOS />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
