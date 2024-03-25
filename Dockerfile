# Start your image with a node base image
FROM node:20.11.1-alpine AS build

WORKDIR /app

RUN npm install -g @angular/cli

COPY package*.json ./
RUN npm install --omit=dev
RUN npm i --save-dev @types/plotly.js-dist-min

COPY ./src ./src
COPY angular.json ./
COPY tsconfig*.json ./
COPY ./assets ./assets

RUN npm run build --silent

FROM nginx:1.25-alpine
LABEL org.opencontainers.image.source https://github.com/merlingeo/formulaOne

WORKDIR /etc/nginx/html

EXPOSE 80
RUN rm -rf ./*

COPY --from=build /app/dist/f1-data-app/browser/* .
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

CMD  ["nginx", "-g", "daemon off;"]