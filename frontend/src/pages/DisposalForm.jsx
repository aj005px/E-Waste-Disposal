import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './DisposalForm.css'

function DisposalForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    appliance_type: '',
    appliance_condition: 'working',
    quantity: 1,
    city_area: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          name: formData.name.trim() === '' ? null : formData.name.trim()
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to submit request')
      }

      const data = await response.json()
      navigate(`/confirmation/${data.id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Submit Disposal Request</h1>
        <p>Provide details about your electronic appliance for proper disposal guidance</p>
      </div>

      <div className="form-container">
        <div className="card">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name (Optional)
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your name"
                aria-describedby="name-help"
              />
              <small id="name-help" className="form-help">You can leave this blank if you prefer to remain anonymous</small>
            </div>

            <div className="form-group">
              <label htmlFor="appliance_type" className="form-label">
                Appliance Type <span className="required">*</span>
              </label>
              <input
                type="text"
                id="appliance_type"
                name="appliance_type"
                value={formData.appliance_type}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Laptop, Mobile Phone, Television, Refrigerator"
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="appliance_condition" className="form-label">
                Appliance Condition <span className="required">*</span>
              </label>
              <select
                id="appliance_condition"
                name="appliance_condition"
                value={formData.appliance_condition}
                onChange={handleChange}
                className="form-select"
                required
                aria-required="true"
              >
                <option value="working">Working</option>
                <option value="broken">Broken/Not Working</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quantity" className="form-label">
                Quantity <span className="required">*</span>
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="form-input"
                min="1"
                max="100"
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_area" className="form-label">
                City/Area <span className="required">*</span>
              </label>
              <input
                type="text"
                id="city_area"
                name="city_area"
                value={formData.city_area}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Mumbai, Delhi, Bangalore"
                required
                aria-required="true"
              />
            </div>

            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="btn" disabled={loading} style={{width: '100%'}}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DisposalForm
