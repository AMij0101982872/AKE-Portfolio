#
# Une seule recette pour tous les environnements :
#   target "dev"      → serveur Next.js avec hot-reload (docker compose, local)
#   target "export"   → contient uniquement ./out (utilisé par la CI pour GitHub Pages)
#   target "runtime"  → Nginx qui sert ./out (prod locale, VPS, image GHCR)
# Le site publié sur GitHub Pages et celui servi par l'image sont donc le MÊME build.

ARG NODE_VERSION=22-alpine
ARG NGINX_VERSION=1.29-alpine

# ── 1. Dépendances (cache tant que package-lock.json ne change pas) ──
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

# ── 2. Dev : hot-reload, le code est monté en volume par docker compose ──
FROM deps AS dev
ENV NEXT_TELEMETRY_DISABLED=1 \
    WATCHPACK_POLLING=true
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]

# ── 3. Qualité + build : lint, types, export statique ──
FROM deps AS build
ARG NEXT_PUBLIC_BASE_PATH=""
ENV NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH} \
    NEXT_TELEMETRY_DISABLED=1
COPY . .
RUN npm run lint && npm run typecheck && npm run build

# ── 4. Export : seulement les fichiers statiques (docker build --output) ──
FROM scratch AS export
COPY --from=build /app/out /

# ── 5. Runtime : Nginx non-root, ~20 Mo ──
FROM nginx:${NGINX_VERSION} AS runtime
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/run /var/log/nginx \
 && sed -i 's/^user .*;//' /etc/nginx/nginx.conf \
 && sed -i 's#pid .*;#pid /tmp/nginx.pid;#' /etc/nginx/nginx.conf
USER nginx
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1
CMD ["nginx", "-g", "daemon off;"]
