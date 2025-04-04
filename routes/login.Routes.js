import { Router } from "express";
import { login, checkPassword } from "../controllers/login.controllers.js";
import { verifyToken } from "../utils/auth.middleware.js";

const router = Router();

router.post("/login/", login);
router.get("/login/checkPassword", verifyToken, checkPassword); // Proteger esta ruta

export default router;