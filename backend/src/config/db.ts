// Prisma client configuration and initialization
// In environments where prisma generate has not been run yet, provide a typed fallback
let prisma: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch {
  prisma = {
    $connect: async () => {},
    $disconnect: async () => {},
    tool: {
      findMany: async () => [],
      findUnique: async () => null,
      findFirst: async () => null,
      create: async () => ({}),
      update: async () => ({}),
      delete: async () => ({}),
    },
    user: {
      findUnique: async () => null,
      create: async () => ({}),
    },
  };
}

export { prisma };
