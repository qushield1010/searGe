FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy pre-built Alpine-compatible node_modules (no npm install needed!)
# Extract node_modules_alpine.tar.gz before building
COPY node_modules_alpine ./node_modules

# Copy source code
COPY . .

# Expose ports (Vite dev: 5173, Production: 3000)
EXPOSE 5173 3000

# Default to development mode
# Override with docker-compose or docker run
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
