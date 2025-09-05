class UserDTO {
  // 사용자 응답 DTO
  static toResponse(user) {
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  // 사용자 목록 응답 DTO
  static toListResponse(users) {
    return users.map(user => this.toResponse(user));
  }

  // 회원가입 요청 DTO
  static fromRegisterRequest(body) {
    const { username, email, password } = body;
    return {
      username: username?.trim(),
      email: email?.trim().toLowerCase(),
      password: password?.trim()
    };
  }

  // 로그인 요청 DTO
  static fromLoginRequest(body) {
    const { username, password } = body;
    return {
      username: username?.trim(),
      password: password?.trim()
    };
  }

  // 비밀번호 변경 요청 DTO
  static fromChangePasswordRequest(body) {
    const { currentPassword, newPassword } = body;
    return {
      currentPassword: currentPassword?.trim(),
      newPassword: newPassword?.trim()
    };
  }

  // 사용자 업데이트 요청 DTO
  static fromUpdateRequest(body) {
    const { username, email, role } = body;
    const updateData = {};
    
    if (username !== undefined) updateData.username = username.trim();
    if (email !== undefined) updateData.email = email.trim().toLowerCase();
    if (role !== undefined) updateData.role = role;
    
    return updateData;
  }
}

module.exports = UserDTO;
