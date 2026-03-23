FROM node:20-slim AS build

RUN groupadd -r appgroup && useradd -r -g appgroup appuser
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH
COPY --chown=appuser:appgroup package*.json ./
RUN npm ci
COPY --chown=appuser:appgroup . .
RUN npm run build

FROM nginx:alpine AS runtime
COPY default.conf.template /etc/nginx/templates/default.conf.template
RUN mkdir -p /usr/share/nginx/html/need_to_change
COPY --from=build /app/dist /usr/share/nginx/html/need_to_change
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
