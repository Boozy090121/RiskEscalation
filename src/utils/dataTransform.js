// Remove emoji prefix from severity values
export function removeSeverityEmoji(severity) {
  if (!severity) return ''
  
  // Remove any emoji characters and trim
  return severity.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/gu, '').trim()
}

// Transform Excel data to match expected format
export function transformExcelData(rawData) {
  return rawData.map(row => {
    // Remove emojis from severity if present
    if (row.Severity) {
      row.Severity = removeSeverityEmoji(row.Severity)
    }
    return row
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