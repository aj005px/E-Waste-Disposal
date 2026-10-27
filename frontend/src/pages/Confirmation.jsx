import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './Confirmation.css'

function Confirmation() {
  const { id } = useParams()
  const [request, setRequest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRequest()
  }, [id])

  const fetchRequest = async () => {
    try {
      const response = await fetch(`/api/requests/${id}`)
      if (!response.ok) {
        throw new Error('Request not found')
      }
      const data = await response.json()
      setRequest(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <p style={{textAlign: 'center', padding: '2rem'}}>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="page-header">
          <h1>Error</h1>
        </div>
        <div className="card" style={{textAlign: 'center', maxWidth: '500px', margin: '0 auto'}}>
          <p>{error}</p>
          <Link to="/dispose" className="btn">Submit New Request</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>✅ Request Submitted Successfully</h1>
        <p>Your disposal request has been recorded</p>
      </div>

      <div className="confirmation-container">
        <div className="card">
          <h2>Request Details</h2>
          <div className="request-details">
            <div className="detail-row">
              <strong>Request ID:</strong> #{request.id}
            </div>
            {request.name && (
              <div className="detail-row">
                <strong>Name:</strong> {request.name}
              </div>
            )}
            <div className="detail-row">
              <strong>Appliance Type:</strong> {request.appliance_type}
            </div>
            <div className="detail-row">
              <strong>Condition:</strong> 
              <span className={`condition-badge ${request.appliance_condition}`}>
                {request.appliance_condition === 'working' ? '✅ Working' : '🔧 Broken/Not Working'}
              </span>
            </div>
            <div className="detail-row">
              <strong>Quantity:</strong> {request.quantity}
            </div>
            <div className="detail-row">
              <strong>City/Area:</strong> {request.city_area}
            </div>
            <div className="detail-row">
              <strong>Status:</strong> <span className="status-badge">{request.status}</span>
            </div>
            <div className="detail-row">
              <strong>Submitted:</strong> {new Date(request.created_at).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="card guidance-section">
          <h2>📋 Disposal Guidance</h2>
          <p className="guidance-text">{request.guidance}</p>
        </div>

        <div className="action-buttons">
          <Link to="/centres" className="btn">Find Collection Centres</Link>
          <Link to="/requests" className="btn btn-secondary">View All Requests</Link>
          <Link to="/dispose" className="btn btn-secondary">Submit Another Request</Link>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
