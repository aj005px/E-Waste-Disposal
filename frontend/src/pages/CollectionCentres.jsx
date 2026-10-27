import React, { useState, useEffect } from 'react'
import './CollectionCentres.css'

function CollectionCentres() {
  const [centres, setCentres] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filterCity, setFilterCity] = useState('')

  useEffect(() => {
    fetchCentres()
  }, [])

  const fetchCentres = async (city = '') => {
    setLoading(true)
    setError('')
    try {
      const url = city ? `/api/centres?city_area=${encodeURIComponent(city)}` : '/api/centres'
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch collection centres')
      }
      const data = await response.json()
      setCentres(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = (e) => {
    e.preventDefault()
    fetchCentres(filterCity)
  }

  const clearFilter = () => {
    setFilterCity('')
    fetchCentres('')
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Collection Centres Directory</h1>
        <p>Find authorised e-waste collection centres near you (Demonstration Data)</p>
      </div>

      <div className="demo-notice">
        <div className="card" style={{backgroundColor: '#fff3cd', borderColor: '#ffc107'}}>
          <p style={{margin: 0, color: '#856404'}}>
            <strong>⚠️ Note:</strong> These are sample/demonstration collection centres for project purposes only. 
            We do not claim these are real verified addresses or have live map integration.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="card">
          <h3>Filter by City/Area</h3>
          <form onSubmit={handleFilter} className="filter-form">
            <input
              type="text"
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              placeholder="Enter city name (e.g., Mumbai, Delhi)"
              className="filter-input"
              aria-label="Filter by city or area"
            />
            <button type="submit" className="btn">Filter</button>
            <button type="button" onClick={clearFilter} className="btn btn-secondary">Clear</button>
          </form>
        </div>
      </section>

      <section className="section">
        {loading && <p style={{textAlign: 'center'}}>Loading collection centres...</p>}
        {error && <div className="error-message" role="alert">{error}</div>}
        
        {!loading && !error && (
          <>
            <p style={{marginBottom: '1rem', color: 'var(--secondary-green)'}}>
              Showing {centres.length} centre(s)
              {filterCity && ` in areas matching "${filterCity}"`}
            </p>
            <div className="grid">
              {centres.map(centre => (
                <div key={centre.id} className="card centre-card">
                  <h3>{centre.name}</h3>
                  <div className="centre-info">
                    <p><strong>📍 Location:</strong> {centre.city_area}</p>
                    <p><strong>🏠 Address:</strong> {centre.address}</p>
                    {centre.phone && <p><strong>📞 Phone:</strong> {centre.phone}</p>}
                    <div className="acceptance-badges">
                      <span className="acceptance-badge">
                        {centre.accepts_working ? '✅' : '❌'} Accepts Working
                      </span>
                      <span className="acceptance-badge">
                        {centre.accepts_broken ? '✅' : '❌'} Accepts Broken
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {centres.length === 0 && (
              <p style={{textAlign: 'center', color: 'var(--medium-gray)', padding: '2rem'}}>
                No collection centres found. Try a different city or clear the filter.
              </p>
            )}
          </>
        )}
      </section>
    </div>
  )
}

export default CollectionCentres
