import React, { useState } from 'react'

const ProductHistory = ({ product, onBack }) => {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Operational': return 'bg-green-100 text-green-800'
      case 'Under Maintenance': return 'bg-yellow-100 text-yellow-800'
      case 'Out of Service': return 'bg-red-100 text-red-800'
      case 'Repair Required': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Excellent': return 'bg-green-100 text-green-800'
      case 'Good': return 'bg-blue-100 text-blue-800'
      case 'Fair': return 'bg-yellow-100 text-yellow-800'
      case 'Poor': return 'bg-orange-100 text-orange-800'
      case 'Critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800'
      case 'High': return 'bg-orange-100 text-orange-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredHistory = product.maintenanceHistory.filter(entry => {
    const matchesFilter = selectedFilter === 'all' || entry.type === selectedFilter
    const matchesSearch = entry.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.inspector.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const maintenanceTypes = [...new Set(product.maintenanceHistory.map(entry => entry.type))]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Product History</h1>
          <p className="text-gray-600 mt-1">{product.productName} - {product.productId}</p>
        </div>
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Product Summary */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Product Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{product.maintenanceHistory.length}</div>
            <div className="text-sm text-gray-500">Total Records</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{formatDate(product.lastMaintenance)}</div>
            <div className="text-sm text-gray-500">Last Maintenance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{formatDate(product.nextMaintenance)}</div>
            <div className="text-sm text-gray-500">Next Maintenance</div>
          </div>
          <div className="text-center">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(product.condition)}`}>
              {product.condition}
            </span>
            <div className="text-sm text-gray-500 mt-1">Current Condition</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Filter & Search</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by inspector name or notes..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-irctc-blue focus:border-transparent"
            />
          </div>
          <div className="md:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-irctc-blue focus:border-transparent"
            >
              <option value="all">All Types</option>
              {maintenanceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Maintenance History Timeline */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Maintenance History</h2>
        
        {filteredHistory.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl text-gray-400 mb-4">📋</div>
            <p className="text-gray-500">No maintenance records found matching your criteria.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredHistory.map((entry, index) => (
              <div key={index} className="relative">
                {/* Timeline line */}
                {index < filteredHistory.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                )}
                
                <div className="flex items-start space-x-4">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-12 h-12 bg-irctc-blue rounded-full flex items-center justify-center">
                    <div className="text-white text-sm font-bold">{index + 1}</div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-gray-50 rounded-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{entry.type}</h3>
                        <p className="text-sm text-gray-500">by {entry.inspector}</p>
                      </div>
                      <div className="flex items-center space-x-2 mt-2 md:mt-0">
                        <span className="text-sm text-gray-500">{formatDateTime(entry.date)}</span>
                        {entry.priority && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(entry.priority)}`}>
                            {entry.priority}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-700">{entry.notes}</p>
                    </div>
                    
                    {entry.issues && entry.issues.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Issues Identified:</h4>
                        <div className="flex flex-wrap gap-2">
                          {entry.issues.map((issue, issueIndex) => (
                            <span key={issueIndex} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                              {issue}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {entry.recommendations && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-800 mb-1">Recommendations:</h4>
                        <p className="text-sm text-blue-700">{entry.recommendations}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Maintenance Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-irctc-blue mb-2">
              {product.maintenanceHistory.filter(entry => entry.type === 'Preventive Maintenance').length}
            </div>
            <div className="text-sm text-gray-500">Preventive Maintenance</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {product.maintenanceHistory.filter(entry => entry.type === 'Repair').length}
            </div>
            <div className="text-sm text-gray-500">Repairs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {product.maintenanceHistory.filter(entry => entry.type === 'Inspection').length}
            </div>
            <div className="text-sm text-gray-500">Inspections</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductHistory
