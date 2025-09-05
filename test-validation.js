import { readFileSync } from 'fs';
import { CloudflareStorage } from './src/lib/cloudflare-storage.js';

// Load the actual content file
const contentPath = './content/site-content.json';
const content = JSON.parse(readFileSync(contentPath, 'utf-8'));

console.log('Testing validation with actual content...');

// Create storage instance
const storage = new CloudflareStorage();

// Test validation
const result = storage.validateContent(content);

console.log('Validation result:', result);

if (!result.valid && result.errors) {
  console.log('\n=== VALIDATION ERRORS ===');
  result.errors.forEach((error, index) => {
    console.log(`${index + 1}. ${error}`);
  });
  console.log('=== END ERRORS ===\n');
}

console.log('Validation completed.');