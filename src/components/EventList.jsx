import React from 'react'
import { useMatrix } from '../context/MatrixContext'
import { COLORS, FIELD_MAPPINGS, EMERGENCY_CONTACTS } from '../constants'

export default function EventList() {
  const { 
    filteredEvents, 
    selectedEvent, 
    setSelectedEvent,
    searchTerm,
    setSearchTerm
  } = useMatrix()

  const getSeverityColor = (severity) => {
    return COLORS.SEVERITY[severity] || COLORS.SEVERITY['🟢 Green-Minor']
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Event List */}
      <div className="flex-1 overflow-y-auto">
        {filteredEvents.map((event) => (
          <div
            key={event.Key}
            onClick={() => setSelectedEvent(event)}
            className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
              selectedEvent?.Key === event.Key ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{event.Severity}</span>
              <h3 className="font-semibold">{event['Event Type']}</h3>
            </div>
            <p className="text-sm text-gray-600 mt-1">{event.Category}</p>
          </div>
        ))}
      </div>

      {/* Selected Event Details */}
      {selectedEvent && (
        <div className="border-t p-4 bg-white">
          <div className="space-y-4">
            {/* Main Information */}
            <div>
              <h2 className="text-xl font-bold mb-2">{selectedEvent['Event Type']}</h2>
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedEvent.Severity}</span>
                <span className="text-gray-600">{selectedEvent.Category}</span>
              </div>
            </div>

            {/* Key Information */}
            <div className="space-y-3">
              {FIELD_MAPPINGS.map(({ key, label, icon }) => (
                <div key={key} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{icon}</span>
                    <h3 className="font-semibold">{label}</h3>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line">{selectedEvent[key]}</p>
                </div>
              ))}
            </div>

            {/* Emergency Contacts */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Emergency Contacts</h3>
              <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{EMERGENCY_CONTACTS.primary.icon}</span>
                    <h4 className="font-semibold">{EMERGENCY_CONTACTS.primary.name}</h4>
                  </div>
                  <p className="text-gray-700">Contact information to be added</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{EMERGENCY_CONTACTS.secondary.icon}</span>
                    <h4 className="font-semibold">{EMERGENCY_CONTACTS.secondary.name}</h4>
                  </div>
                  <p className="text-gray-700">Contact information to be added</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}