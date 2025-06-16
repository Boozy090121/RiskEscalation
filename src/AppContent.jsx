import React from 'react'
import { useMatrix } from './context/MatrixContext'
import CategorySelector from './components/CategorySelector'
import EventList from './components/EventList'
import FlowChart from './components/FlowChart'

function AppContent() {
  const { selectedEvent } = useMatrix()

  return (
    <main className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <CategorySelector />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div className="lg:col-span-1">
          <EventList />
        </div>
        <div className="lg:col-span-3">
          {selectedEvent ? (
            <FlowChart event={selectedEvent} />
          ) : (
            <div className="flex items-center justify-center h-full bg-white rounded-xl shadow-md min-h-[600px]">
              <div className="text-center p-8">
                <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Select an event</h3>
                <p className="text-base text-gray-500 mt-2">Choose an event from the list to see the details.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default AppContent 