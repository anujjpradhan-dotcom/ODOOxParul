import { execSync } from 'child_process';

function main() {
  console.log('Generating Prisma client...');
  try {
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('Client generated successfully.');
  } catch (error) {
    console.error('Failed to generate Prisma client:', error);
    process.exit(1);
  }
}

main();
