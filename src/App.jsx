import React from 'react'
import { MatrixProvider } from './context/MatrixContext'
import Header from './components/Header'
import CategorySelector from './components/CategorySelector'
import EventList from './components/EventList'
import FlowChart from './components/FlowChart'

function App() {
  return (
    <MatrixProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <CategorySelector />
              <EventList />
            </div>
            <div className="lg:col-span-2">
              <FlowChart />
            </div>
          </div>
        </main>
      </div>
    </MatrixProvider>
  )
}

export default App