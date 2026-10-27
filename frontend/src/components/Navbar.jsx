import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          ♻️ E-Waste Disposal System
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/dispose" className="nav-link">Dispose Appliance</Link>
          </li>
          <li className="nav-item">
            <Link to="/guidance" className="nav-link">Guidance</Link>
          </li>
          <li className="nav-item">
            <Link to="/centres" className="nav-link">Collection Centres</Link>
          </li>
          <li className="nav-item">
            <Link to="/requests" className="nav-link">My Requests</Link>
          </li>
          <li className="nav-item">
            <Link to="/awareness" className="nav-link">Awareness</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
