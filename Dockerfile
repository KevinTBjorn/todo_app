FROM node:14.17 as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY .npmrc .
RUN npm install
COPY . .
RUN npm run build

# CMD ["npm", "start"]

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]

# FROM node:14.17 as builder
# WORKDIR /app
# COPY package.json .
# COPY package-lock.json .
# COPY .npmrc .
# RUN npm install
# COPY . .
# # RUN npm build
