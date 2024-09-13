// src/users/routes/userRoutes.js
import express from 'express';
import { authenticateToken } from '../../middlewares/authMiddleware.js';
import { getUserProfile, updateUsername, updatePassword, updateProfilePicture } from '../controllers/userController.js';

const router = express.Router();

// 유저 정보 조회
router.get('/me', authenticateToken, getUserProfile);

// 닉네임 수정
router.put('/username', authenticateToken, updateUsername);

// 비밀번호 수정
router.put('/password', authenticateToken, updatePassword);

// 프로필 사진 수정
router.put('/profile-picture', authenticateToken, updateProfilePicture);

export default router;
