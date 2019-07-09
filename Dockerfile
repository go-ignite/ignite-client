# build homepage
FROM node:12.6.0-alpine AS builder-homepage
WORKDIR /usr/src/app
ADD homepage /usr/src/app
RUN yarn && yarn build

# build admin
FROM node:12.6.0-alpine AS builder-admin
WORKDIR /usr/src/app
ADD admin /usr/src/app
RUN yarn && yarn build

# build user
FROM node:12.6.0-alpine AS builder-user
WORKDIR /usr/src/app
ADD user /usr/src/app
RUN yarn && yarn build

# final image
FROM nginx:alpine
LABEL maintainer="go-ignite"

WORKDIR /usr/share/nginx/dist
ADD build/ignite-client.conf /etc/nginx/conf.d/default.conf
COPY --from=builder-homepage /usr/src/app/public ./index
COPY --from=builder-admin /usr/src/app/dist ./admin
COPY --from=builder-user /usr/src/app/dist ./user

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
