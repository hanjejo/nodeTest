const User = require('../models/User');

class UserRepository {
  // 사용자 생성
  async create(userData) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw new Error(`사용자 생성 실패: ${error.message}`);
    }
  }

  // ID로 사용자 조회
  async findById(id) {
    try {
      return await User.findById(id).select('-password');
    } catch (error) {
      throw new Error(`사용자 조회 실패: ${error.message}`);
    }
  }

  // 사용자명 또는 이메일로 조회
  async findByUsernameOrEmail(identifier) {
    try {
      return await User.findOne({
        $or: [{ username: identifier }, { email: identifier }]
      });
    } catch (error) {
      throw new Error(`사용자 조회 실패: ${error.message}`);
    }
  }

  // 이메일로 조회
  async findByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw new Error(`사용자 조회 실패: ${error.message}`);
    }
  }

  // 사용자명으로 조회
  async findByUsername(username) {
    try {
      return await User.findOne({ username });
    } catch (error) {
      throw new Error(`사용자 조회 실패: ${error.message}`);
    }
  }

  // 중복 사용자 확인
  async findExistingUser(username, email) {
    try {
      return await User.findOne({
        $or: [{ username }, { email }]
      });
    } catch (error) {
      throw new Error(`사용자 중복 확인 실패: ${error.message}`);
    }
  }

  // 모든 사용자 조회 (관리자용)
  async findAll() {
    try {
      return await User.find({}).select('-password').sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`사용자 목록 조회 실패: ${error.message}`);
    }
  }

  // 사용자 업데이트
  async updateById(id, updateData) {
    try {
      return await User.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
      }).select('-password');
    } catch (error) {
      throw new Error(`사용자 업데이트 실패: ${error.message}`);
    }
  }

  // 사용자 삭제
  async deleteById(id) {
    try {
      return await User.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`사용자 삭제 실패: ${error.message}`);
    }
  }

  // 사용자 수 조회
  async count() {
    try {
      return await User.countDocuments();
    } catch (error) {
      throw new Error(`사용자 수 조회 실패: ${error.message}`);
    }
  }

  // 역할별 사용자 조회
  async findByRole(role) {
    try {
      return await User.find({ role }).select('-password');
    } catch (error) {
      throw new Error(`역할별 사용자 조회 실패: ${error.message}`);
    }
  }
}

module.exports = new UserRepository();
