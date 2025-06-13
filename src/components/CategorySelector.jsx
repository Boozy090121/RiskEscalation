import React from 'react'
import { useMatrix } from '../context/MatrixContext'
import { CATEGORY_ICONS } from '../constants'

function CategorySelector() {
  const { categories, selectedCategory, setSelectedCategory, loading } = useMatrix()

  if (loading) return null

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        Select Category
      </h2>
      <div className="space-y-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`w-full text-left px-4 py-3 rounded-md transition-colors focus-outline flex items-center gap-3 ${
              selectedCategory === category
                ? 'bg-blue-50 text-blue-700 font-medium border-2 border-blue-200'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
            }`}
            aria-pressed={selectedCategory === category}
          >
            <span className="text-2xl">{CATEGORY_ICONS[category] || '📌'}</span>
            <span>{category}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategorySelector