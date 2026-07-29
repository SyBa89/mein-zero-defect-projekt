const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'src');

const exts = ['.ts', '.tsx', '.js', '.jsx'];
const ignoreDirs = ['node_modules', '.next', 'dist', 'out', 'public'];

const impurePatterns = [
  { name: 'Date.now()', re: /Date\.now\s*\(/g },
  { name: 'Math.random()', re: /Math\.random\s*\(/g },
  // direct config.property without optional chaining or nullish checks
  { name: 'direct config access (config.xxx)', re: /(?<![\w\?\.] )\bconfig\.[A-Za-z0-9_]+/g },
];

let findings = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (ignoreDirs.includes(entry.name)) continue;
      walk(path.join(dir, entry.name));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (!exts.includes(ext)) continue;
      const filePath = path.join(dir, entry.name);
      const rel = path.relative(root, filePath);
      const content = fs.readFileSync(filePath, 'utf8');
      impurePatterns.forEach(p => {
        let match;
        while ((match = p.re.exec(content)) !== null) {
          const index = match.index;
          const before = content.slice(Math.max(0, index - 40), index + 40).split('\n')[0];
          findings.push({ file: rel, pattern: p.name, linePreview: before.trim(), index });
        }
      });
    }
  }
}

if (!fs.existsSync(srcDir)) {
  console.log('No src directory found, skipping safety check.');
  process.exit(0);
}

walk(srcDir);

if (findings.length === 0) {
  console.log('✅ No impure calls or direct config accesses found by the heuristic scan.');
  process.exit(0);
}

console.log('❌ Potential issues found (heuristic scan):');
findings.forEach(f => {
  console.log(`- ${f.file}: ${f.pattern} — context: "${f.linePreview}"`);
});

console.log('\nPlease review each occurrence. For Date.now()/Math.random(), move the call out of the render path or avoid using it directly in JSX. For config.xxx occurrences, prefer optional chaining (config?.xxx) or use a defaultConfig and updater pattern.');
process.exit(1);
