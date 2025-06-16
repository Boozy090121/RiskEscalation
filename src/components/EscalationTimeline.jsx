import React from 'react'
import { ESCALATION_TIMELINES, SEVERITY_LEVELS } from '../constants'

function EscalationTimeline({ severity }) {
  const timeline = ESCALATION_TIMELINES[severity]
  const level = SEVERITY_LEVELS[severity] || {}

  if (!timeline) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-full flex items-center justify-center">
        <h3 className="text-lg font-medium text-gray-500 text-center">
          No escalation timeline defined.
        </h3>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full">
      <h3 className="text-xl font-bold mb-1" style={{ color: level.color }}>
        {timeline.title}
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Follow these phases to manage the event effectively.
      </p>

      <div className="relative border-l-2 ml-4" style={{ borderColor: level.color }}>
        {timeline.phases?.map((phase, index) => (
          <div key={index} className="mb-3 ml-8">
            <div
              className="absolute -left-4 flex items-center justify-center w-8 h-8 rounded-full ring-4 ring-white"
              style={{ backgroundColor: level.color }}
            >
              <span className="text-white font-bold text-base">{index + 1}</span>
            </div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${level.bgColor} ${level.textColor}`}>
              {phase.duration}
            </span>
            <h4 className="text-lg font-bold text-gray-900 mt-1.5 mb-1">{phase.name}</h4>
            <ul className="space-y-0.5 text-gray-700 text-sm list-disc list-inside">
              {phase.actions.map((action, i) => (
                <li key={i} className="font-medium">{action}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EscalationTimeline