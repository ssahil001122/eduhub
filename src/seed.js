const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const users = [
    { name: 'Admin User', email: 'admin@eduhub.com', role: 'admin' },
    { name: 'Teacher User', email: 'teacher@eduhub.com', role: 'teacher' },
    { name: 'Accountant User', email: 'accountant@eduhub.com', role: 'accountant' },
    { name: 'Student Parent', email: 'student@eduhub.com', role: 'student' }
  ];

  for (const u of users) {
    const passwordHash = await bcrypt.hash('password123', 10);
    const exists = await prisma.user.findUnique({ where: { email: u.email } });
    
    if (!exists) {
      await prisma.user.create({
        data: {
          name: u.name,
          email: u.email,
          role: u.role,
          password_hash: passwordHash
        }
      });
      console.log(`Created user ${u.email} with password "password123"`);
    } else {
      console.log(`User ${u.email} already exists.`);
    }
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
