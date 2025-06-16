import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to convert Excel to JSON
function excelToJson(excelFilePath) {
  try {
    // Read the Excel file
    const workbook = XLSX.readFile(excelFilePath);
    
    // Get the first worksheet
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    // Create output file path
    const outputPath = path.join(__dirname, '..', 'src', 'data', 'risk-matrix.json');
    
    // Write to JSON file
    fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));
    
    console.log(`Successfully converted ${excelFilePath} to JSON`);
    console.log(`Output saved to: ${outputPath}`);
  } catch (error) {
    console.error('Error converting Excel to JSON:', error);
  }
}

// Get the Excel file path from command line arguments
const excelFilePath = process.argv[2];

if (!excelFilePath) {
  console.error('Please provide the path to the Excel file');
  process.exit(1);
}

excelToJson(excelFilePath); 