#!/bin/bash

# Script to prepare searGe for offline deployment
# Run this on the internet-connected machine

set -e

echo "======================================"
echo "searGe Offline Deployment Preparation"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create export directory
EXPORT_DIR="searge-offline-package"
mkdir -p "$EXPORT_DIR"

echo -e "${BLUE}Step 1: Building production Docker image...${NC}"
docker-compose -f docker-compose.prod.yml build
echo -e "${GREEN}✓ Build complete${NC}"
echo ""

echo -e "${BLUE}Step 2: Saving Docker images...${NC}"
echo "  - Saving node:20-alpine..."
docker save node:20-alpine -o "$EXPORT_DIR/node-20-alpine.tar"
echo "  - Saving nginx:alpine..."
docker save nginx:alpine -o "$EXPORT_DIR/nginx-alpine.tar"
echo "  - Saving searge-frontend-prod..."
docker save searge-frontend-prod -o "$EXPORT_DIR/searge-frontend-prod.tar"
echo -e "${GREEN}✓ Images saved${NC}"
echo ""

echo -e "${BLUE}Step 3: Copying project files...${NC}"
# Copy project files (excluding node_modules and other unnecessary files)
rsync -av --progress \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude 'dist' \
  --exclude '.vite' \
  --exclude 'searge-offline-package' \
  ./ "$EXPORT_DIR/searGe/"
echo -e "${GREEN}✓ Project files copied${NC}"
echo ""

echo -e "${BLUE}Step 4: Creating deployment script...${NC}"
cat > "$EXPORT_DIR/deploy.sh" << 'EOF'
#!/bin/bash

# Offline Deployment Script for searGe

set -e

echo "======================================"
echo "searGe Offline Deployment"
echo "======================================"
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Loading Docker images...${NC}"
echo "  - Loading node:20-alpine..."
docker load -i node-20-alpine.tar
echo "  - Loading nginx:alpine..."
docker load -i nginx-alpine.tar
echo "  - Loading searge-frontend-prod..."
docker load -i searge-frontend-prod.tar
echo -e "${GREEN}✓ Images loaded${NC}"
echo ""

echo -e "${BLUE}Starting application...${NC}"
cd searGe
docker-compose -f docker-compose.prod.yml up -d
echo -e "${GREEN}✓ Application started${NC}"
echo ""

echo "======================================"
echo -e "${GREEN}Deployment complete!${NC}"
echo "======================================"
echo ""
echo "Access the application at: http://localhost"
echo ""
echo "Useful commands:"
echo "  View logs:    docker logs searge-frontend-prod"
echo "  Stop app:     docker-compose -f docker-compose.prod.yml down"
echo "  Restart app:  docker-compose -f docker-compose.prod.yml restart"
EOF

chmod +x "$EXPORT_DIR/deploy.sh"
echo -e "${GREEN}✓ Deployment script created${NC}"
echo ""

# Get package size
PACKAGE_SIZE=$(du -sh "$EXPORT_DIR" | cut -f1)

echo "======================================"
echo -e "${GREEN}Package preparation complete!${NC}"
echo "======================================"
echo ""
echo "Package location: $EXPORT_DIR/"
echo "Package size: $PACKAGE_SIZE"
echo ""
echo "Next steps:"
echo "1. Transfer the entire '$EXPORT_DIR' directory to your offline machine"
echo "2. On the offline machine, run: cd $EXPORT_DIR && ./deploy.sh"
echo ""
echo "Optional: Create a compressed archive:"
echo "  tar -czf searge-offline.tar.gz $EXPORT_DIR/"
echo ""
