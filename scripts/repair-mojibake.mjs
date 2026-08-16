import { readFileSync, writeFileSync } from 'node:fs';

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('Usage: node repair-mojibake.mjs <file1> <file2> ...');
  process.exit(1);
}

const replacements = [
  [/Ã¼/g, 'ü'], [/Ã¶/g, 'ö'], [/Ã¤/g, 'ä'],
  [/ÃŸ/g, 'ß'], [/Ã–/g, 'Ö'], [/Ã„/g, 'Ä'], [/Ãœ/g, 'Ü'],
  [/âœ…/g, '✅'], [/â€"/g, '–'], [/â€™/g, "'"],
  [/â€œ/g, '"'], [/â€/g, '"'], [/ðŸ/g, '🔒'],
];

for (const file of files) {
  try {
    let content = readFileSync(file, 'utf8');
    const original = content;
    
    for (const [pattern, replacement] of replacements) {
      content = content.replace(pattern, replacement);
    }
    
    if (content !== original) {
      writeFileSync(file, content, 'utf8');
      console.log(`[FIXED] ${file}`);
    } else {
      console.log(`[SKIP] ${file} (no changes)`);
    }
  } catch (err) {
    console.error(`[ERROR] ${file}: ${err.message}`);
  }
}