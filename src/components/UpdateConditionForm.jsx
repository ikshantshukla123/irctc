import React, { useState } from 'react'

const UpdateConditionForm = ({ product, onBack }) => {
  const [formData, setFormData] = useState({
    condition: product.condition || '',
    status: product.status || 'Operational',
    maintenanceType: '',
    inspectorName: 'Rohit',
    inspectionDate: new Date().toISOString().split('T')[0],
    notes: '',
    issues: [],
    recommendations: '',
    nextMaintenanceDate: '',
    priority: 'Medium'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const conditionOptions = ['Excellent', 'Good', 'Fair', 'Poor', 'Critical']
  const statusOptions = ['Operational', 'Under Maintenance', 'Out of Service', 'Repair Required']
  const maintenanceTypes = ['Preventive Maintenance', 'Corrective Maintenance', 'Emergency Repair', 'Inspection', 'Calibration']
  const priorityOptions = ['Low', 'Medium', 'High', 'Critical']
  const commonIssues = [
    'Wear and Tear',
    'Corrosion',
    'Electrical Fault',
    'Mechanical Failure',
    'Software Issue',
    'Environmental Damage',
    'Calibration Required',
    'Component Replacement'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleIssueToggle = (issue) => {
    setFormData(prev => ({
      ...prev,
      issues: prev.issues.includes(issue)
        ? prev.issues.filter(i => i !== issue)
        : [...prev.issues, issue]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const updatedProduct = {
        ...product,
        condition: formData.condition,
        status: formData.status,
        lastMaintenance: formData.inspectionDate,
        nextMaintenance: formData.nextMaintenanceDate || product.nextMaintenance,
        maintenanceHistory: [
          ...product.maintenanceHistory,
          {
            date: formData.inspectionDate,
            type: formData.maintenanceType,
            inspector: formData.inspectorName,
            notes: formData.notes,
            issues: formData.issues,
            recommendations: formData.recommendations,
            priority: formData.priority
          }
        ]
      }

      alert('Product condition updated successfully!')
      console.log('Updated Product:', updatedProduct)
      setIsSubmitting(false)
      onBack()
    }, 2000)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Update Product Condition</h1>
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
        <h2 className="text-xl font-bold text-gray-800 mb-4">Product Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="text-sm text-gray-500">Current Condition:</span>
            <p className="font-medium">{product.condition}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Status:</span>
            <p className="font-medium">{product.status}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Last Maintenance:</span>
            <p className="font-medium">{formatDate(product.lastMaintenance)}</p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Inspection Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Condition Assessment */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 border-b pb-2">Condition Assessment</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Condition *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-irctc-blue focus:border-transparent"
                  required
                >
                  <option value="">Select Condition</option>
                  {conditionOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Operational Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-irctc-blue focus:border-transparent"
                  required
                >
                  {statusOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maintenance Type *
                </label>
                <select
                  name="maintenanceType"
                  value={formData.maintenanceType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-irctc-blue focus:border-transparent"
                  required
                >
                  <option value="">Select Type</option>
                  {maintenanceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Level
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-irctc-blue focus:border-transparent"
                >
                  {priorityOptions.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Inspection Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 border-b pb-2">Inspection Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inspector Name *
                </label>
                <input
                  type="text"
                  name="inspectorName"
                  value={formData.inspectorName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-irctc-blue focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inspection Date *
                </label>
                <input
                  type="date"
                  name="inspectionDate"
                  value={formData.inspectionDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-irctc-blue focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Next Maintenance Date
                </label>
                <input
                  type="date"
                  name="nextMaintenanceDate"
                  value={formData.nextMaintenanceDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-irctc-blue focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Issues and Problems */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Issues Identified</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {commonIssues.map(issue => (
              <label key={issue} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.issues.includes(issue)}
                  onChange={() => handleIssueToggle(issue)}
                  className="rounded border-gray-300 text-irctc-blue focus:ring-irctc-blue"
                />
                <span className="text-sm text-gray-700">{issue}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Notes and Recommendations */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Notes & Recommendations</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Inspection Notes *
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="4"
                placeholder="Describe the current condition, any issues found, and actions taken..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-irctc-blue focus:border-transparent resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recommendations
              </label>
              <textarea
                name="recommendations"
                value={formData.recommendations}
                onChange={handleInputChange}
                rows="3"
                placeholder="Any recommendations for future maintenance or improvements..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-irctc-blue focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-irctc-blue text-white rounded-lg hover:bg-irctc-dark-blue transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Updating...' : 'Update Condition'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateConditionForm
