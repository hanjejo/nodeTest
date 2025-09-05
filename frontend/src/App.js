import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ChangePasswordForm from './components/ChangePasswordForm';
import UsersList from './components/UsersList';
import axios from 'axios';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showUsersList, setShowUsersList] = useState(false);

  // 페이지 로드 시 토큰 확인
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // 토큰이 있으면 사용자 정보 조회
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get('http://localhost:3001/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        setUser(response.data.data.user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      // 토큰이 유효하지 않으면 제거
      localStorage.removeItem('token');
    }
  };

  const handleLogin = (userData, token) => {
    setUser(userData);
    setIsLoggedIn(true);
    if (token) {
      localStorage.setItem('token', token);
    }
  };

  const handleRegister = (userData, token) => {
    setUser(userData);
    setIsLoggedIn(true);
    if (token) {
      localStorage.setItem('token', token);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  const switchToRegister = () => {
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>NodeTest 사용자 관리 시스템</h1>
        {isLoggedIn ? (
          <div className="welcome">
            <h2>환영합니다, {user.username}님!</h2>
            <p>이메일: {user.email}</p>
            <p>역할: {user.role}</p>
            <div className="user-actions">
              {user.role === 'admin' && (
                <button onClick={() => setShowUsersList(true)} className="users-list-btn">
                  사용자 목록
                </button>
              )}
              <button onClick={() => setShowChangePassword(true)} className="change-password-btn">
                비밀번호 변경
              </button>
              <button onClick={handleLogout} className="logout-btn">
                로그아웃
              </button>
            </div>
          </div>
        ) : (
          showRegister ? (
            <RegisterForm onRegister={handleRegister} onSwitchToLogin={switchToLogin} />
          ) : (
            <LoginForm onLogin={handleLogin} onSwitchToRegister={switchToRegister} />
          )
        )}
      </header>

      {showChangePassword && (
        <ChangePasswordForm onClose={() => setShowChangePassword(false)} />
      )}

      {showUsersList && (
        <UsersList onClose={() => setShowUsersList(false)} />
      )}
    </div>
  );
}

export default App;
