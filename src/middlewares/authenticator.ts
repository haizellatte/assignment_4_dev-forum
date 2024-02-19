import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";
import prismaClient from "../prisma/client.prisma";

const publicRoutes = ["/", "/auth/sign-up", "/auth/log-in"];

async function authenticator(req: Request, res: Response, next: NextFunction) {
  if (publicRoutes.includes(req.url)) return next();

  const accessToken = req.headers.authorization?.split("Bearer ")[1];
  if (!accessToken) return res.sendStatus(401);

  const { sub: id } = jwt.verify(accessToken, JWT_SECRET_KEY) as {
    sub: string;
  };

  const user = await prismaClient.user.findUnique({
    where: { id: Number(id) },
    select: { id: true, email: true },
  });

  if (!user) return res.sendStatus(404);

  req.user = user;

  next();
}

export default authenticator;
