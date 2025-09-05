const UserService = require('../services/UserService');

class UserController {
  // 모든 사용자 조회 (관리자용)
  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      
      res.json({
        success: true,
        data: { users }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // 사용자 수 조회
  async getUserCount(req, res) {
    try {
      const count = await UserService.getUserCount();
      
      res.json({
        success: true,
        data: { count }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // 역할별 사용자 조회
  async getUsersByRole(req, res) {
    try {
      const { role } = req.params;
      const users = await UserService.getUsersByRole(role);
      
      res.json({
        success: true,
        data: { users }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // 사용자 정보 업데이트
  async updateUser(req, res) {
    try {
      const { userId } = req.params;
      const user = await UserService.updateUser(userId, req.body);
      
      res.json({
        success: true,
        message: '사용자 정보가 성공적으로 업데이트되었습니다',
        data: { user }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // 사용자 삭제
  async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      const result = await UserService.deleteUser(userId);
      
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

  // 사용자 역할 변경
  async changeUserRole(req, res) {
    try {
      const { userId } = req.params;
      const { role } = req.body;
      
      const user = await UserService.changeUserRole(userId, role);
      
      res.json({
        success: true,
        message: '사용자 역할이 성공적으로 변경되었습니다',
        data: { user }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // 사용자 검색
  async searchUsers(req, res) {
    try {
      const { q } = req.query;
      
      if (!q) {
        return res.status(400).json({
          success: false,
          message: '검색어를 입력해주세요'
        });
      }

      const users = await UserService.searchUsers(q);
      
      res.json({
        success: true,
        data: { users }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new UserController();
