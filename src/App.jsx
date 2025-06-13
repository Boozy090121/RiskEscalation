import React, { useEffect } from 'react'
import { useMsal } from '@azure/msal-react'
import { MatrixProvider } from './context/MatrixContext'
import Header from './components/Header'
import CategorySelector from './components/CategorySelector'
import EventList from './components/EventList'
import FlowChart from './components/FlowChart'
import ErrorMessage from './components/ErrorMessage'
import { loginRequest } from './services/authConfig'

function App() {
  const { instance, accounts } = useMsal()
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [authError, setAuthError] = React.useState(null)

  useEffect(() => {
    if (accounts.length > 0) {
      setIsAuthenticated(true)
    }
  }, [accounts])

  const handleLogin = async () => {
    try {
      await instance.loginPopup(loginRequest)
      setIsAuthenticated(true)
      setAuthError(null)
    } catch (error) {
      console.error('Login failed:', error)
      setAuthError('Authentication failed. Please try again.')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">
            PCI Risk Escalation Guide
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Production Floor Reference System
          </p>
          <p className="text-gray-600 mb-6">
            Please sign in with your corporate account to access the risk escalation procedures.
          </p>
          {authError && <ErrorMessage message={authError} />}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In with Microsoft
          </button>
        </div>
      </div>
    )
  }

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