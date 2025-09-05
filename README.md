# NodeTest - 사용자 관리 시스템

Node.js + React 기반의 사용자 관리 시스템입니다. JWT 인증, 역할 기반 접근 제어, Docker 컨테이너화를 지원합니다.

## 🚀 빠른 시작

### Docker Compose로 실행 (권장)

```bash
# 개발 환경 실행
docker-compose -f docker-compose.dev.yml up -d

# 프로덕션 환경 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 서비스 중지
docker-compose down
```

### 접속 정보

- **프론트엔드**: http://localhost:3000
- **백엔드 API**: http://localhost:3001
- **MongoDB**: mongodb://localhost:27017/nodetest_dev

### 기본 계정

- **관리자**: `admin` / `admin123`
- **일반 사용자**: 회원가입 후 사용

## 🏗️ 기술 스택

### 백엔드
- **Node.js** 18+ - 런타임 환경
- **Express.js** - 웹 프레임워크
- **MongoDB** - 데이터베이스
- **Mongoose** - ODM
- **JWT** - 인증 토큰
- **bcryptjs** - 비밀번호 해싱
- **CORS** - Cross-Origin Resource Sharing

### 프론트엔드
- **React** 18+ - UI 라이브러리
- **Axios** - HTTP 클라이언트
- **CSS3** - 스타일링

### 인프라
- **Docker** - 컨테이너화
- **Docker Compose** - 멀티 컨테이너 관리
- **Nginx** - 웹 서버 (프로덕션)

## 📋 서비스 정보

| 서비스 | 포트 | 설명 | 접속 방법 |
|--------|------|------|-----------|
| **Frontend** | 3000 | React 앱 | http://localhost:3000 |
| **Backend** | 3001 | Node.js API | http://localhost:3001 |
| **MongoDB** | 27017 | 데이터베이스 | mongodb://localhost:27017 |
| **Redis** | 6379 | 캐시 | redis://localhost:6379 |

## 🔧 주요 기능

### 인증 시스템
- ✅ **회원가입**: 사용자명, 이메일, 비밀번호
- ✅ **로그인**: JWT 토큰 기반 인증
- ✅ **자동 로그인**: 토큰 기반 세션 유지
- ✅ **비밀번호 변경**: 현재 비밀번호 확인 후 변경

### 사용자 관리
- ✅ **사용자 목록**: 관리자만 조회 가능
- ✅ **역할 관리**: 관리자/일반 사용자 구분
- ✅ **권한 제어**: 역할 기반 접근 제어

### 보안 기능
- ✅ **비밀번호 해싱**: bcryptjs 사용
- ✅ **JWT 토큰**: 안전한 인증
- ✅ **CORS 설정**: Cross-Origin 요청 제어
- ✅ **환경변수 보호**: 민감한 정보 분리

## 🐳 Docker 명령어

### 개발 환경
```bash
# 개발 환경 시작
docker-compose -f docker-compose.dev.yml up -d

# 특정 서비스만 시작
docker-compose -f docker-compose.dev.yml up -d backend frontend

# 서비스 재시작
docker-compose -f docker-compose.dev.yml restart

# 로그 확인
docker-compose -f docker-compose.dev.yml logs -f backend
```

### 프로덕션 환경
```bash
# 프로덕션 환경 시작
docker-compose up -d

# 이미지 빌드
docker-compose build

# 서비스 중지
docker-compose down

# 볼륨 정리
docker-compose down -v
```

## 📁 프로젝트 구조

```
nodeTest/
├── backend/                    # Node.js 백엔드
│   ├── controllers/           # 컨트롤러 (HTTP 요청 처리)
│   │   ├── AuthController.js  # 인증 관련
│   │   └── UserController.js  # 사용자 관리
│   ├── services/             # 서비스 레이어 (비즈니스 로직)
│   │   ├── AuthService.js    # 인증 서비스
│   │   └── UserService.js    # 사용자 서비스
│   ├── repositories/         # 리포지토리 (데이터 접근)
│   │   └── UserRepository.js # 사용자 데이터 접근
│   ├── models/              # 데이터 모델
│   │   └── User.js          # 사용자 스키마
│   ├── middleware/          # 미들웨어
│   │   └── auth.js          # 인증/권한 미들웨어
│   ├── routes/             # 라우트
│   │   ├── auth.js         # 인증 라우트
│   │   └── users.js        # 사용자 라우트
│   ├── dto/               # DTO (데이터 전송 객체)
│   │   └── UserDTO.js     # 사용자 DTO
│   ├── validators/        # 유효성 검사
│   │   └── userValidator.js
│   ├── config/           # 설정
│   │   └── database.js   # 데이터베이스 연결
│   ├── Dockerfile        # 백엔드 Docker 이미지
│   └── server.js         # 서버 진입점
├── frontend/             # React 프론트엔드
│   ├── src/
│   │   ├── components/   # React 컴포넌트
│   │   │   ├── LoginForm.js      # 로그인 폼
│   │   │   ├── RegisterForm.js   # 회원가입 폼
│   │   │   ├── ChangePasswordForm.js # 비밀번호 변경
│   │   │   └── UsersList.js      # 사용자 목록
│   │   ├── App.js        # 메인 앱 컴포넌트
│   │   ├── App.css       # 스타일
│   │   └── index.js      # 진입점
│   ├── public/
│   │   └── index.html    # HTML 템플릿
│   ├── Dockerfile        # 프론트엔드 Docker 이미지
│   ├── Dockerfile.dev    # 개발용 Docker 이미지
│   └── nginx.conf        # Nginx 설정
├── docker-compose.yml        # 프로덕션 Docker Compose
├── docker-compose.dev.yml    # 개발용 Docker Compose
├── mongo-init.js            # MongoDB 초기화 스크립트
├── env.example              # 환경변수 예시
└── README.md
```

## 🔍 API 엔드포인트

### 인증 API
```bash
# 회원가입
POST /api/auth/register
{
  "username": "string",
  "email": "string",
  "password": "string"
}

# 로그인
POST /api/auth/login
{
  "username": "string",
  "password": "string"
}

# 비밀번호 변경
PUT /api/auth/change-password
Authorization: Bearer <token>
{
  "currentPassword": "string",
  "newPassword": "string"
}

# 프로필 조회
GET /api/auth/profile
Authorization: Bearer <token>
```

### 사용자 관리 API (관리자만)
```bash
# 사용자 목록 조회
GET /api/users
Authorization: Bearer <token>

# 사용자 수 조회
GET /api/users/count
Authorization: Bearer <token>

# 역할별 사용자 조회
GET /api/users/role/:role
Authorization: Bearer <token>

# 사용자 검색
GET /api/users/search?q=검색어
Authorization: Bearer <token>
```

## 🛠️ 개발 환경 설정

### 1. 환경변수 설정
```bash
# 환경변수 파일 복사
cp env.example .env

# 필요한 값들 수정
# JWT_SECRET, MONGODB_URI 등
```

### 2. 수동 실행 (Docker 없이)
```bash
# 백엔드 실행
cd backend
npm install
npm run dev

# 프론트엔드 실행 (새 터미널)
cd frontend
npm install
npm start
```

### 3. 데이터베이스 설정
```bash
# MongoDB 연결 확인
mongosh mongodb://localhost:27017/nodetest_dev

# 사용자 확인
db.users.find()
```

## 🔒 보안 설정

### 환경변수 보호
- `.env` 파일은 Git에 포함되지 않음
- 실제 시크릿 키는 환경변수로 관리
- `env.example` 파일로 설정 가이드 제공

### 권한 관리
- JWT 토큰 기반 인증
- 역할 기반 접근 제어 (RBAC)
- 관리자/일반 사용자 구분

## 🐛 문제 해결

### 일반적인 문제
1. **포트 충돌**: 3000, 3001 포트가 사용 중인 경우
2. **Docker 권한**: Docker 실행 권한 확인
3. **환경변수**: `.env` 파일 설정 확인

### 로그 확인
```bash
# 모든 서비스 로그
docker-compose logs -f

# 특정 서비스 로그
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 📝 라이선스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.