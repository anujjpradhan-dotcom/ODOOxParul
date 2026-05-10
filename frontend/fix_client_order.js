const fs = require('fs');
const files = [
  'src/app/(dashboard)/explore/cities/[id]/page.tsx',
  'src/app/(dashboard)/trips/[id]/budget/page.tsx',
  'src/app/(dashboard)/trips/[id]/builder/page.tsx',
  'src/app/(dashboard)/trips/[id]/notes/page.tsx',
  'src/app/(dashboard)/trips/[id]/packing/page.tsx',
  'src/app/(public)/trips/[id]/page.tsx'
];
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.startsWith('import React from "react";\n"use client";')) {
    content = content.replace('import React from "react";\n"use client";\n', '"use client";\nimport React from "react";\n');
    fs.writeFileSync(file, content);
  }
});
