import React from 'react'
import { COLORS } from '../constants'

function FlowStep({ field, value, severity, index, isMobile, isLarge = false }) {
  const bgColor = COLORS.SEVERITY[severity] || COLORS.SEVERITY['Green-Minor']
  const isPriority = field.priority === 'high'
  
  const formatValue = (fieldKey, val) => {
    if (!val) return 'N/A'
    
    if (fieldKey === 'Quick Actions' && val.includes('\n')) {
      return val.split('\n').map((line, i) => (
        <div key={i} className={`mb-2 ${isPriority ? 'font-semibold' : ''}`}>
          • {line.replace(/^\d+\.\s*/, '')}
        </div>
      ))
    }
    
    if (fieldKey === 'Decision Authority') {
      return <div className="text-lg font-bold">{val}</div>
    }
    
    return val
  }

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm ${isLarge ? 'border-4' : 'border-2'} ${isMobile ? 'w-full' : ''} transform transition-transform hover:scale-105 ${isPriority ? 'ring-2 ring-offset-2' : ''}`}
      style={{ 
        borderColor: bgColor,
        ringColor: isPriority ? bgColor : 'transparent'
      }}
    >
      <div 
        className={`px-4 ${isLarge ? 'py-4' : 'py-3'} text-white font-bold flex items-center gap-2`}
        style={{ backgroundColor: bgColor }}
      >
        <span className={`${isLarge ? 'text-2xl' : 'text-xl'}`}>{field.icon}</span>
        <span className={`${isLarge ? 'text-lg' : 'text-base'} ${isPriority ? 'uppercase' : ''}`}>
          {field.label}
        </span>
      </div>
      
      <div className={`${isLarge ? 'p-6' : 'p-4'}`}>
        <div className={`text-gray-900 ${isLarge ? 'text-lg' : 'text-base'} leading-relaxed`}>
          {formatValue(field.key, value)}
        </div>
      </div>
    </div>
  )
}

export default FlowStep