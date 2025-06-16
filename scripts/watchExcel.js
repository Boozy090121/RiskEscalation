import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File to watch
const projectRoot = path.join(__dirname, '..');
const fileToWatch = path.join(projectRoot, 'Discrepancy Guide.xlsx');

// Debounce function to prevent multiple rapid conversions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Function to convert Excel to JSON
function convertExcel() {
  console.log('🔄 Excel file changed, converting to JSON...');
  
  exec('npm run convert-excel', { cwd: projectRoot }, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error converting Excel:', error.message);
      return;
    }
    if (stderr) {
      console.error('⚠️ Warning:', stderr);
    }
    console.log(stdout);
    console.log('✅ Conversion complete! Site data updated.');
  });
}

// Debounced conversion function (wait 1 second after last change)
const debouncedConvert = debounce(convertExcel, 1000);

// Start watching file
console.log('👀 Starting Excel file watcher...');
console.log('📁 Watching for changes in:');

const watchers = [];

if (fs.existsSync(fileToWatch)) {
  console.log(`   ✅ ${path.basename(fileToWatch)}`);
  
  const watcher = fs.watchFile(fileToWatch, { interval: 1000 }, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
      console.log(`📝 ${path.basename(fileToWatch)} was modified`);
      debouncedConvert();
    }
  });
  
  watchers.push(() => fs.unwatchFile(fileToWatch));
} else {
  console.log(`   ⏳ ${path.basename(fileToWatch)} (not found, will watch if created)`);
  
  // Watch the directory for file creation
  const dirWatcher = fs.watch(projectRoot, (eventType, filename) => {
    if (filename === path.basename(fileToWatch) && eventType === 'rename') {
      if (fs.existsSync(fileToWatch)) {
        console.log(`📁 ${filename} was created, starting to watch...`);
        // Start watching the newly created file
        fs.watchFile(fileToWatch, { interval: 1000 }, (curr, prev) => {
          if (curr.mtime !== prev.mtime) {
            console.log(`📝 ${path.basename(fileToWatch)} was modified`);
            debouncedConvert();
          }
        });
      }
    }
  });
  
  watchers.push(() => dirWatcher.close());
}

// Initial conversion
console.log('🚀 Running initial conversion...');
convertExcel();

console.log('\n🎯 File watcher is running! Press Ctrl+C to stop.');
console.log('💡 Any changes to Excel files will automatically update the site data.\n');

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping file watcher...');
  watchers.forEach(cleanup => cleanup());
  console.log('✅ File watcher stopped. Goodbye!');
  process.exit(0);
});

// Keep the process alive
process.stdin.resume(); 