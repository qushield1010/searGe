# Offline Deployment Guide

This guide explains how to deploy the searGe application on a machine without internet access.

## Prerequisites on Offline Machine

- Docker installed
- Docker Compose installed

## Deployment Methods

### Method 1: Transfer Docker Images (Recommended for Offline)

#### On Internet-Connected Machine:

1. **Build the production image:**
   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```

2. **Save all required images:**
   ```bash
   # Save base images
   docker save node:20-alpine -o node-20-alpine.tar
   docker save nginx:alpine -o nginx-alpine.tar
   
   # Save your built image
   docker save searge-frontend-prod -o searge-frontend-prod.tar
   ```

3. **Transfer files to offline machine:**
   - Copy the entire `searGe` directory
   - Copy the `.tar` image files

#### On Offline Machine:

1. **Load the Docker images:**
   ```bash
   docker load -i node-20-alpine.tar
   docker load -i nginx-alpine.tar
   docker load -i searge-frontend-prod.tar
   ```

2. **Start the application:**
   ```bash
   cd searGe
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **Access the application:**
   - Open browser: `http://localhost` or `http://<server-ip>`

---

### Method 2: Transfer Project + Build Offline

This method requires Docker to build from source on the offline machine.

#### On Internet-Connected Machine:

1. **Pre-download node_modules (optional but recommended):**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

2. **Transfer the entire `searGe` directory to offline machine**

#### On Offline Machine:

1. **Build and run:**
   ```bash
   cd searGe
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

**Note:** This requires base images (`node:20-alpine`, `nginx:alpine`) to be pre-loaded or available in local Docker registry.

---

## Verification

After deployment, verify the application is running:

```bash
# Check running containers
docker ps

# Check logs
docker logs searge-frontend-prod

# Test the application
curl http://localhost
```

## Stopping the Application

```bash
docker-compose -f docker-compose.prod.yml down
```

## Updating the Application

1. Transfer new version of the project or images
2. Stop current version: `docker-compose -f docker-compose.prod.yml down`
3. Load new images (if using Method 1)
4. Start new version: `docker-compose -f docker-compose.prod.yml up -d`

## Troubleshooting

### Container won't start
```bash
docker logs searge-frontend-prod
```

### Port 80 already in use
Edit `docker-compose.prod.yml` and change `"80:80"` to `"8080:80"` or another available port.

### Images not found
Ensure all required images are loaded:
```bash
docker images | grep -E "node|nginx|searge"
```

## Notes

- The application uses **mock data** - no backend required
- All dependencies are bundled in the Docker image
- No internet connection needed after deployment
- The production image is optimized and uses nginx for serving static files
