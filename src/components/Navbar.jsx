import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({ onLogout }) => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-irctc-blue text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold hover:text-gray-200 transition-colors">
              IRCTC Inspector Dashboard
            </Link>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  isActive('/') ? 'text-white border-b-2 border-white' : 'text-gray-200 hover:text-white'
                }`}
              >
                Scanner
              </Link>
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  isActive('/dashboard') ? 'text-white border-b-2 border-white' : 'text-gray-200 hover:text-white'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/update-condition"
                className={`text-sm font-medium transition-colors ${
                  isActive('/update-condition') ? 'text-white border-b-2 border-white' : 'text-gray-200 hover:text-white'
                }`}
              >
                Update Condition
              </Link>
              <Link
                to="/history"
                className={`text-sm font-medium transition-colors ${
                  isActive('/history') ? 'text-white border-b-2 border-white' : 'text-gray-200 hover:text-white'
                }`}
              >
                History
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm">
              Hi, <span className="font-semibold">Rohit</span>
            </span>
            <button
              onClick={onLogout}
              className="bg-white text-irctc-blue px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
