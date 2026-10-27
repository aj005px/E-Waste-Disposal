import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import DisposalForm from './pages/DisposalForm'
import Guidance from './pages/Guidance'
import CollectionCentres from './pages/CollectionCentres'
import Confirmation from './pages/Confirmation'
import RequestsList from './pages/RequestsList'
import Awareness from './pages/Awareness'
import './styles/App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dispose" element={<DisposalForm />} />
            <Route path="/guidance" element={<Guidance />} />
            <Route path="/centres" element={<CollectionCentres />} />
            <Route path="/confirmation/:id" element={<Confirmation />} />
            <Route path="/requests" element={<RequestsList />} />
            <Route path="/awareness" element={<Awareness />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
