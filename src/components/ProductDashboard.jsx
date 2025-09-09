import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ProductDashboard = ({ product, onNewScan }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadImage = () => {
    if (selectedImage) {
      // Simulate geo-tagging
      const timestamp = new Date().toISOString()
      alert(`Image uploaded successfully!\nTimestamp: ${timestamp}\nLocation: ${product.scannedLocation}`)
      setSelectedImage(null)
      setImagePreview(null)
    } else {
      alert('Please select an image first')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Product Dashboard</h1>
        <button
          onClick={onNewScan}
          className="bg-irctc-blue text-white px-6 py-3 rounded-lg hover:bg-irctc-dark-blue transition-colors duration-200 font-medium"
        >
          Scan New Product
        </button>
      </div>

      {/* Product Overview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{product.productName}</h2>
            <p className="text-gray-600">ID: {product.productId} | Category: {product.category}</p>
          </div>
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              product.status === 'Operational' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {product.status}
            </span>
            <p className="text-sm text-gray-500 mt-1">Current Condition: {product.condition}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 border-b pb-2">Basic Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Model:</span>
                <p className="font-medium">{product.model}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Serial Number:</span>
                <p className="font-mono text-sm">{product.serialNumber}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Manufacturing Date:</span>
                <p className="font-medium">{formatDate(product.mfg)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Installation Date:</span>
                <p className="font-medium">{formatDate(product.installationDate)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 border-b pb-2">Vendor Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Vendor:</span>
                <p className="font-medium">{product.vendorName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Contact:</span>
                <p className="font-medium">{product.vendorContact}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Email:</span>
                <p className="font-medium text-sm">{product.vendorEmail}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Warranty:</span>
                <p className="font-medium">{product.warranty} (Expires: {formatDate(product.warrantyExpiry)})</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 border-b pb-2">Maintenance</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Last Maintenance:</span>
                <p className="font-medium">{formatDate(product.lastMaintenance)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Next Maintenance:</span>
                <p className="font-medium">{formatDate(product.nextMaintenance)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Location:</span>
                <p className="font-medium text-sm">{product.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scanned Location */}
        <div className="mt-6 bg-blue-50 p-4 rounded-lg border-l-4 border-irctc-blue">
          <h3 className="font-semibold text-irctc-blue mb-2">Current Scan Location (Live GPS)</h3>
          <p className="text-gray-900">{product.scannedLocation}</p>
        </div>
      </div>

      {/* Specifications */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Technical Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 text-sm mb-1">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h4>
              <p className="text-gray-900 font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Product Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Update Condition */}
          <div className="text-center space-y-4">
            <div className="bg-irctc-blue bg-opacity-10 p-4 rounded-lg">
              <div className="text-4xl mb-2">📝</div>
              <h4 className="font-semibold text-gray-700">Update Condition</h4>
              <p className="text-sm text-gray-500">Record current product condition and maintenance notes</p>
            </div>
            <Link
              to="/update-condition"
              className="block w-full bg-irctc-blue text-white px-6 py-3 rounded-lg hover:bg-irctc-dark-blue transition-colors duration-200 font-medium"
            >
              Update Condition
            </Link>
          </div>

          {/* View History */}
          <div className="text-center space-y-4">
            <div className="bg-gray-800 bg-opacity-10 p-4 rounded-lg">
              <div className="text-4xl mb-2">📊</div>
              <h4 className="font-semibold text-gray-700">View History</h4>
              <p className="text-sm text-gray-500">Check maintenance history and audit trail</p>
            </div>
            <Link
              to="/history"
              className="block w-full bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors duration-200 font-medium"
            >
              View History
            </Link>
          </div>

          {/* Upload Image */}
          <div className="text-center space-y-4">
            <div className="bg-green-600 bg-opacity-10 p-4 rounded-lg">
              <div className="text-4xl mb-2">📷</div>
              <h4 className="font-semibold text-gray-700">Upload Image</h4>
              <p className="text-sm text-gray-500">Upload geo-tagged product images</p>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer block"
              >
                {imagePreview ? (
                  <div>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full h-20 object-cover mx-auto rounded-lg mb-2"
                    />
                    <p className="text-xs text-gray-600">Click to change</p>
                  </div>
                ) : (
                  <div>
                    <div className="text-2xl text-gray-400 mb-1">📷</div>
                    <p className="text-xs text-gray-600">Click to select</p>
                  </div>
                )}
              </label>
            </div>
            
            <button
              onClick={handleUploadImage}
              disabled={!selectedImage}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Upload Image
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDashboard
