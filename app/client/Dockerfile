FROM node:alpine3.18 as build
# Build App
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:1.23-alpine
# Install nano editor
RUN apk update && apk add nano

# Remove default Nginx website
WORKDIR /usr/share/nginx/html
RUN rm -rf *

# Copy built app from the build stage
COPY --from=build /app/dist .

# Copy custom Nginx configurations
COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d/*.conf /etc/nginx/conf.d/

EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
