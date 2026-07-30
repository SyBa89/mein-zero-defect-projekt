/* scripts/ensure-user-id.js */
// Dry-run by default. Use --apply to modify files.
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

function walk(dir, cb) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['node_modules', '.next', 'dist', 'out', 'public'].includes(e.name)) continue;
      walk(p, cb);
    } else {
      cb(p);
    }
  }
}

const fileList = [];
walk(path.join(repoRoot, 'src'), (p) => {
  if (p.endsWith('.ts') || p.endsWith('.tsx')) fileList.push(p);
});

const setUserObjRegex = /setUser\s*\(\s*\{\s*([^}]*?)\}\s*\)/gs;
const nameRoleRegex = /\bname\s*:\s*[^,}]+/i;
const idRegex = /\bid\s*\s*:/i;

const toChange = [];

for (const file of fileList) {
  const text = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = setUserObjRegex.exec(text)) !== null) {
    const objBody = m[1];
    if (nameRoleRegex.test(objBody) && !idRegex.test(objBody)) {
      toChange.push({ file, match: m[0] });
    }
  }
}

if (toChange.length === 0) {
  console.log('No setUser({...name..., role:...}) occurrences without id were found.');
  process.exit(0);
}

const files = [...new Set(toChange.map(x => x.file))];
console.log('Dry-run found occurrences in files:');
files.forEach(f => console.log(' -', f));
console.log('\nTo apply changes: run with --apply');

if (process.argv.includes('--apply')) {
  for (const f of files) {
    let original = fs.readFileSync(f, 'utf8');
    const updated = original.replace(/setUser\s*\(\s*\{\s*([^}]*?)\}\s*\)/gs, (full, body) => {
      if (/\bname\s*:\s*[^,}]+/i.test(body) && !/\bid\s*:/i.test(body)) {
        const idSnippet = "id: (typeof crypto !== 'undefined' && 'randomUUID' in crypto) ? (crypto as any).randomUUID() : Date.now().toString(), ";
        return 'setUser({ ' + idSnippet + body + ' })';
      }
      return full;
    });
    fs.writeFileSync(f, updated, 'utf8');
    console.log('Patched', f);
  }
  console.log('Applied patches. Please run type-check/build and review changes.');
}
