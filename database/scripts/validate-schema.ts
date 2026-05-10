import { execSync } from 'child_process';

function main() {
  console.log('Validating Prisma schema...');
  try {
    execSync('npx prisma validate', { stdio: 'inherit' });
    console.log('Schema validation passed.');
  } catch (error) {
    console.error('Schema validation failed:', error);
    process.exit(1);
  }
}

main();
