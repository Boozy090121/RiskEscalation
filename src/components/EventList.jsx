import React, { useState, useEffect } from 'react'
import { useMatrix } from '../context/MatrixContext'
import { SEVERITY_LEVELS } from '../constants'

function EventList() {
  const {
    events = [],
    loading,
    selectedCategory,
    filteredEvents = [],
    setSelectedEvent,
    selectedEvent,
  } = useMatrix()
  
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    if (selectedEvent) {
      setIsCollapsed(true)
    }
  }, [selectedEvent])

  const getSeverityColor = (severity) => {
    return SEVERITY_LEVELS[severity]?.color || '#ccc';
  }

  const renderListItem = (event) => (
    <li
      key={event.Key}
      onClick={() => setSelectedEvent(event)}
      className={`p-3 cursor-pointer transition-colors duration-150 border-l-4 ${
        selectedEvent?.Key === event.Key
          ? 'bg-blue-100 border-blue-600'
          : 'border-transparent hover:bg-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: getSeverityColor(event.Severity) }}
        ></div>
        <div className="flex-grow">
          <p className="font-medium text-sm text-gray-800">
            {event['Event Type']}
          </p>
          <p className="text-xs text-gray-500">{event.Category}</p>
        </div>
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </div>
      </div>
    </li>
  )

  if (loading) {
    return (
      <div className="bg-[#f8f9fa] rounded-lg p-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#f8f9fa] rounded-lg shadow-inner">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div >
          <h3 className="text-lg font-semibold text-gray-700">
            {selectedCategory ? `${selectedCategory} Events` : 'All Events'}
          </h3>
          <p className="text-xs text-gray-500">
            Found {filteredEvents.length} of {events.length} events
          </p>
        </div>
        {isCollapsed && (
           <button 
            onClick={() => setIsCollapsed(false)}
            className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
           >
            Show All
           </button>
        )}
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-320px)]">
        {isCollapsed && selectedEvent ? (
          <ul>
            {renderListItem(selectedEvent)}
          </ul>
        ) : filteredEvents.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredEvents.map(event => renderListItem(event))}
          </ul>
        ) : (
          <div className="p-6 text-center text-sm text-gray-500">
             <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
               <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="font-semibold text-gray-600">No events found</p>
            <p className="mt-1">
              Try adjusting your search or filter.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventList