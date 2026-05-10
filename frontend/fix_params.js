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
  content = content.replace(/\{ params \}: \{ params: \{ id: string \} \}/g, '{ params }: { params: Promise<{ id: string }> }');
  content = content.replace(/params\.id/g, 'React.use(params).id');
  if (content.includes('React.use') && !content.includes('import * as React from')) {
    content = 'import React from "react";\n' + content;
  }
  fs.writeFileSync(file, content);
});
