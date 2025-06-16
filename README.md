# Risk Escalation Guide

A React-based web application for production teams to quickly access risk escalation procedures and guidelines.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server with automatic Excel file watching
npm run dev-with-watch

# Or start development server only
npm run dev
```

The application will be available at `http://localhost:5173`

## 📊 Automatic Data Updates

This application automatically updates whenever you modify Excel files containing risk escalation data.

### Supported Excel Files

The system automatically detects and uses these files (in priority order):

1. **`Discrepancy Guide.xlsx`** (Primary - if present, this will be used)
2. **`Risk Escalation Matrix.xlsx`** (Fallback - used if Discrepancy Guide is not available)

### How It Works

1. **Place your Excel file** in the project root directory
2. **The system automatically converts** Excel data to JSON format
3. **The website updates** with the new data immediately

## 🛠️ Available Commands

### Development Commands

```bash
# Start development server with automatic Excel file watching
npm run dev-with-watch

# Start development server only (no file watching)
npm run dev

# Watch Excel files for changes (runs in background)
npm run watch-excel
```

### Data Management Commands

```bash
# Convert Excel to JSON manually
npm run convert-excel

# Update data and confirm success
npm run update-data
```

### Production Commands

```bash
# Build for production (includes data conversion)
npm run deploy

# Build only (without data conversion)
npm run build

# Preview production build
npm run preview
```

## 📁 File Structure

```
workspace/
├── Discrepancy Guide.xlsx          # Your Excel data file (primary)
├── Risk Escalation Matrix.xlsx     # Backup Excel data file
├── src/
│   ├── data/
│   │   └── risk-matrix.json        # Auto-generated from Excel
│   ├── components/                 # React components
│   ├── utils/
│   │   └── dataTransform.js        # Excel data transformation
│   └── ...
├── scripts/
│   ├── excelToJson.js             # Excel conversion script
│   ├── watchExcel.js              # File watcher script
│   └── deploy.js                  # Production deployment script
└── ...
```

## 🔄 Automatic Updates Workflow

### For Development

1. **Start the development environment:**
   ```bash
   npm run dev-with-watch
   ```

2. **Edit your Excel file** (`Discrepancy Guide.xlsx` or `Risk Escalation Matrix.xlsx`)

3. **Save the file** - the system automatically:
   - Detects the file change
   - Converts Excel to JSON
   - Updates the website data
   - Shows confirmation in the terminal

4. **Refresh your browser** to see the changes

### For Production

1. **Update your Excel file** with new data

2. **Deploy the updated site:**
   ```bash
   npm run deploy
   ```

3. **Upload the `dist` folder** to your web server

## 📋 Excel Data Format

The system supports two Excel formats:

### New Format (Discrepancy Guide.xlsx)
- `Event` - The event/issue name
- `Suggested Immediate Actions` - Quick response actions
- `Production Resume Criteria` - Conditions to resume production
- `SOP/WI` - Standard Operating Procedures/Work Instructions
- `Decision Authority` - Who makes the decision
- `Severity` - Critical, Major, Minor, Moderate

### Legacy Format (Risk Escalation Matrix.xlsx)
- `Event Type` - The event/issue name
- `Quick Actions` - Immediate response actions
- `Quick Fixes` - Resolution steps
- `Category` - Event category
- `Severity` - Red-Critical, Orange-Major, Yellow-Moderate, Green-Minor
- `Decision Authority` - Who makes the decision
- `Response Time (SLA)` - Expected response time
- `Risk Score` - Numerical risk assessment

## 🎨 Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Search Functionality** - Quickly find specific events
- **Color-Coded Severity** - Visual severity indicators
- **Detailed Event Information** - Comprehensive response procedures
- **Escalation Timeline** - Step-by-step escalation process
- **No Authentication Required** - Direct team access

## 🔧 Troubleshooting

### Excel File Not Detected

1. Ensure the Excel file is in the project root directory
2. Check the filename matches exactly: `Discrepancy Guide.xlsx` or `Risk Escalation Matrix.xlsx`
3. Run `npm run convert-excel` manually to test conversion

### Data Not Updating

1. Check the terminal for error messages
2. Verify the Excel file is not corrupted
3. Restart the file watcher: `npm run watch-excel`

### Build Issues

1. Ensure all dependencies are installed: `npm install`
2. Check for any console errors
3. Try a clean build: `rm -rf dist && npm run build`

## 📝 Data Transformation

The system automatically transforms Excel data to ensure compatibility:

- **Field Mapping** - Maps new field names to expected format
- **Severity Normalization** - Converts severity values to consistent format
- **Default Values** - Adds missing fields with appropriate defaults
- **Data Cleaning** - Removes emoji prefixes and normalizes text

## 🚀 Deployment

### Development Deployment

```bash
# Start with file watching
npm run dev-with-watch
```

### Production Deployment

```bash
# Build for production
npm run deploy

# Upload the 'dist' folder to your web server
```

## 📞 Support

For issues or questions:

1. Check the terminal output for error messages
2. Verify your Excel file format matches the expected structure
3. Ensure all dependencies are installed with `npm install`

---

**Note**: This application is designed for reference only and should be used in conjunction with your organization's official procedures and protocols. 