import React from 'react'
import { useMatrix } from '../context/MatrixContext'
import { SEVERITY_LEVELS } from '../constants'

function Header() {
  const { searchTerm, setSearchTerm, loading } = useMatrix() || {}

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20 border-b-4 border-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Left side: Logo and Title */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="PCI Pharma Services Logo" className="h-10" />
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-tight">
                Risk Escalation Guide
              </h1>
              <p className="text-xs text-gray-500">PCI Pharma Services | For reference only</p>
            </div>
          </div>

          {/* Right side: Search and Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Bar */}
            <div className="relative w-56 md:w-72">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm || ''}
                onChange={e => setSearchTerm && setSearchTerm(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Severity Legend */}
        <div className="pb-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs" aria-label="Severity level legend">
          {Object.values(SEVERITY_LEVELS).map((level) => (
            <div key={level.label} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full border border-gray-200"
                style={{ backgroundColor: level.color }}
                aria-hidden="true"
              />
              <span className="font-semibold text-gray-600">{level.label}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header