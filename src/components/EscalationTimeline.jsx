import React from 'react'
import { COLORS, ESCALATION_TIMELINES } from '../constants'

function EscalationTimeline({ severity }) {
  const timeline = ESCALATION_TIMELINES[severity] || ESCALATION_TIMELINES['Green-Minor']
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Escalation Timeline
      </h3>
      
      <div className="space-y-6">
        {timeline.map((phase, index) => (
          <div key={index} className="relative">
            <div className="flex items-start gap-4">
              {/* Timeline indicator */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                  style={{ 
                    backgroundColor: COLORS.TIMELINE[phase.color],
                    fontSize: '12px'
                  }}
                >
                  {phase.time}
                </div>
                {index < timeline.length - 1 && (
                  <div className="w-1 h-16 bg-gray-300 mt-2"></div>
                )}
              </div>
              
              {/* Phase content */}
              <div className="flex-1">
                <h4 
                  className="font-semibold text-lg mb-2"
                  style={{ color: COLORS.TIMELINE[phase.color] }}
                >
                  {phase.phase}
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {phase.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">▸</span>
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EscalationTimeline