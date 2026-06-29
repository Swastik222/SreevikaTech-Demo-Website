const fs = require('fs');
const path = require('path');

function removeTsFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      removeTsFiles(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      // Don't delete vite-env.d.ts if it exists, or maybe we do? Let's delete all ts/tsx.
      if (!file.endsWith('vite-env.d.ts')) {
          fs.unlinkSync(fullPath);
          console.log(`Deleted ${fullPath}`);
      }
    }
  }
}

removeTsFiles(path.join(__dirname, 'src'));
