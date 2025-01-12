# Step 1: Build the Vue.js app
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other files
COPY . .

# Build the Vue.js app
RUN npm run build

# Step 2: Serve the app using NGINX
FROM nginx:alpine

# Copy the built files to NGINX's default directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port NGINX will run on
EXPOSE 80

# Run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
