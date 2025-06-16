import React from 'react'
import { SEVERITY_LEVELS } from '../constants'

function FlowStep({ field, value, severity }) {
  const level = SEVERITY_LEVELS[severity] || {}
  const isImmediateAction = field.key === 'Quick Actions';

  const cardClasses = `rounded-lg shadow-md border-t-8 ${isImmediateAction ? level.bgColor + ' ' + level.textColor : 'bg-white'}`
  const headerClasses = `p-4 flex items-center gap-4 text-2xl font-bold ${isImmediateAction ? '' : level.textColor}`
  const bodyClasses = `p-6 text-lg whitespace-pre-line ${isImmediateAction ? 'text-white' : 'text-gray-800'}`

  return (
    <div
      className={cardClasses}
      style={{ borderColor: level.color }}
    >
      <div
        className={headerClasses}
        style={!isImmediateAction ? { color: level.color } : {}}
      >
        <span className="text-3xl">{field.icon}</span>
        <h4 className="text-2xl font-bold">{field.label}</h4>
      </div>
      <div className={bodyClasses}>
        {value || 'N/A'}
      </div>
    </div>
  )
}

export default FlowStep