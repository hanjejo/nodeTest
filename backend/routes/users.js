const express = require('express');
const UserController = require('../controllers/UserController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// 모든 사용자 조회 (관리자만)
router.get('/', authenticateToken, requireAdmin, UserController.getAllUsers);

// 사용자 수 조회 (관리자만)
router.get('/count', authenticateToken, requireAdmin, UserController.getUserCount);

// 역할별 사용자 조회 (관리자만)
router.get('/role/:role', authenticateToken, requireAdmin, UserController.getUsersByRole);

// 사용자 검색 (관리자만)
router.get('/search', authenticateToken, requireAdmin, UserController.searchUsers);

// 사용자 정보 업데이트 (관리자만)
router.put('/:userId', authenticateToken, requireAdmin, UserController.updateUser);

// 사용자 삭제 (관리자만)
router.delete('/:userId', authenticateToken, requireAdmin, UserController.deleteUser);

// 사용자 역할 변경 (관리자만)
router.patch('/:userId/role', authenticateToken, requireAdmin, UserController.changeUserRole);

module.exports = router;
