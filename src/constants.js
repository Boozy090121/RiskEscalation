export const GRAPH_CONFIG = {
  EXCEL_PATH: 'https://pclservices-my.sharepoint.com/:x:/g/personal/kyle_prima_pci_com/EdXBMvqoRUZCk_bKBhTlHQwBsl7LNuboiCG7ZvfDp8Fr-A?e=4SRYPZ',
  TABLE_NAME: 'RiskMatrix'
}

export const CACHE_CONFIG = {
  CACHE_KEY: 'risk_matrix_cache',
  CACHE_DURATION: 1000 * 60 * 60, // 1 hour
  SELECTED_CATEGORY_KEY: 'selected_category'
}

export const COLORS = {
  PCI_BLUE: '#003366',
  SEVERITY: {
    '🔴 Red-Critical': '#dc2626',
    '🟠 Orange-Major': '#f97316',
    '🟡 Yellow-Moderate': '#eab308',
    '🟢 Green-Minor': '#22c55e'
  }
}

export const FIELD_MAPPINGS = [
  {
    key: 'Quick Actions',
    label: 'Immediate Actions',
    icon: '⚡',
    priority: 'high'
  },
  {
    key: 'Quick Fixes',
    label: 'Quick Fixes',
    icon: '🔧',
    priority: 'high'
  },
  {
    key: 'Decision Authority',
    label: 'Decision Authority',
    icon: '👤',
    priority: 'high'
  }
]

export const EMERGENCY_CONTACTS = {
  primary: {
    name: 'Primary Contact',
    icon: '📞',
    priority: 'high'
  },
  secondary: {
    name: 'Secondary Contact',
    icon: '📱',
    priority: 'high'
  }
}

export const ESCALATION_TIMELINES = {
  '🔴 Red-Critical': {
    steps: [
      { time: '0-15 min', action: 'Immediate response required' },
      { time: '15-30 min', action: 'Escalate to department manager' },
      { time: '30-60 min', action: 'Escalate to plant manager' },
      { time: '60+ min', action: 'Escalate to corporate' }
    ]
  },
  '🟠 Orange-Major': {
    steps: [
      { time: '0-30 min', action: 'Initial response required' },
      { time: '30-60 min', action: 'Escalate to department manager' },
      { time: '60-120 min', action: 'Escalate to plant manager' }
    ]
  },
  '🟡 Yellow-Moderate': {
    steps: [
      { time: '0-60 min', action: 'Initial response required' },
      { time: '60-120 min', action: 'Escalate to department manager' }
    ]
  },
  '🟢 Green-Minor': {
    steps: [
      { time: '0-120 min', action: 'Document and monitor' }
    ]
  }
} 