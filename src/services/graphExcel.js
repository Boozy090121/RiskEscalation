import axios from 'axios'
import { graphConfig } from './authConfig'
import { getAccessToken } from './authService'
import { GRAPH_CONFIG, CACHE_CONFIG } from '../constants'
import { transformExcelData } from '../utils/dataTransform'

class GraphExcelService {
  constructor() {
    this.baseUrl = graphConfig.graphFilesEndpoint
  }

  isCacheValid() {
    const cached = localStorage.getItem(CACHE_CONFIG.CACHE_KEY)
    if (!cached) return false

    try {
      const { timestamp } = JSON.parse(cached)
      const now = Date.now()
      return (now - timestamp) < CACHE_CONFIG.CACHE_DURATION
    } catch {
      return false
    }
  }

  getCachedData() {
    try {
      const cached = localStorage.getItem(CACHE_CONFIG.CACHE_KEY)
      if (cached) {
        const { data } = JSON.parse(cached)
        return data
      }
    } catch (error) {
      console.error('Cache read error:', error)
    }
    return null
  }

  cacheData(data) {
    try {
      localStorage.setItem(CACHE_CONFIG.CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }))
    } catch (error) {
      console.error('Cache write error:', error)
    }
  }

  async fetchRiskMatrix(instance, account) {
    if (this.isCacheValid()) {
      const cachedData = this.getCachedData()
      if (cachedData) {
        console.log('Using cached data')
        return cachedData
      }
    }

    try {
      const accessToken = await getAccessToken(instance, account, ['Files.Read.All'])
      
      const tableUrl = `${this.baseUrl}:${GRAPH_CONFIG.EXCEL_PATH}:/workbook/tables('${GRAPH_CONFIG.TABLE_NAME}')/rows`
      
      const response = await axios.get(tableUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })

      const headers = response.data.value[0]?.values[0] || []
      const rows = response.data.value.slice(1) || []
      
      const transformedData = rows.map(row => {
        const obj = {}
        headers.forEach((header, index) => {
          obj[header] = row.values[0][index] || ''
        })
        return obj
      })

      const cleanedData = transformExcelData(transformedData)
      this.cacheData(cleanedData)

      return cleanedData
    } catch (error) {
      console.error('Error fetching Excel data:', error)
      
      const cachedData = this.getCachedData()
      if (cachedData) {
        console.log('Using expired cache due to network error')
        return cachedData
      }
      
      throw error
    }
  }

  clearCache() {
    localStorage.removeItem(CACHE_CONFIG.CACHE_KEY)
  }
}

export default new GraphExcelService()