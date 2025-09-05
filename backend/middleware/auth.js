const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT 토큰 검증 미들웨어
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: '토큰이 필요합니다' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: '유효하지 않은 토큰입니다' });
    }
    req.user = user;
    next();
  });
};

// 관리자 권한 확인 미들웨어
const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: '관리자 권한이 필요합니다' 
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다' 
    });
  }
};

// 사용자 권한 확인 미들웨어
const requireUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: '사용자를 찾을 수 없습니다' 
      });
    }
    req.currentUser = user;
    next();
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다' 
    });
  }
};

module.exports = {
  authenticateToken,
  requireAdmin,
  requireUser
};
