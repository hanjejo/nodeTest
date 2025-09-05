const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserRepository = require('../repositories/UserRepository');
const UserDTO = require('../dto/UserDTO');
const UserValidator = require('../validators/userValidator');

class AuthService {
  // JWT 토큰 생성
  generateToken(userId) {
    return jwt.sign(
      { userId }, 
      process.env.JWT_SECRET || 'your-secret-key', 
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
  }

  // JWT 토큰 검증
  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (error) {
      throw new Error('유효하지 않은 토큰입니다');
    }
  }

  // 회원가입
  async register(userData) {
    // 유효성 검사
    const validation = UserValidator.validateRegister(userData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    const { username, email, password } = UserDTO.fromRegisterRequest(userData);

    // 중복 사용자 확인
    const existingUser = await UserRepository.findExistingUser(username, email);
    if (existingUser) {
      throw new Error('이미 존재하는 사용자명 또는 이메일입니다');
    }

    // 사용자 생성
    const user = await UserRepository.create({ username, email, password });
    
    // JWT 토큰 생성
    const token = this.generateToken(user._id);

    return {
      user: UserDTO.toResponse(user),
      token
    };
  }

  // 로그인
  async login(credentials) {
    // 유효성 검사
    const validation = UserValidator.validateLogin(credentials);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    const { username, password } = UserDTO.fromLoginRequest(credentials);

    // 사용자 찾기
    const user = await UserRepository.findByUsernameOrEmail(username);
    if (!user) {
      throw new Error('사용자명 또는 비밀번호가 잘못되었습니다');
    }

    // 비밀번호 확인
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('사용자명 또는 비밀번호가 잘못되었습니다');
    }

    // JWT 토큰 생성
    const token = this.generateToken(user._id);

    return {
      user: UserDTO.toResponse(user),
      token
    };
  }

  // 비밀번호 변경
  async changePassword(userId, passwordData) {
    // 유효성 검사
    const validation = UserValidator.validateChangePassword(passwordData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    const { currentPassword, newPassword } = UserDTO.fromChangePasswordRequest(passwordData);

    // 사용자 찾기
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다');
    }

    // 현재 비밀번호 확인
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      throw new Error('현재 비밀번호가 올바르지 않습니다');
    }

    // 새 비밀번호로 업데이트
    user.password = newPassword;
    await user.save();

    return { message: '비밀번호가 성공적으로 변경되었습니다' };
  }

  // 사용자 프로필 조회
  async getProfile(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다');
    }

    return UserDTO.toResponse(user);
  }

  // 토큰에서 사용자 정보 추출
  async getUserFromToken(token) {
    const decoded = this.verifyToken(token);
    return await UserRepository.findById(decoded.userId);
  }
}

module.exports = new AuthService();
