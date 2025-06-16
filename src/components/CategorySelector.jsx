import React from 'react'
import { useMatrix } from '../context/MatrixContext'

function CategorySelector() {
  const { data, selectedCategory, setSelectedCategory, loading } = useMatrix()

  if (loading) return null

  const categories = [...new Set(data.map(item => item.Category))]

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        Categories
      </h2>
      <div className="space-y-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              selectedCategory === category
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategorySelector