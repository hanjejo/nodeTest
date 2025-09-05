# NodeTest - 사용자 관리 시스템

Node.js + React 기반의 사용자 관리 시스템입니다.

## 🏗️ 아키텍처

- **백엔드**: Node.js + Express + MongoDB + Redis + RabbitMQ
- **프론트엔드**: React + Axios
- **인증**: JWT
- **권한**: Casbin
- **컨테이너**: Docker + Docker Compose

## 🚀 빠른 시작

### Docker Compose로 실행 (권장)

```bash
# 프로덕션 환경
docker-compose up -d

# 개발 환경
docker-compose -f docker-compose.dev.yml up -d

# 로그 확인
docker-compose logs -f

# 서비스 중지
docker-compose down
```

### 수동 실행

1. **환경변수 설정**
   ```bash
   cp env.example .env
   # .env 파일을 편집하여 필요한 설정값들을 수정
   ```

2. **백엔드 실행**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **프론트엔드 실행**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## 📋 서비스 정보

| 서비스 | 포트 | 설명 |
|--------|------|------|
| Frontend | 3000 | React 앱 |
| Backend | 3001 | Node.js API |
| MongoDB | 27017 | 데이터베이스 |
| Redis | 6379 | 캐시 |
| RabbitMQ | 5672 | 메시지 큐 |
| RabbitMQ Management | 15672 | 관리 인터페이스 |

## 🔧 주요 기능

- ✅ **회원가입/로그인**: JWT 기반 인증
- ✅ **비밀번호 변경**: 현재 비밀번호 확인 후 변경
- ✅ **사용자 목록**: 관리자만 조회 가능
- ✅ **권한 관리**: 관리자/일반 사용자 구분
- ✅ **클린 아키텍처**: Controller-Service-Repository 패턴

## 🐳 Docker 명령어

```bash
# 이미지 빌드
docker-compose build

# 서비스 시작
docker-compose up -d

# 특정 서비스만 시작
docker-compose up -d backend frontend

# 서비스 재시작
docker-compose restart

# 로그 확인
docker-compose logs -f backend

# 볼륨 정리
docker-compose down -v

# 이미지 정리
docker-compose down --rmi all
```

## 🔍 개발 도구

- **MongoDB 관리**: MongoDB Compass 연결 `mongodb://localhost:27017`
- **Redis 관리**: Redis CLI `redis-cli`
- **RabbitMQ 관리**: http://localhost:15672 (admin/password123)

## 📁 프로젝트 구조

```
nodeTest/
├── backend/                 # Node.js 백엔드
│   ├── controllers/        # 컨트롤러
│   ├── services/          # 서비스 레이어
│   ├── repositories/      # 리포지토리
│   ├── models/           # 데이터 모델
│   ├── middleware/       # 미들웨어
│   ├── routes/          # 라우트
│   ├── dto/            # DTO
│   ├── validators/     # 유효성 검사
│   └── config/         # 설정
├── frontend/            # React 프론트엔드
│   ├── src/
│   │   ├── components/  # React 컴포넌트
│   │   ├── App.js      # 메인 앱
│   │   └── App.css     # 스타일
│   └── public/         # 정적 파일
├── docker-compose.yml  # 프로덕션 Docker Compose
├── docker-compose.dev.yml  # 개발용 Docker Compose
└── README.md
```