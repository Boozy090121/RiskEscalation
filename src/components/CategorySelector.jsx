import React from 'react'
import { useMatrix } from '../context/MatrixContext'

function CategorySelector() {
  const { events = [], selectedCategory, setSelectedCategory, loading } = useMatrix()

  const categories = loading ? [] : ['All', ...new Set(events.map(event => event.Category))]

  if (loading && categories.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-full"></div>
      </div>
    )
  }

  return (
    <div className="p-2">
      <div className="flex flex-wrap items-center gap-2">
        {categories.map(category => {
          const isActive = selectedCategory === category || (selectedCategory === '' && category === 'All');
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isActive
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-700 shadow-sm border border-gray-200'
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CategorySelector