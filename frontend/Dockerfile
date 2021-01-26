FROM node:12.8.0-alpine

COPY . /app

WORKDIR /app

RUN npm install

RUN npm run build

RUN apk update

RUN apk add nginx

RUN mkdir -p /run/nginx

RUN mkdir -p /var/www/html

RUN cp -r /app/build/* /var/www/html

COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


