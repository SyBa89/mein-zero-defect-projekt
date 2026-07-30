/* scripts/insert-logger-imports.js */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src');
const exts = ['.ts', '.tsx', '.js', '.jsx'];
const apply = process.argv.includes('--apply');

function walk(dir, cb) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      if (['node_modules', '.next', 'dist', 'out', 'public'].includes(name)) continue;
      walk(p, cb);
    } else {
      if (exts.includes(path.extname(name))) cb(p);
    }
  }
}

function hasLoggerImport(text) {
  return /import\s+\{?\s*logger\s*\}?\s+from\s+['"][^'"]*logger['"]/.test(text)
      || /import\s+logger\s+from\s+['"][^'"]*logger['"]/.test(text);
}

function hasLocalDeclaration(text) {
  return /(?:const|let|var)\s+logger\s*=/.test(text) || /function\s+logger\s*\(/.test(text);
}

const changes = [];

walk(src, (file) => {
  const text = fs.readFileSync(file, 'utf8');
  if (!/\blogger\b/.test(text)) return;
  if (hasLoggerImport(text) || hasLocalDeclaration(text)) return;

  const importRegex = /(^import[^\n]*\n)+/m;
  let newText;
  if (importRegex.test(text)) {
    const m = text.match(importRegex);
    const insertPos = m.index + m[0].length;
    newText = text.slice(0, insertPos) + "import { logger } from '@/lib/logger';\n" + text.slice(insertPos);
  } else {
    newText = "import { logger } from '@/lib/logger';\n" + text;
  }

  changes.push({ file, preview: newText.slice(0, 400) });

  if (apply) {
    fs.writeFileSync(file, newText, 'utf8');
  }
});

if (changes.length === 0) {
  console.log('No files required logger import insertion.');
  process.exit(0);
}

console.log((apply ? 'Applied' : 'Dry-run - would change') + ' the following files:');
changes.forEach(c => console.log(' -', c.file));
if (!apply) {
  console.log('\nTo apply changes: node scripts/insert-logger-imports.js --apply');
}
process.exit(0);
