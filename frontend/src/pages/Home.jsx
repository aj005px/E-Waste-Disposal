import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="container">
      <div className="page-header">
        <h1>Electronic Appliance Disposal System</h1>
        <p>Dispose of your electronic appliances responsibly and protect the environment</p>
      </div>

      <section className="section">
        <div className="card">
          <h2>🌍 The E-Waste Problem</h2>
          <p>
            Electronic waste (e-waste) is one of the fastest-growing waste streams in the world. 
            With the rapid advancement of technology, millions of electronic devices become obsolete 
            each year, creating a significant environmental challenge.
          </p>
          <p>
            Improper disposal of electronic appliances can lead to:
          </p>
          <ul className="problem-list">
            <li>🔋 Release of toxic chemicals like lead, mercury, and cadmium into soil and water</li>
            <li>🌱 Environmental pollution and damage to ecosystems</li>
            <li>👥 Health risks to communities, especially those involved in informal recycling</li>
            <li>💎 Loss of valuable materials like gold, silver, copper, and rare earth elements</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2>💚 Why Responsible Disposal Matters</h2>
          <p>
            Responsible e-waste management is crucial for sustainable development. By disposing 
            of electronic appliances properly, we can:
          </p>
          <ul className="benefit-list">
            <li>✅ Prevent environmental contamination and protect natural resources</li>
            <li>✅ Recover valuable materials through recycling and reduce mining demand</li>
            <li>✅ Enable reuse and donation of working appliances to those in need</li>
            <li>✅ Ensure safe handling of hazardous components by trained professionals</li>
            <li>✅ Contribute to a circular economy and sustainable future</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2 style={{textAlign: 'center', marginBottom: '1.5rem'}}>Get Started</h2>
        <div className="grid">
          <div className="card action-card">
            <h3>📝 Submit Disposal Request</h3>
            <p>Tell us about your electronic appliance and we'll provide guidance on proper disposal.</p>
            <Link to="/dispose" className="btn">Dispose an Appliance</Link>
          </div>
          <div className="card action-card">
            <h3>📍 Find Collection Centres</h3>
            <p>Locate authorised e-waste collection centres near your area (demonstration data).</p>
            <Link to="/centres" className="btn">View Centres</Link>
          </div>
          <div className="card action-card">
            <h3>📚 Learn More</h3>
            <p>Understand disposal guidelines and get practical recycling tips for e-waste.</p>
            <Link to="/awareness" className="btn">Awareness Section</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
