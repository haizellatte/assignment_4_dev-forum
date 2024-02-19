import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../config";
import prismaClient from "../../prisma/client.prisma";

async function signUp(
  req: Request<{ email: string; password: string }>,
  res: Response<Omit<User, "encryptedPassword">>,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    if (!email.trim()) throw new Error("No email");
    if (!password.trim()) throw new Error("No password");

    const encryptedPassword = await bcrypt.hash(password, 15);

    const user = await prismaClient.user.create({
      data: { email, encryptedPassword },
      select: {
        id: true,
        email: true,
        createdAt: true,
        post: true,
        like: true,
      },
    });
    console.log("회원가입에 성공했습니다.");
    res.json(user);
  } catch (e) {
    next(e);
  }
}

async function logIn(
  req: Request<{ email: string; password: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    if (!email.trim()) throw new Error("No email");
    if (!password.trim()) throw new Error("No password");

    const user = await prismaClient.user.findUnique({
      where: { email },
      include: { post: true, like: true },
    });
    if (!user) return res.send(404);

    const isVerified = bcrypt.compare(password, user.encryptedPassword);
    if (!isVerified) return res.sendStatus(401);

    const userId = String(user.id);
    const accessToken = jwt.sign({ userId }, JWT_SECRET_KEY, {
      subject: userId,
    });

    console.log("로그인에 성공했습니다.");
    res.json(accessToken);
  } catch (e) {
    next(e);
  }
}

const AuthService = {
  signUp,
  logIn,
};

export default AuthService;
