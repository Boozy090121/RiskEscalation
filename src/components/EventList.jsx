import React from 'react'
import { useMatrix } from '../context/MatrixContext'
import { COLORS } from '../constants'

function EventList() {
  const { 
    filteredEvents, 
    selectedEvent, 
    setSelectedEvent, 
    searchTerm, 
    setSearchTerm,
    loading 
  } = useMatrix()

  if (loading) return null

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        Event Browser
      </h2>
      
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search events..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus-outline text-lg"
        />
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar pr-2">
        {filteredEvents.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No events found
          </p>
        ) : (
          filteredEvents.map((event, index) => (
            <button
              key={event.Key || index}
              onClick={() => setSelectedEvent(event)}
              className={`w-full text-left p-4 rounded-md transition-all focus-outline ${
                selectedEvent?.Key === event.Key
                  ? 'bg-blue-50 border-2 border-blue-300 shadow-sm transform scale-105'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900 mb-1 text-base">
                    {event['Event Type']}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="inline-block px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: `${COLORS.SEVERITY[event.Severity]}20`,
                        color: COLORS.SEVERITY[event.Severity]
                      }}
                    >
                      {event.Severity}
                    </span>
                    <span className="text-gray-600">{event['Response Time (SLA)']}</span>
                  </div>
                </div>
                {event.Severity === 'Red-Critical' && (
                  <span className="text-2xl animate-pulse">⚠️</span>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}

export default EventList