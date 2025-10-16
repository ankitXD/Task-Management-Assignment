import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/logout", protect, logout);

export default router;
