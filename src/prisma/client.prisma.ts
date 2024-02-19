import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

const prismaClient = new PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  DefaultArgs
>();

export default prismaClient;
