// prisma/seed.ts
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminExists = await prisma.user.findUnique({
    where: { email: 'admin@example.com' },
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('Admin@1234', 10);
    
    await prisma.user.create({
      data: {
        fullname: 'Admin User',
        mobile: '9840271180',
        email: 'admin@example.com',
        password: hashedPassword,
        role: Role.ADMIN, // Use the Role enum here
      },
    });

    console.log('Admin user created successfully!');
  } else {
    console.log('Admin user already exists!');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
