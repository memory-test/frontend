FROM node:24-slim AS prebase

# Установка необходимых пакетов
FROM prebase AS base
RUN apt-get update  && apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev


# Установка необходимых зависимостей
FROM base AS deps
WORKDIR /app

# Устанавливайте зависимости на основе менеджера пакетов
COPY package.json package-lock.json ./
# --ignore-scripts: в образе нет git, а prepare-скрипт ставит git-хуки (lefthook)
RUN npm ci --ignore-scripts

# Копирование директории с зависимостями
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Отключение телеметрии Next.js
ENV NEXT_TELEMETRY_DISABLED=1

# NEXT_PUBLIC_* переменные инлайнятся на этапе сборки — передаём через build arg
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Сборка в standalone режиме
RUN npm run build

# Копирует весь результат и запускает фронт
FROM prebase AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем standalone сборку
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

# Копируем standalone файлы
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
