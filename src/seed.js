const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const users = [
    { name: 'Admin User', email: 'admin@eduhub.com', role: 'ADMIN' },
    { name: 'Teacher User', email: 'teacher@eduhub.com', role: 'TEACHER' },
    { name: 'Accountant User', email: 'accountant@eduhub.com', role: 'ACCOUNTANT' },
    { name: 'Student Parent', email: 'student@eduhub.com', role: 'STUDENT' }
  ];

  for (const u of users) {
    const passwordHash = await bcrypt.hash('password123', 10);
    const exists = await prisma.user.findUnique({ where: { email: u.email } });
    
    if (!exists) {
      const user = await prisma.user.create({
        data: {
          name: u.name,
          email: u.email,
          role: u.role,
          password_hash: passwordHash
        }
      });
      console.log(`Created user ${u.email} with password "password123"`);

      // Mock Data if not exists
      if (u.role === 'TEACHER') {
        const teacher = await prisma.teacher.create({
          data: {
            userId: user.id,
            employeeId: 'EMP-001',
            name: user.name,
            email: user.email,
            phone: '+1 234 567 8900',
            specialization: 'Mathematics'
          }
        });
        
        // Mock Class
        const mockClass = await prisma.class.create({
          data: {
            name: '10th Grade',
            section: 'A',
            teacherId: teacher.id
          }
        });

        console.log(`Created Teacher ${teacher.name} and Class ${mockClass.name}`);
      } else if (u.role === 'STUDENT') {
        const student = await prisma.student.create({
          data: {
            userId: user.id,
            rollNumber: 'STD-001',
            name: user.name,
            email: user.email,
            phone: '+1 098 765 4321',
            gender: 'Male',
            parentName: 'John Doe Sr.',
            parentPhone: '+1 112 223 3344',
            dateOfBirth: new Date('2010-05-15')
          }
        });
        console.log(`Created Student ${student.name}`);
      }
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
