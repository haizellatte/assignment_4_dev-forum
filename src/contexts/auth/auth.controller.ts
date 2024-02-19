import { Router } from "express";
import AuthService from "./auth.service";

const authController = Router();

authController.post("/sign-up", AuthService.signUp);
authController.post("/log-in", AuthService.logIn);

export default authController;
