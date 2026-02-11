FROM mcr.microsoft.com/playwright:v1.58.1-noble

WORKDIR /app

# 의존성 설치 (레이어 캐싱 최적화)
COPY server/package*.json ./server/
RUN cd server && npm ci

# shared 타입 + 서버 소스 복사
COPY shared/ ./shared/
COPY server/ ./server/

WORKDIR /app/server

ENV PORT=4000
EXPOSE 4000

CMD ["npx", "tsx", "index.ts"]
