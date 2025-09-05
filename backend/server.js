const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// 환경변수 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 데이터베이스 연결
connectDB();

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우트 가져오기
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// 라우트 사용
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: 'NodeTest 백엔드 서버가 실행 중입니다!' });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});