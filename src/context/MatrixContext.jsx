import React, { createContext, useContext, useState, useEffect } from 'react'
import { CACHE_CONFIG } from '../constants'
import excelService from '../services/excelService'

const MatrixContext = createContext()

export function useMatrix() {
  const context = useContext(MatrixContext)
  if (!context) {
    throw new Error('useMatrix must be used within MatrixProvider')
  }
  return context
}

export function MatrixProvider({ children }) {
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
    loadData()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      sessionStorage.setItem(CACHE_CONFIG.SELECTED_CATEGORY_KEY, selectedCategory)
    }
  }, [selectedCategory])

  const loadData = async () => {
    setLoading(true)
    setError(null)

    try {
      // First try to get cached data
      const cached = localStorage.getItem(CACHE_CONFIG.CACHE_KEY)
      if (cached) {
        const { data: cachedData, timestamp } = JSON.parse(cached)
        const now = Date.now()
        if (now - timestamp < CACHE_CONFIG.CACHE_DURATION) {
          console.log('Using cached data')
          setData(cachedData)
          setLoading(false)
          return
        }
      }

      // If no cache or cache expired, fetch from JSON
      const jsonData = await excelService.fetchData()
      
      // Transform the data
      const transformedData = jsonData.map(row => ({
        Key: row.Key || '',
        Category: row.Category || '',
        'Event Type': row['Event Type'] || '',
        Severity: row.Severity || '🟢 Green-Minor',
        'Quick Actions': row['Quick Actions'] || '',
        'Quick Fixes': row['Quick Fixes'] || '',
        'Decision Authority': row['Decision Authority'] || '',
        'Response Time (SLA)': row['Response Time (SLA)'] || '',
        'Risk Score': row['Risk Score'] || ''
      }))

      // Cache the data
      localStorage.setItem(CACHE_CONFIG.CACHE_KEY, JSON.stringify({
        data: transformedData,
        timestamp: Date.now()
      }))
      
      setData(transformedData)
      
      if (!selectedCategory && transformedData.length > 0) {
        const categories = [...new Set(transformedData.map(item => item.Category))]
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

  const refreshData = () => {
    localStorage.removeItem(CACHE_CONFIG.CACHE_KEY)
    loadData()
  }

  const filteredEvents = data.filter(event => {
    const matchesCategory = !selectedCategory || event.Category === selectedCategory
    const matchesSearch = !searchTerm || 
      Object.values(event).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    return matchesCategory && matchesSearch
  })

  const value = {
    data,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    selectedEvent,
    setSelectedEvent,
    searchTerm,
    setSearchTerm,
    viewMode,
    setViewMode,
    filteredEvents,
    refreshData
  }

  return (
    <MatrixContext.Provider value={value}>
      {children}
    </MatrixContext.Provider>
  )
} 