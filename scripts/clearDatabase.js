// scripts/clearDatabase.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDatabase() {
  // Zet hier je tabellen in de juiste volgorde (van afhankelijk naar onafhankelijk)
  await prisma.review.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.property.deleteMany();
  await prisma.host.deleteMany();
  await prisma.user.deleteMany();


  console.log('✅ Alle data verwijderd!');
}

clearDatabase()
  .catch((e) => {
    console.error('❌ Fout bij verwijderen:', e);
  })
  .finally(() => prisma.$disconnect());
