FROM node:20-alpine3.20 as dev-deps
WORKDIR /app
COPY package.json package.json
RUN yarn install
COPY . .
RUN npm install -g @ionic/cli
RUN yarn build

FROM nginx:alpine as prod
EXPOSE 90
COPY --from=dev-deps app/www /usr/share/nginx/html
COPY  ./nginx-custom.conf /etc/nginx/conf.d/default.conf
