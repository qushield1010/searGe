# searGe - Simple Docker Deployment

## 🚀 Quick Start

### Build and Run
```bash
docker-compose up --build
```

The application will be available at: **http://localhost:3000**

### Stop the Application
```bash
docker-compose down
```

## 📦 What's Inside

### Simplified Dockerfile
- **Single stage** - No multiple AS stages
- **Node.js 20 Alpine** - Lightweight base image (~40MB)
- **Production build** - Optimized React app
- **Built-in server** - Uses `serve` package to host the app

### Docker Compose
- **Simple configuration** - No networks, volumes, or extra config
- **Port 3000** - Application runs on port 3000
- **Auto-restart** - Container restarts if it crashes

## 🔌 Offline Deployment

### Step 1: Save Docker Image (on internet machine)
```bash
# Build the image
docker-compose build

# Save to tar file
docker save searge-frontend:latest -o searge-frontend.tar
```

### Step 2: Transfer Files
Copy these to offline machine:
- `searge-frontend.tar` (Docker image)
- `docker-compose.yml`

### Step 3: Load and Run (on offline machine)
```bash
# Load the image
docker load -i searge-frontend.tar

# Run the application
docker-compose up -d
```

## 🔧 Configuration

### Change Port
Edit `docker-compose.yml`:
```yaml
ports:
  - "8080:3000"  # Access on port 8080 instead
```

### View Logs
```bash
docker-compose logs -f
```

### Rebuild After Code Changes
```bash
docker-compose up --build
```

## 📝 How It Works

1. **Copies** package.json and installs dependencies
2. **Copies** all source code
3. **Builds** the production React app (`npm run build`)
4. **Serves** the built files using `serve` package
5. **Runs** on port 3000

## ✅ Benefits of This Setup

- ✨ **Simple** - Single Dockerfile, no complex stages
- 📦 **Complete** - All dependencies included
- 🔌 **Offline Ready** - Works without internet
- 🚀 **Production Ready** - Optimized build
- 🔄 **Easy to Deploy** - Just save and load the image

## 🆚 Differences from Multi-Stage

| Feature | Multi-Stage | Single-Stage |
|---------|-------------|--------------|
| Image Size | Smaller (nginx) | Larger (node) |
| Complexity | More complex | Simple |
| Build Time | Faster (cached) | Moderate |
| Development | Separate stage | Same stage |
| Offline Ready | ✅ Yes | ✅ Yes |

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in docker-compose.yml or kill the process:
sudo lsof -ti:3000 | xargs kill -9
```

### Rebuild from Scratch
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### Check Container Status
```bash
docker ps -a
docker logs searge-frontend
```
