import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './RequestsList.css'

function RequestsList() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/requests')
      if (!response.ok) {
        throw new Error('Failed to fetch requests')
      }
      const data = await response.json()
      setRequests(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Submitted Disposal Requests</h1>
        <p>List of all disposal requests submitted through this system</p>
      </div>

      <div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
        <Link to="/dispose" className="btn">Submit New Request</Link>
      </div>

      <section className="section">
        {loading && <p style={{textAlign: 'center'}}>Loading requests...</p>}
        {error && <div className="error-message" role="alert">{error}</div>}
        
        {!loading && !error && (
          <>
            {requests.length === 0 ? (
              <div className="card" style={{textAlign: 'center', padding: '2rem'}}>
                <p style={{color: 'var(--medium-gray)', marginBottom: '1rem'}}>No requests submitted yet.</p>
                <Link to="/dispose" className="btn">Submit Your First Request</Link>
              </div>
            ) : (
              <div className="requests-list">
                {requests.map(request => (
                  <div key={request.id} className="card request-item">
                    <div className="request-header">
                      <h3>Request #{request.id}</h3>
                      <span className={`condition-badge ${request.appliance_condition}`}>
                        {request.appliance_condition === 'working' ? '✅ Working' : '🔧 Broken'}
                      </span>
                    </div>
                    <div className="request-info">
                      <div className="info-grid">
                        {request.name && (
                          <div><strong>Name:</strong> {request.name}</div>
                        )}
                        <div><strong>Appliance:</strong> {request.appliance_type}</div>
                        <div><strong>Quantity:</strong> {request.quantity}</div>
                        <div><strong>Location:</strong> {request.city_area}</div>
                        <div><strong>Status:</strong> <span className="status-badge">{request.status}</span></div>
                        <div><strong>Submitted:</strong> {new Date(request.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div style={{marginTop: '1rem'}}>
                      <Link to={`/confirmation/${request.id}`} className="btn">View Details & Guidance</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}

export default RequestsList
