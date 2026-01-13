# 🚀 Offline Deployment Guide

## Step-by-Step: Move searGe to Offline Machine

### 📋 Prerequisites
- Docker installed on both machines
- Ability to transfer files (USB, network, etc.)

---

## On Internet-Connected Machine

### 1. Build the Docker Image
```bash
cd /home/userl/PycharmProjects/searGe/searGe
docker-compose build
```

### 2. Save the Docker Image
```bash
docker save searge-frontend:latest -o searge-frontend.tar
```

This creates a ~500MB tar file with everything included.

### 3. Prepare Transfer Package
Copy these files/folders to USB or transfer medium:
```
searGe/
├── searge-frontend.tar          # Docker image
├── docker-compose.yml           # Configuration
├── DOCKER-SIMPLE.md            # Instructions
└── (optional) README.md         # Project info
```

**Minimum needed:**
- ✅ `searge-frontend.tar`
- ✅ `docker-compose.yml`

---

## On Offline Machine

### 1. Transfer Files
Copy the files to the offline machine:
```bash
# Example location
/home/user/searGe/
```

### 2. Load Docker Image
```bash
cd /home/user/searGe
docker load -i searge-frontend.tar
```

Output will show:
```
Loaded image: searge-frontend:latest
```

### 3. Verify Image Loaded
```bash
docker images | grep searge
```

Should show:
```
searge-frontend   latest   abc123def456   2 minutes ago   500MB
```

### 4. Start the Application
```bash
docker-compose up -d
```

### 5. Access the Application
Open browser and go to:
```
http://localhost:3000
```

---

## 🎯 Quick Commands

### Check if Running
```bash
docker ps
```

### View Logs
```bash
docker logs searge-frontend
docker-compose logs -f
```

### Stop Application
```bash
docker-compose down
```

### Restart Application
```bash
docker-compose restart
```

### Start on Boot (Optional)
```bash
# Add to docker-compose.yml:
services:
  frontend:
    restart: always  # Instead of unless-stopped
```

---

## ✅ What's Included (No Internet Needed)

The `searge-frontend.tar` file contains:
- ✅ Node.js runtime
- ✅ All npm dependencies (React, MUI, Vite, etc.)
- ✅ Your application code (compiled)
- ✅ Serve package (web server)
- ✅ Everything needed to run

**Nothing downloaded at runtime!**

---

## 🔧 Troubleshooting

### Port 3000 Already in Use
Edit `docker-compose.yml`:
```yaml
ports:
  - "8080:3000"  # Use port 8080 instead
```

### Can't Load Image
Make sure Docker is running:
```bash
sudo systemctl start docker
sudo systemctl status docker
```

### Permission Denied
Run with sudo or add user to docker group:
```bash
sudo usermod -aG docker $USER
# Then logout and login again
```

### Image Not Found After Loading
Check the image name matches:
```bash
docker images
# If different name, edit docker-compose.yml:
services:
  frontend:
    image: actual-image-name:latest
```

---

## 📊 Size Information

| Component | Size |
|-----------|------|
| Node.js base | ~180 MB |
| Dependencies | ~200 MB |
| Built app | ~5 MB |
| **Total** | **~500 MB** |

This is reasonable for offline deployment!

---

## 🔄 Updating the Application

### On Internet Machine:
1. Make code changes
2. Rebuild: `docker-compose build`
3. Save new image: `docker save searge-frontend:latest -o searge-frontend-v2.tar`
4. Transfer to offline machine

### On Offline Machine:
1. Stop old version: `docker-compose down`
2. Remove old image: `docker rmi searge-frontend:latest`
3. Load new image: `docker load -i searge-frontend-v2.tar`
4. Start: `docker-compose up -d`

---

## ✨ That's It!

Your application will run completely offline with:
- ✅ No internet connection needed
- ✅ All dependencies included
- ✅ Simple deployment process
- ✅ Easy to update

**Access:** http://localhost:3000 on the offline machine
