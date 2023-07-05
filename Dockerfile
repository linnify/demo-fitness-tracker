FROM node:16-alpine AS base

ARG APP_DIR=/app


FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR ${APP_DIR}

COPY package.json package-lock.json ${APP_DIR}/

RUN npm ci


FROM base AS builder
WORKDIR ${APP_DIR}
COPY --from=deps ${APP_DIR}/node_modules ./node_modules
COPY . .

RUN yarn build


FROM base AS runner
WORKDIR ${APP_DIR}

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder ${APP_DIR}/public ./public

COPY --from=builder --chown=nextjs:nodejs ${APP_DIR}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs ${APP_DIR}/.next/static ./.next/static

USER nextjs

EXPOSE 80

ENV PORT 80

CMD ["node", "server.js"]
