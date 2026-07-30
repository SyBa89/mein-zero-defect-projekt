/* scripts/codemod-fix-configs.cjs - conservative text codemod (CommonJS) */
const fs = require("fs");
const path = require("path");

function runTextCodemod(repoRoot, dry = true) {
  const srcRoot = path.join(repoRoot, "src");
  const exts = [".ts", ".tsx"];
  const files = [];

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (["node_modules", ".next", "dist", "out", "public"].includes(e.name)) continue;
        walk(p);
      } else {
        if (exts.includes(path.extname(e.name))) files.push(p);
      }
    }
  }
  if (!fs.existsSync(srcRoot)) return [];
  walk(srcRoot);

  const changedFiles = [];

  for (const file of files) {
    let text = fs.readFileSync(file, "utf8");
    let changed = false;

    // Fix 1: setConfig({...config,...}) -> setConfig(prev => ({ ...(prev ?? defaultConfig), ... }))
    const setConfigPattern = /setConfig\(\{\s*\.\.\.config\s*,([\s\S]*?)\}\)/g;
    if (setConfigPattern.test(text)) {
      text = text.replace(setConfigPattern, (m, group1) => {
        changed = true;
        return "setConfig(prev => ({ ...(prev ?? defaultConfig)," + group1 + "}))";
      });
    }

    // Fix 2: remove '?? Date.now()' to avoid Date.now() in render
    const dateNowPattern = /\?\?\s*Date\.now\s*\(\)/g;
    if (dateNowPattern.test(text)) {
      text = text.replace(dateNowPattern, "");
      changed = true;
    }

    if (changed) {
      changedFiles.push(file);
      if (!dry) fs.writeFileSync(file, text, "utf8");
    }
  }

  return changedFiles;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const repoRoot = path.resolve(__dirname, "..");

  console.log((apply ? "APPLYING" : "DRY-RUN") + " codemod...");

  const changed = runTextCodemod(repoRoot, !apply);

  if (!changed || changed.length === 0) {
    console.log("No changes made by codemod.");
    process.exit(0);
  }

  console.log((apply ? "Applied" : "Dry run - would change") + " files:");
  changed.forEach(f => console.log(" -", path.relative(repoRoot, f)));
}
