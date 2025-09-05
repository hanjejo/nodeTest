const UserRepository = require('../repositories/UserRepository');
const UserDTO = require('../dto/UserDTO');
const UserValidator = require('../validators/userValidator');

class UserService {
  // 모든 사용자 조회 (관리자용)
  async getAllUsers() {
    const users = await UserRepository.findAll();
    return UserDTO.toListResponse(users);
  }

  // 사용자 수 조회
  async getUserCount() {
    return await UserRepository.count();
  }

  // 역할별 사용자 조회
  async getUsersByRole(role) {
    if (!['user', 'admin'].includes(role)) {
      throw new Error('유효하지 않은 역할입니다');
    }

    const users = await UserRepository.findByRole(role);
    return UserDTO.toListResponse(users);
  }

  // 사용자 정보 업데이트
  async updateUser(userId, updateData) {
    // 유효성 검사
    const validation = UserValidator.validateUpdate(updateData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    const processedData = UserDTO.fromUpdateRequest(updateData);

    // 사용자 존재 확인
    const existingUser = await UserRepository.findById(userId);
    if (!existingUser) {
      throw new Error('사용자를 찾을 수 없습니다');
    }

    // 이메일 중복 확인 (이메일이 변경되는 경우)
    if (processedData.email && processedData.email !== existingUser.email) {
      const emailExists = await UserRepository.findByEmail(processedData.email);
      if (emailExists) {
        throw new Error('이미 사용 중인 이메일입니다');
      }
    }

    // 사용자명 중복 확인 (사용자명이 변경되는 경우)
    if (processedData.username && processedData.username !== existingUser.username) {
      const usernameExists = await UserRepository.findByUsername(processedData.username);
      if (usernameExists) {
        throw new Error('이미 사용 중인 사용자명입니다');
      }
    }

    // 사용자 업데이트
    const updatedUser = await UserRepository.updateById(userId, processedData);
    return UserDTO.toResponse(updatedUser);
  }

  // 사용자 삭제
  async deleteUser(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다');
    }

    await UserRepository.deleteById(userId);
    return { message: '사용자가 성공적으로 삭제되었습니다' };
  }

  // 사용자 역할 변경
  async changeUserRole(userId, newRole) {
    if (!['user', 'admin'].includes(newRole)) {
      throw new Error('유효하지 않은 역할입니다');
    }

    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다');
    }

    const updatedUser = await UserRepository.updateById(userId, { role: newRole });
    return UserDTO.toResponse(updatedUser);
  }

  // 사용자 검색
  async searchUsers(query) {
    const users = await UserRepository.findAll();
    
    // 간단한 검색 (사용자명, 이메일에서 검색)
    const filteredUsers = users.filter(user => 
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );

    return UserDTO.toListResponse(filteredUsers);
  }
}

module.exports = new UserService();
