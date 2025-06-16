import React from 'react'
import { SEVERITY_LEVELS } from '../constants'

function NumberedActionCard({ number, text, severity }) {
  const level = SEVERITY_LEVELS[severity] || {}

  return (
    <div 
      className={`flex items-center gap-3 p-3 rounded-lg shadow-md ${level.bgColor} ${level.textColor}`}
    >
      <div 
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold"
        style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}
      >
        {number}
      </div>
      <p className="flex-grow text-base font-bold">
        {text}
      </p>
    </div>
  )
}

export default NumberedActionCard 