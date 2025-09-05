const AuthService = require('../services/AuthService');

class AuthController {
  // 회원가입
  async register(req, res) {
    try {
      const result = await AuthService.register(req.body);
      
      res.status(201).json({
        success: true,
        message: '회원가입이 완료되었습니다',
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // 로그인
  async login(req, res) {
    try {
      const result = await AuthService.login(req.body);
      
      res.json({
        success: true,
        message: '로그인 성공',
        data: result
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }

  // 비밀번호 변경
  async changePassword(req, res) {
    try {
      const result = await AuthService.changePassword(req.user.userId, req.body);
      
      res.json({
        success: true,
        message: result.message
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // 프로필 조회
  async getProfile(req, res) {
    try {
      const user = await AuthService.getProfile(req.user.userId);
      
      res.json({
        success: true,
        data: { user }
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  // 토큰 검증
  async verifyToken(req, res) {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: '토큰이 필요합니다'
        });
      }

      const user = await AuthService.getUserFromToken(token);
      
      res.json({
        success: true,
        data: { user: AuthService.UserDTO ? AuthService.UserDTO.toResponse(user) : user }
      });
    } catch (error) {
      res.status(403).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new AuthController();
