import { Router } from "express";
import { login, checkPassword } from "../controllers/login.controllers.js";

const router = Router();

router.post("/login/", login);
router.get("/login/checkPassword", checkPassword);

export default router;
