import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { transformExcelData } from '../src/utils/dataTransform.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to convert Excel to JSON
function excelToJson(excelFilePath, outputFileName = 'risk-matrix.json') {
  try {
    // Check if file exists
    if (!fs.existsSync(excelFilePath)) {
      console.error(`Excel file not found: ${excelFilePath}`);
      return false;
    }

    console.log(`Converting ${excelFilePath} to JSON...`);
    
    // Read the Excel file
    const workbook = XLSX.readFile(excelFilePath);
    
    // Get the first worksheet
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    // Convert to JSON
    const rawData = XLSX.utils.sheet_to_json(worksheet);
    
    // Transform data to match expected format
    const jsonData = transformExcelData(rawData);
    
    // Create output file path
    const outputPath = path.join(__dirname, '..', 'src', 'data', outputFileName);
    
    // Ensure the data directory exists
    const dataDir = path.dirname(outputPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Write to JSON file
    fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));
    
    console.log(`✅ Successfully converted ${path.basename(excelFilePath)} to JSON`);
    console.log(`📁 Output saved to: ${outputPath}`);
    console.log(`📊 Processed ${jsonData.length} records`);
    
    return true;
  } catch (error) {
    console.error('❌ Error converting Excel to JSON:', error.message);
    return false;
  }
}

// Function to convert Discrepancy Guide Excel file
function convertDiscrepancyGuide() {
  const projectRoot = path.join(__dirname, '..');
  const excelFile = path.join(projectRoot, 'Discrepancy Guide.xlsx');
  
  if (fs.existsSync(excelFile)) {
    console.log(`🎯 Using Discrepancy Guide.xlsx as data source`);
    return excelToJson(excelFile, 'risk-matrix.json');
  }
  
  console.error('❌ Discrepancy Guide.xlsx not found. Please ensure the file exists in the project root.');
  return false;
}

// Main execution
const excelFilePath = process.argv[2];

if (excelFilePath) {
  // If a specific file path is provided, use it
  excelToJson(excelFilePath);
} else {
  // Otherwise, convert Discrepancy Guide
  convertDiscrepancyGuide();
} 