// src/auth/routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);  // 회원가입 라우트
router.post('/login', loginUser);  // 로그인 라우트

export default router;
