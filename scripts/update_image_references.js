const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'data/portfolioData.ts',
  'app/layout.tsx',
  'components/About.tsx',
  'components/Academics.tsx',
  'components/Contact.tsx',
  'components/DigitalLifestyle.tsx',
  'components/Hero.tsx',
  'components/MotionGraphicLab.tsx',
  'public/sitemap.xml',
];

let totalReplacements = 0;

for (const relPath of filesToUpdate) {
  const fullPath = path.resolve(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`[SKIP] File not found: ${relPath}`);
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let count = 0;

  // Replace /images/...jpg and /images/...png with .webp, but keep originalFileName: "....jpg" intact
  const updated = content.replace(/\/images\/([a-zA-Z0-9_\-\.\/]+)\.(jpg|jpeg|png)/g, (match, p1, ext) => {
    count++;
    return `/images/${p1}.webp`;
  });

  if (count > 0) {
    fs.writeFileSync(fullPath, updated, 'utf8');
    totalReplacements += count;
    console.log(`[OK] Updated ${relPath} (${count} references changed to .webp)`);
  } else {
    console.log(`[INFO] No changes needed in ${relPath}`);
  }
}

console.log(`\nSuccessfully updated ${totalReplacements} image references across the project!`);
