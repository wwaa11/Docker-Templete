FROM node:20-slim AS build
ARG BASE_PATH=/template-base/
ENV VITE_BASE_PATH=$BASE_PATH
ENV BASE_PATH=$BASE_PATH
RUN groupadd -r appgroup && useradd -r -g appgroup appuser
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH
COPY --chown=appuser:appgroup package*.json ./
RUN npm ci
COPY --chown=appuser:appgroup . .
RUN npm run build

FROM nginx:alpine AS runtime
ARG BASE_PATH=/template-base/
ENV BASE_PATH=$BASE_PATH
COPY default.conf.template /etc/nginx/templates/default.conf.template
RUN mkdir -p /usr/share/nginx/html${BASE_PATH}
COPY --from=build /app/dist /usr/share/nginx/html${BASE_PATH}
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
