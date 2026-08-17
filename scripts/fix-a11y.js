const fs = require('fs');
const path = require('path');

const file = 'src/app/admin/(protected)/cockpit/page.tsx';
const lines = fs.readFileSync(file, 'utf-8').split('\n');

let inInputBlock = false;
let inputType = '';
let inputLineStart = 0;

const patches = [
  { marker: 'checked={config.openingHours?.isClosed || false}', id: 'cockpit-isClosed', name: 'isClosed' },
  { marker: 'value={config.openingHours?.emergencyMessage || ', id: 'cockpit-emergencyMessage', name: 'emergencyMessage' },
  { marker: 'value={item.hours}', id: 'cockpit-hours-${index}', name: 'hours-${index}', dynamic: true },
  { marker: 'checked={item.isOpen}', id: 'cockpit-isOpen-${index}', name: 'isOpen-${index}', dynamic: true },
  { marker: 'value={config.banners?.jackpotLabel || ', id: 'cockpit-jackpotLabel', name: 'jackpotLabel' },
  { marker: 'value={config.banners?.highlightLabel || ', id: 'cockpit-highlightLabel', name: 'highlightLabel' },
];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Start input block
  if (line.includes('<input') || line.includes('<textarea')) {
    inInputBlock = true;
    inputType = line.includes('<textarea') ? 'textarea' : 'input';
    inputLineStart = i;
  }
  
  // Check if this line contains a marker
  for (const patch of patches) {
    if (line.includes(patch.marker)) {
      // Find the closing /> (search forward from here)
      for (let j = i; j < lines.length; j++) {
        if (lines[j].includes('/>')) {
          // Insert id and name before />
          const indent = lines[j].match(/^(\s*)/)[1];
          if (patch.dynamic) {
            lines[j] = lines[j].replace('/>', `id={\`${patch.id}\`} name={\`${patch.name}\`} />`);
          } else {
            lines[j] = lines[j].replace('/>', `id="${patch.id}" name="${patch.name}" />`);
          }
          console.log(`[FIX] Line ${j + 1}: Added id="${patch.id}" name="${patch.name}"`);
          break;
        }
      }
      break;
    }
  }
  
  // Reset on />
  if (line.includes('/>')) {
    inInputBlock = false;
  }
}

fs.writeFileSync(file, lines.join('\n'), 'utf-8');
console.log('[DONE] All 6 form fields patched');