export const GRAPH_CONFIG = {
  EXCEL_PATH: 'https://pclservices-my.sharepoint.com/:x:/g/personal/kyle_prima_pci_com/EdXBMvqoRUZCk_bKBhTlHQwBsl7LNuboiCG7ZvfDp8Fr-A?e=4SRYPZ',
  TABLE_NAME: 'RiskMatrix'
}

export const CACHE_CONFIG = {
  CACHE_KEY: 'risk_matrix_cache',
  CACHE_DURATION: 1000 * 60 * 60, // 1 hour
  SELECTED_CATEGORY_KEY: 'selected_category'
}

export const SEVERITY_LEVELS = {
  'Red-Critical': {
    label: 'Red-Critical',
    bgColor: 'bg-red-600',
    textColor: 'text-white',
    borderColor: 'border-red-600',
    badgeColor: 'bg-red-600',
    badgeTextColor: 'text-white',
    color: '#dc2626'
  },
  'Orange-Major': {
    label: 'Orange-Major',
    bgColor: 'bg-orange-500',
    textColor: 'text-white',
    borderColor: 'border-orange-500',
    badgeColor: 'bg-orange-500',
    badgeTextColor: 'text-white',
    color: '#f97316'
  },
  'Yellow-Moderate': {
    label: 'Yellow-Moderate',
    bgColor: 'bg-yellow-400',
    textColor: 'text-gray-800',
    borderColor: 'border-yellow-400',
    badgeColor: 'bg-yellow-400',
    badgeTextColor: 'text-gray-800',
    color: '#facc15'
  },
  'Green-Minor': {
    label: 'Green-Minor',
    bgColor: 'bg-green-500',
    textColor: 'text-white',
    borderColor: 'border-green-500',
    badgeColor: 'bg-green-500',
    badgeTextColor: 'text-white',
    color: '#22c55e'
  },
};

export const COLORS = {
  PCI_BLUE: '#004C97',
  SEVERITY: {
    'Red-Critical': '#dc2626',
    'Orange-Major': '#f97316',
    'Yellow-Moderate': '#facc15',
    'Green-Minor': '#22c55e',
  },
  SEVERITY_TEXT: {
    'Red-Critical': '#ffffff',
    'Orange-Major': '#ffffff',
    'Yellow-Moderate': '#374151', // dark gray
    'Green-Minor': '#ffffff',
  }
}

export const FIELD_MAPPINGS = [
  {
    key: 'Quick Actions',
    label: 'Immediate Actions',
    icon: '⚡️',
    priority: 'high'
  },
  {
    key: 'Quick Fixes',
    label: 'Production Resume Criteria',
    icon: '🛠️',
    priority: 'medium'
  },
  {
    key: 'Decision Authority',
    label: 'Decision Authority',
    icon: '👤',
    priority: 'high'
  },
  {
    key: 'Low Priority Action',
    label: 'SOP/WI',
    icon: '📄',
    priority: 'low'
  }
]

export const EMERGENCY_CONTACTS = {
  primary: {
    name: 'Primary Contact',
    icon: '📞',
    priority: 1,
  },
  secondary: {
    name: 'Secondary Contact',
    icon: '📱',
    priority: 2,
  },
}

export const ESCALATION_TIMELINES = {
  'Red-Critical': {
    title: 'Critical Escalation',
    color: '#dc2626',
    phases: [{
      name: 'Immediate',
      duration: '0-5 mins',
      actions: ['Stop Production', 'Quarantine Batch', 'Notify QA Manager'],
    }, {
      name: 'Assessment',
      duration: '5-30 mins',
      actions: ['Perform Initial Investigation', 'Contact Site Director', 'Document Deviation'],
    }, {
      name: 'Resolution',
      duration: '30+ mins',
      actions: ['Implement Corrective Actions', 'Verify Fix', 'Release Batch or Dispose'],
    }, ],
  },
  'Orange-Major': {
    title: 'Major Escalation',
    color: '#f97316',
    phases: [{
      name: 'Initial Response',
      duration: '0-15 mins',
      actions: ['Pause Activity', 'Assess Impact', 'Notify Supervisor'],
    }, {
      name: 'Investigation',
      duration: '15-60 mins',
      actions: ['Gather Information', 'Consult with QA', 'Propose Solution'],
    }, {
      name: 'Follow-up',
      duration: '60+ mins',
      actions: ['Implement Fix', 'Monitor Process', 'Finalize Documentation'],
    }, ],
  },
  'Yellow-Moderate': {
    title: 'Moderate Escalation',
    color: '#facc15',
    phases: [{
      name: 'Observation',
      duration: 'Shift',
      actions: ['Document Observation', 'Inform Team Lead', 'Continue Monitoring'],
    }, {
      name: 'Action',
      duration: '24 hours',
      actions: ['Review at Shift Change', 'Determine if Action is Needed', 'Follow-up with QA'],
    }, ],
  },
  'Green-Minor': {
    title: 'Minor Event Log',
    color: '#22c55e',
    phases: [{
      name: 'Logging',
      duration: 'N/A',
      actions: ['Log event in batch record', 'No immediate action required'],
    }, ],
  },
} 