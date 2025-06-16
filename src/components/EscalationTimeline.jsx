import React from 'react'
import { COLORS, ESCALATION_TIMELINES } from '../constants'

function EscalationTimeline({ severity }) {
  const timeline = ESCALATION_TIMELINES[severity]?.steps || ESCALATION_TIMELINES['Green-Minor'].steps
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Escalation Timeline
      </h3>
      
      <div className="space-y-6">
        {timeline.map((step, index) => (
          <div key={index} className="relative">
            <div className="flex items-start gap-4">
              {/* Timeline indicator */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                  style={{ 
                    backgroundColor: COLORS.SEVERITY[severity],
                    fontSize: '12px'
                  }}
                >
                  {step.time}
                </div>
                {index < timeline.length - 1 && (
                  <div className="w-1 h-16 bg-gray-300 mt-2"></div>
                )}
              </div>
              
              {/* Step content */}
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{step.action}</p>
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