FROM node:latest as node
ENV BASEURL='service'
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=node /app/dist/contact-list-angular-app-kuehne-nagel /usr/share/nginx/html

CMD sed -i "s/http\:\/\/localhost\:8080\/api/$BASEURL/g" /usr/share/nginx/html/main.*.js && nginx -g 'daemon off;'
