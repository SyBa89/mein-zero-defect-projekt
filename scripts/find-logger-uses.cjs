/* scripts/find-logger-uses.js */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src');
const exts = ['.ts', '.tsx', '.js', '.jsx'];

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

const occurrences = [];

walk(src, (file) => {
  const text = fs.readFileSync(file, 'utf8');
  if (!/\blogger\b/.test(text)) return;
  const hasImport = /import\s+\{?\s*logger\s*\}?\s+from\s+['"][^'"]*logger['"]/.test(text)
                 || /import\s+logger\s+from\s+['"][^'"]*logger['"]/.test(text)
                 || /(?:const|let|var)\s+logger\s*=/.test(text)
                 || /function\s+logger\s*\(/.test(text);
  if (!hasImport) {
    const lines = text.split(/\r?\n/);
    lines.forEach((line, i) => {
      if (/\blogger\b/.test(line)) {
        occurrences.push({ file: path.relative(root, file), line: i + 1, code: line.trim() });
      }
    });
  }
});

if (occurrences.length === 0) {
  console.log("No logger usages without import found.");
  process.exit(0);
}

console.log("logger usages without import found:");
for (const o of occurrences) {
  console.log("- " + o.file + ":L" + o.line + ": " + o.code);
}
process.exit(0);
