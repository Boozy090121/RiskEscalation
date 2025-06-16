import React from 'react'
import { MatrixProvider } from './context/MatrixContext'
import Header from './components/Header'
import AppContent from './AppContent'

function App() {
  return (
    <MatrixProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <AppContent />
      </div>
    </MatrixProvider>
  )
}

export default App