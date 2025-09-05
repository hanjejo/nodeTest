const express = require('express');
const AuthController = require('../controllers/AuthController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// 회원가입
router.post('/register', AuthController.register);

// 로그인
router.post('/login', AuthController.login);

// 비밀번호 변경
router.put('/change-password', authenticateToken, AuthController.changePassword);

// 프로필 조회
router.get('/profile', authenticateToken, AuthController.getProfile);

// 토큰 검증
router.get('/verify', AuthController.verifyToken);

module.exports = router;
