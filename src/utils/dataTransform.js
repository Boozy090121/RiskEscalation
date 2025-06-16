// Remove emoji prefix from severity values
export function removeSeverityEmoji(severity) {
  if (!severity) return ''
  
  // Remove any emoji characters and trim
  return severity.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/gu, '').trim()
}

// Function to categorize events based on keywords
function categorizeEvent(eventName) {
  const event = eventName.toLowerCase()
  
  // Equipment/Automation
  if (event.includes('equipment') || event.includes('vision system') || event.includes('metal detector') || 
      event.includes('torque') || event.includes('weight') || event.includes('calibration')) {
    return 'Equipment/Automation'
  }
  
  // Facility/Environmental  
  if (event.includes('humidity') || event.includes('pressure') || event.includes('water leak') || 
      event.includes('chemical spill') || event.includes('pest') || event.includes('cross-contamination') ||
      event.includes('reefer')) {
    return 'Facility/Environmental'
  }
  
  // Documentation
  if (event.includes('documentation') || event.includes('batch record') || event.includes('training')) {
    return 'Documentation'
  }
  
  // Systems
  if (event.includes('it system') || event.includes('serialization') || event.includes('accountability')) {
    return 'Systems'
  }
  
  // Quality
  if (event.includes('quarantine') || event.includes('endotoxin') || event.includes('sterility') || 
      event.includes('microbial') || event.includes('container closure')) {
    return 'Quality'
  }
  
  // Production
  if (event.includes('labeling') || event.includes('artwork') || event.includes('line clearance') ||
      event.includes('damaged')) {
    return 'Production'
  }
  
  return 'Production'
}

// Transform Excel data to match expected format
export function transformExcelData(rawData) {
  return rawData.map(row => {
    // Handle new Discrepancy Guide format
    const transformedRow = { ...row }
    
    // Map new field names to expected format
    if (row.Event && !row['Event Type']) {
      transformedRow['Event Type'] = row.Event
      // Categorize based on event name
      transformedRow.Category = categorizeEvent(row.Event)
    }
    
    if (row['Suggested Immediate Actions'] && !row['Quick Actions']) {
      transformedRow['Quick Actions'] = row['Suggested Immediate Actions']
    }
    
    if (row['Production Resume Criteria'] && !row['Quick Fixes']) {
      transformedRow['Quick Fixes'] = row['Production Resume Criteria']
    }
    
    // Map SOP/WI to the expected field name
    if (row['SOP/WI'] && !row['Low Priority Action']) {
      transformedRow['Low Priority Action'] = row['SOP/WI']
    }
    
    // Handle severity mapping
    if (row.Severity) {
      const severity = removeSeverityEmoji(row.Severity)
      // Map new severity values to old format for consistency
      const severityMap = {
        'Critical': 'Red-Critical',
        'Major': 'Orange-Major', 
        'Minor': 'Green-Minor',
        'Moderate': 'Yellow-Moderate'
      }
      transformedRow.Severity = severityMap[severity] || severity
    }
    
    // Add default values for missing fields
    if (!transformedRow['Response Time (SLA)']) {
      const timeMap = {
        'Red-Critical': '0-15 minutes',
        'Orange-Major': '0-2 hours',
        'Yellow-Moderate': '0-4 hours',
        'Green-Minor': '0-8 hours'
      }
      transformedRow['Response Time (SLA)'] = timeMap[transformedRow.Severity] || '0-4 hours'
    }
    
    if (!transformedRow['Risk Score']) {
      const riskMap = {
        'Red-Critical': '9-10',
        'Orange-Major': '6-8',
        'Yellow-Moderate': '3-5',
        'Green-Minor': '1-3'
      }
      transformedRow['Risk Score'] = riskMap[transformedRow.Severity] || '3-5'
    }
    
    // Create a unique key if missing
    if (!transformedRow.Key) {
      transformedRow.Key = `${transformedRow.Category || 'General'}|${transformedRow['Event Type'] || transformedRow.Event}`
    }
    
    return transformedRow
  })
}

// Format multi-line text for display
export function formatMultilineText(text) {
  if (!text) return ''
  return text.split(/\r?\n/).filter(line => line.trim())
}

// Get severity color
export function getSeverityColor(severity) {
  const cleanSeverity = removeSeverityEmoji(severity)
  const colorMap = {
    'Red-Critical': '#C32030',
    'Orange-Major': '#F57C00',
    'Yellow-Moderate': '#FBC02D',
    'Green-Minor': '#388E3C'
  }
  return colorMap[cleanSeverity] || colorMap['Green-Minor']
}