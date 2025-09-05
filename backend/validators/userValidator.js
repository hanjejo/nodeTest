const UserDTO = require('../dto/UserDTO');

class UserValidator {
  // 회원가입 유효성 검사
  static validateRegister(data) {
    const errors = [];
    const { username, email, password } = UserDTO.fromRegisterRequest(data);

    // 사용자명 검사
    if (!username) {
      errors.push('사용자명을 입력해주세요');
    } else if (username.length < 3) {
      errors.push('사용자명은 최소 3자 이상이어야 합니다');
    } else if (username.length > 30) {
      errors.push('사용자명은 최대 30자까지 가능합니다');
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errors.push('사용자명은 영문, 숫자, 언더스코어만 사용 가능합니다');
    }

    // 이메일 검사
    if (!email) {
      errors.push('이메일을 입력해주세요');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('올바른 이메일 형식을 입력해주세요');
    }

    // 비밀번호 검사
    if (!password) {
      errors.push('비밀번호를 입력해주세요');
    } else if (password.length < 6) {
      errors.push('비밀번호는 최소 6자 이상이어야 합니다');
    } else if (password.length > 100) {
      errors.push('비밀번호는 최대 100자까지 가능합니다');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // 로그인 유효성 검사
  static validateLogin(data) {
    const errors = [];
    const { username, password } = UserDTO.fromLoginRequest(data);

    if (!username) {
      errors.push('사용자명 또는 이메일을 입력해주세요');
    }

    if (!password) {
      errors.push('비밀번호를 입력해주세요');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // 비밀번호 변경 유효성 검사
  static validateChangePassword(data) {
    const errors = [];
    const { currentPassword, newPassword } = UserDTO.fromChangePasswordRequest(data);

    if (!currentPassword) {
      errors.push('현재 비밀번호를 입력해주세요');
    }

    if (!newPassword) {
      errors.push('새 비밀번호를 입력해주세요');
    } else if (newPassword.length < 6) {
      errors.push('새 비밀번호는 최소 6자 이상이어야 합니다');
    } else if (newPassword.length > 100) {
      errors.push('새 비밀번호는 최대 100자까지 가능합니다');
    }

    if (currentPassword && newPassword && currentPassword === newPassword) {
      errors.push('새 비밀번호는 현재 비밀번호와 달라야 합니다');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // 사용자 업데이트 유효성 검사
  static validateUpdate(data) {
    const errors = [];
    const updateData = UserDTO.fromUpdateRequest(data);

    if (updateData.username !== undefined) {
      if (updateData.username.length < 3) {
        errors.push('사용자명은 최소 3자 이상이어야 합니다');
      } else if (updateData.username.length > 30) {
        errors.push('사용자명은 최대 30자까지 가능합니다');
      } else if (!/^[a-zA-Z0-9_]+$/.test(updateData.username)) {
        errors.push('사용자명은 영문, 숫자, 언더스코어만 사용 가능합니다');
      }
    }

    if (updateData.email !== undefined) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updateData.email)) {
        errors.push('올바른 이메일 형식을 입력해주세요');
      }
    }

    if (updateData.role !== undefined) {
      if (!['user', 'admin'].includes(updateData.role)) {
        errors.push('역할은 user 또는 admin이어야 합니다');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = UserValidator;
