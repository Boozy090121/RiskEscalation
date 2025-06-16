import React from 'react'
import { useMatrix } from '../context/MatrixContext'
import { FIELD_MAPPINGS, SEVERITY_LEVELS } from '../constants'
import FlowStep from './FlowStep'
import EscalationTimeline from './EscalationTimeline'
import NumberedActionCard from './NumberedActionCard'

function FlowChart({ event }) {
  const { getSeverityKey } = useMatrix()
  const selectedEvent = event || {}
  const severity = getSeverityKey(selectedEvent.Severity)
  const level = SEVERITY_LEVELS[severity] || {}
  
  const quickActions = (selectedEvent['Quick Actions'] || '')
    .split(/\r?\n/)
    .map(line => line.match(/(\d+)\.\s*(.*)/))
    .filter(item => item !== null)
    .map(match => ({ number: match[1], text: match[2].trim() }));

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          {selectedEvent['Event Type']}
        </h2>
        {severity && (
          <span
            className={`px-4 py-2 text-base font-bold rounded-full ${level.badgeColor} ${level.badgeTextColor}`}
          >
            {level.label}
          </span>
        )}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Left side: Details */}
        <div className="lg:col-span-3 space-y-6">
          {/* Immediate Actions - broken out */}
          <div className="space-y-3">
             {quickActions.map(action => (
              <NumberedActionCard 
                key={action.number}
                number={action.number}
                text={action.text}
                severity={severity}
              />
            ))}
          </div>
         
          {/* Other actions */}
          <div className="space-y-4">
            {/* Production Resume Criteria - full width */}
            {FIELD_MAPPINGS[1] && (
               <FlowStep
                field={FIELD_MAPPINGS[1]}
                value={selectedEvent[FIELD_MAPPINGS[1].key]}
                severity={severity}
              />
            )}
            {/* Decision Authority & SOP in a grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              {FIELD_MAPPINGS[2] && (
                <FlowStep
                  field={FIELD_MAPPINGS[2]}
                  value={selectedEvent[FIELD_MAPPINGS[2].key]}
                  severity={severity}
                />
              )}
              {FIELD_MAPPINGS[3] && (
                <FlowStep
                  field={FIELD_MAPPINGS[3]}
                  value={selectedEvent[FIELD_MAPPINGS[3].key]}
                  severity={severity}
                />
              )}
            </div>
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