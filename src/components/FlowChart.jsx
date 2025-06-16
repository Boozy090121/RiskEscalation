import React from 'react'
import { useMatrix } from '../context/MatrixContext'
import FlowStep from './FlowStep'
import EscalationTimeline from './EscalationTimeline'
import { FIELD_MAPPINGS, COLORS } from '../constants'

function FlowChart() {
  const { selectedEvent, loading } = useMatrix()

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
            </ul>
          </div>
        </div>
      </div>
    )
  }

  const severity = selectedEvent.Severity

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            {selectedEvent['Event Type']}
          </h2>
          <span
            className="px-4 py-2 rounded-full font-bold text-base shadow-md"
            style={{
              backgroundColor: COLORS.SEVERITY[severity],
              color: COLORS.SEVERITY_TEXT[severity]
            }}
          >
            {severity}
          </span>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Left side: Details */}
        <div className="lg:col-span-3 space-y-6">
          {/* Immediate Actions - always full width */}
          <FlowStep
            field={FIELD_MAPPINGS[0]}
            value={selectedEvent[FIELD_MAPPINGS[0].key]}
            severity={severity}
          />

          {/* Other actions in a grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {FIELD_MAPPINGS.slice(1).map((field) => (
              <FlowStep
                key={field.key}
                field={field}
                value={selectedEvent[field.key]}
                severity={severity}
              />
            ))}
          </div>
        </div>

        {/* Right side: Timeline */}
        <div className="lg:col-span-2">
          <EscalationTimeline severity={severity} />
        </div>
      </div>
    </div>
  )
}

export default FlowChart