import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('🚀 Starting deployment process...\n');

// Step 1: Convert Excel to JSON
console.log('📊 Step 1: Converting Excel data to JSON...');
exec('npm run convert-excel', { cwd: projectRoot }, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Error converting Excel:', error.message);
    process.exit(1);
  }
  
  console.log(stdout);
  
  // Step 2: Build the application
  console.log('🔨 Step 2: Building application...');
  exec('npm run build', { cwd: projectRoot }, (buildError, buildStdout, buildStderr) => {
    if (buildError) {
      console.error('❌ Error building application:', buildError.message);
      process.exit(1);
    }
    
    if (buildStderr) {
      console.warn('⚠️ Build warnings:', buildStderr);
    }
    
    console.log(buildStdout);
    console.log('✅ Deployment complete!');
    console.log('📁 Built files are in the "dist" directory');
    console.log('🌐 You can now deploy the contents of "dist" to your web server');
  });
}); 