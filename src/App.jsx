import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import QRScanner from './components/QRScanner'
import ProductDashboard from './components/ProductDashboard'
import UpdateConditionForm from './components/UpdateConditionForm'
import ProductHistory from './components/ProductHistory'
import productData from '../data.json'

function App() {
  const [scannedProduct, setScannedProduct] = useState(null)
  const [currentLocation, setCurrentLocation] = useState('')

  useEffect(() => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCurrentLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`)
        },
        (error) => {
          console.error('Error getting location:', error)
          setCurrentLocation('Location not available')
        }
      )
    }
  }, [])

  const handleQRScan = (productId) => {
    const product = productData[productId]
    if (product) {
      setScannedProduct({
        ...product,
        scannedLocation: currentLocation
      })
    } else {
      alert('Product not found in database')
    }
  }

  const handleLogout = () => {
    setScannedProduct(null)
    alert('Logged out successfully')
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar onLogout={handleLogout} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                !scannedProduct ? (
                  <QRScanner onScan={handleQRScan} />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                scannedProduct ? (
                  <ProductDashboard 
                    product={scannedProduct} 
                    onNewScan={() => setScannedProduct(null)}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/update-condition" 
              element={
                scannedProduct ? (
                  <UpdateConditionForm 
                    product={scannedProduct}
                    onBack={() => window.history.back()}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/history" 
              element={
                scannedProduct ? (
                  <ProductHistory 
                    product={scannedProduct}
                    onBack={() => window.history.back()}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
