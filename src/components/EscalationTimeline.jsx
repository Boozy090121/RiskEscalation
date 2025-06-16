import React from 'react'
import { ESCALATION_TIMELINES, SEVERITY_LEVELS } from '../constants'

function EscalationTimeline({ severity }) {
  const timeline = ESCALATION_TIMELINES[severity]
  const level = SEVERITY_LEVELS[severity] || {}

  if (!timeline) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <h3 className="text-lg font-medium text-gray-700">
          No escalation timeline defined for this severity level.
        </h3>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-3xl font-extrabold mb-2" style={{ color: level.color }}>
        {timeline.title}
      </h3>
      <p className="text-lg text-gray-600 mb-6">
        Follow these phases to manage the event effectively.
      </p>

      <div className="relative border-l-4 ml-6" style={{ borderColor: level.color }}>
        {timeline.phases?.map((phase, index) => (
          <div key={index} className="mb-6 ml-12">
            <div
              className="absolute -left-6 flex items-center justify-center w-12 h-12 rounded-full ring-8 ring-white"
              style={{ backgroundColor: level.color }}
            >
              <span className="text-white font-bold text-xl">{index + 1}</span>
            </div>
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${level.bgColor} ${level.textColor}`}>
              {phase.duration}
            </span>
            <h4 className="text-2xl font-bold text-gray-900 mt-2 mb-1">{phase.name}</h4>
            <ul className="space-y-1 text-gray-700 text-lg list-disc list-inside">
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