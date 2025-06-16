import React from 'react'
import { SEVERITY_LEVELS } from '../constants'

function FlowStep({ field, value, severity }) {
  const level = SEVERITY_LEVELS[severity] || {}
  const Icon = field.icon

  const cardClasses = `bg-white rounded-lg shadow-md border-t-4`
  const headerClasses = `p-3 flex items-center gap-3`
  const bodyClasses = `p-3 text-gray-700 whitespace-pre-line ${
    field.key === 'Decision Authority' ? 'text-base font-semibold' : 
    field.key === 'Quick Fixes' ? 'text-sm font-medium' : 'text-sm'
  }`

  return (
    <div
      className={cardClasses}
      style={{ borderColor: level.color }}
    >
      <div
        className={headerClasses}
        style={{ color: level.color }}
      >
        {Icon && <Icon className="w-8 h-8 flex-shrink-0" />}
        <h4 className="text-lg font-bold">{field.label}</h4>
      </div>
      <div className={bodyClasses}>
        {value || 'N/A'}
      </div>
    </div>
  )
}

export default FlowStep