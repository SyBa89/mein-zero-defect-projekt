const fs = require('fs');
const file = 'src/app/admin/(protected)/cockpit/page.tsx';
const lines = fs.readFileSync(file, 'utf-8').split('\n');

if (lines.some((l) => l.includes('cockpit-isClosed'))) {
  console.log('[SKIP] already patched');
  process.exit(0);
}

const patches = [
  { marker: 'checked={config.openingHours?.isClosed || false}', attr: 'id="cockpit-isClosed" name="isClosed"' },
  { marker: "value={config.openingHours?.emergencyMessage || ''", attr: 'id="cockpit-emergencyMessage" name="emergencyMessage"' },
  { marker: 'value={item.hours}', attr: 'id={`cockpit-hours-${index}`} name={`hours-${index}`}' },
  { marker: 'checked={item.isOpen}', attr: 'id={`cockpit-isOpen-${index}`} name={`isOpen-${index}`}' },
  { marker: "value={config.banners?.jackpotLabel || ''", attr: 'id="cockpit-jackpotLabel" name="jackpotLabel"' },
  { marker: "value={config.banners?.highlightLabel || ''", attr: 'id="cockpit-highlightLabel" name="highlightLabel"' },
];

const out = [];
for (const line of lines) {
  out.push(line);
  for (const p of patches) {
    if (line.includes(p.marker)) {
      const indent = (line.match(/^\s*/) || [''])[0] + '  ';
      out.push(indent + p.attr);
      console.log('[FIX] attr inserted after:', p.marker);
    }
  }
}
fs.writeFileSync(file, out.join('\n'), 'utf-8');
console.log('[DONE] 6 form fields patched');