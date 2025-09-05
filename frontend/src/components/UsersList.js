import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersList = ({ onClose }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      console.log('Fetching users with token:', token);
      
      const response = await axios.get('http://localhost:3001/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('API Response:', response.data);
      
      if (response.data.success) {
        console.log('Users data:', response.data.data.users);
        setUsers(response.data.data.users);
      } else {
        setError(response.data.message || '사용자 목록을 불러올 수 없습니다');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || '서버 연결 오류');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleBadge = (role) => {
    return role === 'admin' ? '관리자' : '사용자';
  };

  const getRoleClass = (role) => {
    return role === 'admin' ? 'role-admin' : 'role-user';
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content users-modal">
        <div className="modal-header">
          <h2>사용자 목록</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        
        <div className="modal-body">
          {loading ? (
            <div className="loading">사용자 목록을 불러오는 중...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="users-container">
              {users.length === 0 ? (
                <div className="no-users">등록된 사용자가 없습니다</div>
              ) : (
                <div className="users-table">
                  <div className="table-header">
                    <div className="col-username">사용자명</div>
                    <div className="col-email">이메일</div>
                    <div className="col-role">역할</div>
                    <div className="col-date">가입일</div>
                  </div>
                  {users.map((user) => (
                    <div key={user.id} className="table-row">
                      <div className="col-username">
                        <strong>{user.username}</strong>
                      </div>
                      <div className="col-email">{user.email}</div>
                      <div className="col-role">
                        <span className={`role-badge ${getRoleClass(user.role)}`}>
                          {getRoleBadge(user.role)}
                        </span>
                      </div>
                      <div className="col-date">{formatDate(user.createdAt)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button onClick={onClose} className="close-modal-btn">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
