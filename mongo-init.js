// MongoDB 초기화 스크립트
db = db.getSiblingDB('nodetest');

// 사용자 컬렉션 생성
db.createCollection('users');

// 인덱스 생성
db.users.createIndex({ "username": 1 }, { unique: true });
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "createdAt": -1 });

// admin 계정이 없으면 생성
var adminUser = db.users.findOne({ username: 'admin' });
if (!adminUser) {
  // bcrypt로 해시된 비밀번호 (admin123)
  var hashedPassword = '$2a$12$F0IRr4IOfQDFLpu0/vTAGOvXqhMMZf7oSsVRqwfXYGv.YAPeG9Obe';
  
  db.users.insertOne({
    username: 'admin',
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  print('Admin 계정이 생성되었습니다.');
} else {
  print('Admin 계정이 이미 존재합니다.');
}

print('MongoDB 초기화 완료');
