# Node.js 18 Alpine 이미지 사용
FROM node:18-alpine as builder

# 작업 디렉토리 설정
WORKDIR /app

# package.json 복사
COPY package.json ./

# 의존성 설치 (package-lock.json이 없어도 작동)
RUN npm install --no-package-lock

# 소스 코드 복사
COPY . .

# React 앱 빌드
RUN npm run build

# Nginx 이미지 사용 (프로덕션)
FROM nginx:alpine

# 빌드된 파일을 Nginx로 복사
COPY --from=builder /app/build /usr/share/nginx/html

# Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 포트 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
