# searGe - Document Search Engine

A Google-like search engine for documents (PDF, Office files, etc.) built with React, Vite, TypeScript, and Material-UI.

## 🚀 Features

- **Home Page**: Clean search interface with "searGe" branding
- **Advanced Search**: Filter by document type, date range, and more
- **Results Page**: Paginated search results with document previews
- **Mock API**: Development-ready mock data
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Material Design**: Beautiful UI with Material-UI components

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Fast build tool
- **TypeScript** - Type safety
- **Material-UI (MUI)** - Component library
- **React Router** - Navigation
- **Docker** - Containerization

## 📋 Prerequisites

- Node.js 20+ (for local development)
- Docker & Docker Compose (for containerized development)

## 🐳 Docker Setup (Recommended)

### Quick Start - Development Mode (Hot-Reload)

From the project root directory:

```bash
docker-compose up
```

The frontend will be available at **http://localhost:5173** with hot-reload enabled!
- Edit your code → changes appear instantly
- No rebuild needed

### Production Mode

```bash
NODE_ENV=production COMMAND="sh -c 'npm run build && npm run serve'" PORT=3000 docker-compose up --build
```

The production build will be available at **http://localhost:3000**

### Docker Commands

```bash
# Start development (hot-reload)
docker-compose up

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Rebuild (if dependencies change)
docker-compose up --build
```

### Key Features

- ✅ **Single Dockerfile** - One file for dev & prod
- ✅ **Single docker-compose.yml** - No separate config files
- ✅ **Hot-reload by default** - Fast development
- ✅ **Offline-ready** - Uses local node_modules
- ✅ **Environment-based** - Switch modes with env vars

## 💻 Local Development

### Install Dependencies

```bash
cd frontend
npm install
```

### Run Development Server

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── mockApi.ts          # Mock API with sample data
│   ├── pages/
│   │   ├── Home.tsx             # Home page with search
│   │   └── Results.tsx          # Search results with pagination
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   ├── App.tsx                  # Main app component with routing
│   └── main.tsx                 # App entry point
├── Dockerfile                   # Multi-stage Docker build
├── nginx.conf                   # Production nginx config
├── vite.config.ts              # Vite configuration
└── package.json                # Dependencies
```

## 🔍 Mock API

The app includes a mock API (`src/api/mockApi.ts`) with 10 sample documents for testing:

- **Network delay simulation** (500ms)
- **Text search** across title and preview
- **Document type filtering** (PDF, DOCX, XLSX, PPTX)
- **Pagination** (5 results per page)

## ✅ Features Implemented

- [x] Home page with "searGe" branding
- [x] Simple search input
- [x] Advanced search dialog with filters
- [x] Results page with search results
- [x] Document previews (title + text snippet)
- [x] Open document buttons
- [x] Pagination controls
- [x] Document type chips
- [x] Responsive design
- [x] Docker support
- [x] Docker Compose configuration

## 🎯 Usage

### Basic Search

1. Navigate to the home page
2. Enter your search query
3. Press Enter or click "Search"
4. View paginated results

### Advanced Search

1. Click "Advanced Search" button
2. Enter search query
3. Select document type filter
4. Optionally set date range
5. Click "Search"

## 🔮 Future Enhancements

- Connect to real backend API
- File upload and indexing
- Search result highlighting
- Document preview modal
- User authentication
- Search history
- Filters sidebar
- Sort options (relevance, date, name)

## 📄 License

MIT

---

Built with ❤️ using React + Vite + TypeScript + Material-UI
