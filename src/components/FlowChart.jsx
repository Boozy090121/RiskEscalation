import React from 'react'
import { useMatrix } from '../context/MatrixContext'
import FlowStep from './FlowStep'
import EscalationTimeline from './EscalationTimeline'
import { FIELD_MAPPINGS, COLORS } from '../constants'

function FlowChart() {
  const { selectedEvent, viewMode, setViewMode, loading } = useMatrix()

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!selectedEvent) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12">
        <div className="text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Select an Event to Begin
          </h3>
          <p className="text-gray-500 text-lg mb-6">
            Choose an event from the list to view escalation procedures
          </p>
          <div className="bg-blue-50 rounded-lg p-4 text-left max-w-md mx-auto">
            <p className="text-blue-700 text-sm">
              <strong>Quick Tips:</strong>
            </p>
            <ul className="mt-2 space-y-1 text-sm text-blue-600">
              <li>• Use the search box to find specific events</li>
              <li>• Red events require immediate action</li>
              <li>• Contact information is displayed for each event</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  const severity = selectedEvent.Severity

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {selectedEvent['Event Type']}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('details')}
              className={`px-4 py-2 rounded-md font-medium transition-colors focus-outline ${
                viewMode === 'details' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Details View
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-4 py-2 rounded-md font-medium transition-colors focus-outline ${
                viewMode === 'timeline' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Timeline View
            </button>
          </div>
        </div>

        {/* Severity Badge - Enhanced */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">SEVERITY:</span>
              <span 
                className="px-6 py-3 rounded-full font-bold text-white text-lg shadow-lg"
                style={{ backgroundColor: COLORS.SEVERITY[severity] }}
              >
                {severity}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow">
              <span className="text-2xl">⏱️</span>
              <div>
                <span className="text-xs text-gray-600 block">RESPONSE TIME</span>
                <span className="font-bold text-lg">{selectedEvent['Response Time (SLA)']}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'details' ? (
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Mobile view - Priority stacked cards */}
          <div className="block md:hidden space-y-4">
            {/* Event Title */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span 
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: COLORS.SEVERITY[severity] }}
                ></span>
                {selectedEvent['Event Type']}
              </h3>
            </div>
            
            {/* Priority fields first */}
            {FIELD_MAPPINGS
              .sort((a, b) => {
                const priorityOrder = { high: 0, medium: 1, low: 2 }
                return priorityOrder[a.priority] - priorityOrder[b.priority]
              })
              .map((field, index) => (
                <FlowStep
                  key={field.key}
                  field={field}
                  value={selectedEvent[field.key]}
                  severity={severity}
                  index={index}
                  isMobile={true}
                  isLarge={field.priority === 'high'}
                />
              ))}
          </div>

          {/* Desktop/Tablet view - Priority-based Grid layout */}
          <div className="hidden md:block space-y-6">
            {/* Top Priority - Event Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span 
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: COLORS.SEVERITY[severity] }}
                ></span>
                {selectedEvent['Event Type']}
              </h3>
              
              {/* Critical Actions Row */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Immediate Actions - Largest */}
                <div>
                  <FlowStep
                    field={FIELD_MAPPINGS[0]}
                    value={selectedEvent[FIELD_MAPPINGS[0].key]}
                    severity={severity}
                    index={0}
                    isMobile={false}
                    isLarge={true}
                  />
                </div>
                
                {/* Contact Person */}
                <div>
                  <FlowStep
                    field={FIELD_MAPPINGS[2]}
                    value={selectedEvent[FIELD_MAPPINGS[2].key]}
                    severity={severity}
                    index={2}
                    isMobile={false}
                    isLarge={true}
                  />
                </div>
              </div>
              
              {/* Secondary Information Row */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Quick Fixes */}
                <div>
                  <FlowStep
                    field={FIELD_MAPPINGS[1]}
                    value={selectedEvent[FIELD_MAPPINGS[1].key]}
                    severity={severity}
                    index={1}
                    isMobile={false}
                  />
                </div>
                
                {/* Risk Score */}
                <div>
                  <FlowStep
                    field={FIELD_MAPPINGS[3]}
                    value={selectedEvent[FIELD_MAPPINGS[3].key]}
                    severity={severity}
                    index={3}
                    isMobile={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EscalationTimeline severity={severity} />
      )}

      {/* Emergency Contacts Card */}
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
        <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2 text-lg">
          <span className="text-2xl animate-pulse">🚨</span>
          EMERGENCY CONTACTS
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-3xl mb-1">🏥</div>
            <span className="font-medium text-red-800 text-sm">QA Emergency</span>
            <p className="text-red-700 font-bold text-xl">x2222</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-3xl mb-1">🔧</div>
            <span className="font-medium text-red-800 text-sm">Maintenance</span>
            <p className="text-red-700 font-bold text-xl">x3333</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-3xl mb-1">👔</div>
            <span className="font-medium text-red-800 text-sm">Site Director</span>
            <p className="text-red-700 font-bold text-xl">x4444</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlowChart