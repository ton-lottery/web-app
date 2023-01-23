FROM node:lts as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod
RUN npm install -g install-peerdeps install-peerdeps --dev eslint-config-airbnb install-peerdeps --dev eslint-config-airbnb-base
COPY . /app
RUN npm run build
FROM nginx:1.21.6-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
