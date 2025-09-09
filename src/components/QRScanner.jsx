import React, { useState, useRef, useEffect } from 'react'
import QrScanner from 'qr-scanner'

const QRScanner = ({ onScan }) => {
  const videoRef = useRef(null)
  const [scanner, setScanner] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [manualInput, setManualInput] = useState('')

  useEffect(() => {
    return () => {
      if (scanner) {
        scanner.destroy()
      }
    }
  }, [scanner])

  const startScanning = async () => {
    try {
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          console.log('QR Code detected:', result.data)
          onScan(result.data)
          stopScanning()
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      )
      
      await qrScanner.start()
      setScanner(qrScanner)
      setIsScanning(true)
    } catch (error) {
      console.error('Error starting QR scanner:', error)
      alert('Camera access denied or not available. Please use manual input.')
    }
  }

  const stopScanning = () => {
    if (scanner) {
      scanner.destroy()
      setScanner(null)
      setIsScanning(false)
    }
  }

  const handleManualSubmit = (e) => {
    e.preventDefault()
    if (manualInput.trim()) {
      onScan(manualInput.trim())
      setManualInput('')
    }
  }

  const handleFakeQR = () => {
    // Simulate scanning a fake QR code
    const fakeProductIds = ['PROD001', 'PROD002', 'PROD003']
    const randomId = fakeProductIds[Math.floor(Math.random() * fakeProductIds.length)]
    onScan(randomId)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Scan Product QR Code
        </h2>
        
        <div className="space-y-6">
          {/* Camera Scanner */}
          <div className="text-center">
            <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
              <video
                ref={videoRef}
                className="w-full h-64 object-cover"
                style={{ display: isScanning ? 'block' : 'none' }}
              />
              {!isScanning && (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📷</div>
                    <p>Camera will appear here when scanning</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-x-4">
              {!isScanning ? (
                <button
                  onClick={startScanning}
                  className="bg-irctc-blue text-white px-6 py-3 rounded-lg hover:bg-irctc-dark-blue transition-colors duration-200 font-medium"
                >
                  Start Camera Scan
                </button>
              ) : (
                <button
                  onClick={stopScanning}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                >
                  Stop Scanning
                </button>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Manual Input */}
          <div>
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label htmlFor="manualInput" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Product ID Manually
                </label>
                <input
                  type="text"
                  id="manualInput"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  placeholder="e.g., PROD001, PROD002, PROD003"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-irctc-blue focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors duration-200 font-medium"
              >
                Submit Product ID
              </button>
            </form>
          </div>

          {/* Fake QR Button for Testing */}
          <div className="text-center">
           
            <p className="text-xs text-gray-500 mt-2">
              Click to simulate scanning a random product for testing
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRScanner
