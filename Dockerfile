FROM nginx:alpine
LABEL maintainer="go-ignite"

ADD dist /usr/share/nginx/dist
ADD build/ignite-client.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
