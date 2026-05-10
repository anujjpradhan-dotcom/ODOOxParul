import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2] || 'admin@traveloop.com';
  const password = process.argv[3] || 'Admin123!';

  console.log(`Creating admin user: ${email}`);

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      isAdmin: true,
      isActive: true,
    },
    create: {
      email,
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      isAdmin: true,
      isActive: true,
    },
  });

  console.log('Admin user created successfully:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
