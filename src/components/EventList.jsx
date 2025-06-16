import React from 'react'
import { useMatrix } from '../context/MatrixContext'
import { SEVERITY_LEVELS } from '../constants'

function EventList() {
  const {
    events = [],
    loading,
    selectedCategory,
    searchTerm,
    filteredEvents = [],
    setSelectedEvent,
    selectedEvent,
  } = useMatrix()

  const getSeverityColor = (severity) => {
    return SEVERITY_LEVELS[severity]?.color || '#ccc';
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-2/3 mb-6"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800">
          {selectedCategory ? `${selectedCategory} Events` : 'All Events'}
        </h3>
        <p className="text-base text-gray-500 mt-1">
          Found {filteredEvents.length} of {events.length} events
        </p>
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-320px)]">
        {filteredEvents.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {filteredEvents.map(event => (
              <li
                key={event.Key}
                onClick={() => setSelectedEvent(event)}
                className={`p-5 cursor-pointer transition-all duration-200 ease-in-out border-l-8 ${
                  selectedEvent?.Key === event.Key
                    ? 'bg-blue-100 border-blue-600'
                    : 'border-transparent hover:bg-gray-50 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: getSeverityColor(event.Severity),
                    }}
                  ></div>
                  <div className="flex-grow">
                    <p className="font-bold text-lg text-gray-900">
                      {event['Event Type']}
                    </p>
                    <p className="text-base text-gray-600">{event.Category}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-10 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-5 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="font-bold text-xl text-gray-700">No events found</p>
            <p className="text-base text-gray-500 mt-2">
              Try adjusting your search or filter.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventList