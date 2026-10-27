import React from 'react'
import { Link } from 'react-router-dom'
import './Guidance.css'

function Guidance() {
  return (
    <div className="container">
      <div className="page-header">
        <h1>Disposal Guidance</h1>
        <p>Recommendations based on your appliance condition</p>
      </div>

      <div className="guidance-grid">
        <div className="card guidance-card working">
          <div className="guidance-header">
            <h2>✅ Working Appliances</h2>
            <span className="guidance-badge working-badge">REUSE/DONATION FIRST</span>
          </div>
          <p className="guidance-intro">
            If your electronic appliance is still in working condition, the best option is to extend its life through reuse or donation.
          </p>
          <h3>Recommended Actions:</h3>
          <ul className="guidance-list">
            <li>🏫 <strong>Donate to schools/colleges:</strong> Many educational institutions need working electronics</li>
            <li>🤝 <strong>NGOs and Charities:</strong> Organizations often accept working appliances for underprivileged communities</li>
            <li>👥 <strong>Family/Friends:</strong> Check if someone you know needs the appliance</li>
            <li>🛒 <strong>Sell/Exchange:</strong> Consider selling if it's in good working condition</li>
            <li>♻️ <strong>Last resort - Recycle:</strong> If no one needs it, take to authorised recycler</li>
          </ul>
          <div className="guidance-tip">
            <strong>💡 Tip:</strong> Before donating, ensure the appliance is clean, functional, and comes with necessary accessories.
          </div>
        </div>

        <div className="card guidance-card broken">
          <div className="guidance-header">
            <h2>🔧 Broken/Non-Working Appliances</h2>
            <span className="guidance-badge broken-badge">AUTHORISED RECYCLING</span>
          </div>
          <p className="guidance-intro">
            Broken electronic appliances contain hazardous materials and must be disposed of through proper recycling channels.
          </p>
          <h3>Recommended Actions:</h3>
          <ul className="guidance-list">
            <li>🏭 <strong>Authorised E-Waste Recyclers:</strong> Use only certified e-waste recycling facilities</li>
            <li>📍 <strong>Collection Centres:</strong> Take to designated collection points in your area</li>
            <li>🚫 <strong>Never in regular trash:</strong> Don't dispose in household garbage or landfills</li>
            <li>🔒 <strong>Data Security:</strong> Wipe personal data from devices before disposal</li>
            <li>📋 <strong>Follow regulations:</strong> Adhere to local e-waste management rules</li>
          </ul>
          <div className="guidance-warning">
            <strong>⚠️ Warning:</strong> Broken electronics may contain lead, mercury, cadmium, and other toxic substances that are harmful to health and environment.
          </div>
        </div>
      </div>

      <div className="guidance-cta">
        <div className="card" style={{textAlign: 'center', backgroundColor: 'var(--light-green)'}}>
          <h3>Ready to dispose of your appliance?</h3>
          <p>Submit a disposal request and get personalized guidance for your specific appliance.</p>
          <Link to="/dispose" className="btn">Submit Request Now</Link>
        </div>
      </div>
    </div>
  )
}

export default Guidance
