import React, { useState } from 'react'
import { useMatrix } from '../context/MatrixContext'
import { COLORS } from '../constants'

function Header() {
  const { refreshData, loading } = useMatrix()
  const [showQuickGuide, setShowQuickGuide] = useState(false)

  return (
    <header 
      className="shadow-sm border-b border-gray-200 text-white"
      style={{ backgroundColor: COLORS.PCI_BLUE }}
    >
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              PCI Risk Escalation Guide
            </h1>
            <p className="text-sm opacity-75 mt-1">Production Floor Reference</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowQuickGuide(!showQuickGuide)}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-md transition-colors text-sm font-medium focus-outline"
            >
              Quick Guide
            </button>
            <button
              onClick={refreshData}
              disabled={loading}
              className="text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-outline"
              aria-label="Refresh data"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-4 text-sm" aria-label="Severity level legend">
          {Object.entries(COLORS.SEVERITY).map(([level, color]) => (
            <div key={level} className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
              <span>{level}</span>
            </div>
          ))}
        </div>

        {showQuickGuide && (
          <div className="mt-4 bg-white bg-opacity-10 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Quick Reference:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div>🔴 Red = STOP production immediately</div>
              <div>🟠 Orange = Pause and assess quickly</div>
              <div>🟡 Yellow = Document and monitor</div>
              <div>🟢 Green = Log and continue</div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header