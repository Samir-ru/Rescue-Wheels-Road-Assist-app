import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


export default function NavBar() {
  return (
    <nav className='nav'>
    <ul>
      <li>
        <Link to="/sos" className='link'>SOS</Link>
      </li>
      <li>
        <Link to="/requests" className='link'>Requests</Link>
      </li>
      <li>
        <Link to="/users" className='link'>Users</Link>
      </li>
      <li>
        <Link to="/contacts" className='link'>Contacts</Link>
      </li>
    </ul>
  </nav>
  )
}
