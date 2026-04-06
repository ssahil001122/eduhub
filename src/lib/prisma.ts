import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

// For Cloudflare D1
export const getPrisma = (db?: D1Database) => {
  if (db) {
    const adapter = new PrismaD1(db);
    return new PrismaClient({ adapter });
  }
  return new PrismaClient();
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  (process.env.NODE_ENV === "production"
    ? new PrismaClient()
    : new PrismaClient());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
