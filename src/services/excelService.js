import riskMatrixData from '../data/risk-matrix.json'

class ExcelService {
  async fetchData() {
    try {
      // Return the JSON data directly
      return riskMatrixData
    } catch (error) {
      console.error('Error loading risk matrix data:', error)
      throw error
    }
  }
}

export default new ExcelService() 