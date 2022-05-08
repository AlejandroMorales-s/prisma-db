const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async function main() {
  try {
    const woopa = await prisma.explorer.upsert({
      where: { name: 'Woopa' },
      update: {},
      create: {
        name: 'Woopa',
				username: 'ajolonauta',
				mission: 'Node'
      },
    });

    const woopa1 = await prisma.explorer.upsert({
      where: { name: 'Woopa1' },
      update: {},
      create: {
        name: 'Woopa1',
				username: 'ajolonauta1',
				mission: 'Node'
      },
    });

    const woopa2 = await prisma.explorer.upsert({
      where: { name: 'Woopa 2' },
      update: {},
      create: {
        name: 'Woopa 2',
				username: 'ajolonauta2',
				mission: 'Java'
      },
    });

    const woopa3 = await prisma.explorer.upsert({
      where: { name: 'Woopa 3' },
      update: {},
      create: {
        name: 'Woopa 3',
				username: 'ajolonauta3',
				mission: 'Node'
      },
    });

    const Alejandro = await prisma.explorer.upsert({
        where: { name: 'Alejandro' },
        update: {},
        create: {
          name: 'Alejandro',
                  username: 'Tiburon',
                  mission: 'Node'
        },
      });

    const Zoe = await prisma.partner.upsert({
        where: { name: 'Zoe' },
        update: {},
        create: {
          name: 'Zoe',
                lang: 'ES',
                missionComander: 'Carlo',
                enrollments: 2,
                hasCertification: true
        },
    });

    const Tzuzul = await prisma.partner.upsert({
      where: { name: 'Tzuzul' },
      update: {},
      create: {
        name: 'Tzuzul',
              lang: 'EN',
              missionComander: 'Carlo',
              enrollments: 4,
              hasCertification: false
      },
    });

    const Maria = await prisma.missionCommander.upsert({
      where: { name: 'Maria' },
      update: {},
      create: {
        name: 'Maria',
              username: 'Maria123',
              mainStack: 'java',
              currentEnrollment: true,
              hasAzureCertification: false
      },
    });

    const Gustavo = await prisma.missionCommander.upsert({
      where: { name: 'Gustavo' },
      update: {},
      create: {
        name: 'Gustavo',
              username: 'Gustavo90823',
              mainStack: 'node',
              currentEnrollment: true,
              hasAzureCertification: true
      },
    });


    console.log('Create 4 explorers, 2 partner and 2 missionComander');
  } catch(e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();