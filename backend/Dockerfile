# Node.js 18 Alpine 이미지 사용
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json 복사
COPY package.json ./

# 의존성 설치 (package-lock.json이 없어도 작동)
RUN npm install --omit=dev --no-package-lock

# 소스 코드 복사
COPY . .

# 포트 노출
EXPOSE 3001

# 환경변수 설정
ENV NODE_ENV=production
ENV PORT=3001

# 헬스체크 추가
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# 애플리케이션 실행
CMD ["npm", "start"]
