import { Router } from "express";
import { createNewUser, login } from "../controllers/authController";
const router = Router();

router.post("/register", createNewUser);
router.post("/login", login);

export default router;
