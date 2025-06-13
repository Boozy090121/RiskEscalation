import React, { createContext, useContext, useState, useEffect } from 'react'
import { useMsal } from '@azure/msal-react'
import graphExcelService from '../services/graphExcel'
import { CACHE_CONFIG } from '../constants'

const MatrixContext = createContext()

export function useMatrix() {
  const context = useContext(MatrixContext)
  if (!context) {
    throw new Error('useMatrix must be used within MatrixProvider')
  }
  return context
}

export function MatrixProvider({ children }) {
  const { instance, accounts } = useMsal()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return sessionStorage.getItem(CACHE_CONFIG.SELECTED_CATEGORY_KEY) || ''
  })
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('details')

  useEffect(() => {
    if (accounts.length > 0) {
      loadData()
    }
  }, [accounts])

  useEffect(() => {
    if (selectedCategory) {
      sessionStorage.setItem(CACHE_CONFIG.SELECTED_CATEGORY_KEY, selectedCategory)
    }
  }, [selectedCategory])

  const loadData = async () => {
    setLoading(true)
    setError(null)

    try {
      const matrixData = await graphExcelService.fetchRiskMatrix(instance, accounts[0])
      setData(matrixData)
      
      if (!selectedCategory && matrixData.length > 0) {
        const categories = [...new Set(matrixData.map(item => item.Category))]
        if (categories.length > 0) {
          setSelectedCategory(categories[0])
        }
      }
    } catch (err) {
      console.error('Failed to load data:', err)
      setError('Failed to load risk escalation data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    graphExcelService.clearCache()
    await loadData()
  }

  const categories = React.useMemo(() => {
    return [...new Set(data.map(item => item.Category))].sort()
  }, [data])

  const filteredEvents = React.useMemo(() => {
    return data.filter(item => {
      const matchesCategory = !selectedCategory || item.Category === selectedCategory
      const matchesSearch = !searchTerm || 
        item['Event Type'].toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [data, selectedCategory, searchTerm])

  const value = {
    data,
    loading,
    error,
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedEvent,
    setSelectedEvent,
    searchTerm,
    setSearchTerm,
    filteredEvents,
    viewMode,
    setViewMode,
    refreshData
  }

  return (
    <MatrixContext.Provider value={value}>
      {children}
    </MatrixContext.Provider>
  )
}