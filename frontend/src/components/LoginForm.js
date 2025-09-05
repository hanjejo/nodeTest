import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', formData);
      
      if (response.data.success) {
        onLogin(response.data.data.user, response.data.data.token);
      } else {
        setError(response.data.message || '로그인 실패');
      }
    } catch (err) {
      setError(err.response?.data?.message || '서버 연결 오류');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>로그인</h2>
      
      <div className="form-group">
        <label htmlFor="username">사용자명:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">비밀번호:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {error && <div className="error">{error}</div>}

      <button type="submit" disabled={loading} className="login-btn">
        {loading ? '로그인 중...' : '로그인'}
      </button>

      <div className="switch-form">
        <p>계정이 없으신가요? <button type="button" onClick={onSwitchToRegister} className="switch-btn">회원가입</button></p>
      </div>
    </form>
  );
};

export default LoginForm;
