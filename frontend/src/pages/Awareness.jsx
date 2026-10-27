import React from 'react'
import './Awareness.css'

function Awareness() {
  return (
    <div className="container">
      <div className="page-header">
        <h1>Environmental Awareness</h1>
        <p>Learn about e-waste impact and practical recycling tips</p>
      </div>

      <section className="section">
        <div className="card">
          <h2>🌍 Understanding E-Waste Impact</h2>
          <div className="impact-grid">
            <div className="impact-item">
              <h3>🌊 Water Pollution</h3>
              <p>Toxic metals from e-waste can leach into groundwater and water bodies, contaminating drinking water sources.</p>
            </div>
            <div className="impact-item">
              <h3>🌱 Soil Contamination</h3>
              <p>Heavy metals like lead and mercury accumulate in soil, affecting plant growth and entering the food chain.</p>
            </div>
            <div className="impact-item">
              <h3>💨 Air Pollution</h3>
              <p>Burning e-waste releases harmful dioxins and furans into the air, causing respiratory problems.</p>
            </div>
            <div className="impact-item">
              <h3>👥 Human Health</h3>
              <p>Exposure to e-waste toxins can cause neurological damage, reproductive issues, and developmental problems.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2>💡 Practical Recycling Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-number">1</div>
              <h3>🔍 Assess First</h3>
              <p>Check if your appliance is working. If yes, try to sell, donate, or give it away before recycling.</p>
            </div>
            <div className="tip-card">
              <div className="tip-number">2</div>
              <h3>🔐 Secure Your Data</h3>
              <p>Wipe all personal data from computers, phones, and storage devices. Factory reset or use data wiping tools.</p>
            </div>
            <div className="tip-card">
              <div className="tip-number">3</div>
              <h3>📦 Remove Batteries</h3>
              <p>Remove batteries separately when possible - they often need special handling and recycling.</p>
            </div>
            <div className="tip-card">
              <div className="tip-number">4</div>
              <h3>🏭 Use Authorised Centres</h3>
              <p>Always use certified e-waste recyclers or authorised collection centres, not informal scrap dealers.</p>
            </div>
            <div className="tip-card">
              <div className="tip-number">5</div>
              <h3>📋 Keep Records</h3>
              <p>Get a receipt or certificate of disposal from the recycler for your records when possible.</p>
            </div>
            <div className="tip-card">
              <div className="tip-number">6</div>
              <h3>🛒 Buy Responsibly</h3>
              <p>Choose energy-efficient devices, buy only what you need, and consider refurbished electronics.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2>♻️ What Can Be Recycled?</h2>
          <div className="recyclable-grid">
            <div className="recyclable-category">
              <h3>✅ Commonly Recyclable</h3>
              <ul>
                <li>Computers and Laptops</li>
                <li>Mobile Phones and Tablets</li>
                <li>Televisions and Monitors</li>
                <li>Printers and Scanners</li>
                <li>Keyboards and Mice</li>
                <li>Chargers and Cables</li>
              </ul>
            </div>
            <div className="recyclable-category">
              <h3>⚡ Special Handling Required</h3>
              <ul>
                <li>Refrigerators and ACs (contain refrigerants)</li>
                <li>Fluorescent Lamps and CFLs</li>
                <li>Batteries (all types)</li>
                <li>Medical Electronic Equipment</li>
                <li>Large Appliances with Motors</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Awareness
