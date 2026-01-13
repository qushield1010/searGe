# API Layer Documentation

## Structure

The API layer is split into two files for better organization:

### 📄 `mockData.ts`
**Purpose:** Contains mock document data

**What it has:**
- `mockDocuments` - Array of 10 sample documents
- Each document has: id, title, preview, documentUrl, documentType

**Why separate:**
- ✅ Easy to find and update test data
- ✅ Can be replaced with real API later
- ✅ Can be imported elsewhere (e.g., for testing)
- ✅ Clean separation of data from logic

**Example:**
```typescript
import { mockDocuments } from './mockData';

// Use the data directly
console.log(mockDocuments.length); // 10
```

---

### 📄 `mockApi.ts`
**Purpose:** Contains API functions that simulate backend calls

**What it has:**
- `searchAPI.search()` - Search function with filtering and pagination
- `delay()` - Helper to simulate network latency

**Why separate:**
- ✅ API logic separate from data
- ✅ Easy to swap with real API calls
- ✅ Simulates real async behavior
- ✅ Easy to add more API methods

**Example:**
```typescript
import { searchAPI } from './mockApi';

const results = await searchAPI.search(
  { query: 'machine learning' },
  1,  // page
  5   // pageSize
);
```

---

## File Organization

```
src/api/
├── mockData.ts    # 📊 Data: Mock documents
└── mockApi.ts     # 🔌 Logic: API functions
```

---

## Benefits of This Split

### 1. **Easy to Find Things**
- Need to add more documents? → `mockData.ts`
- Need to change search logic? → `mockApi.ts`

### 2. **Easy to Replace with Real API**
Future real API implementation:
```typescript
// realApi.ts
export const searchAPI = {
  search: async (params, page, pageSize) => {
    const response = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({ params, page, pageSize })
    });
    return response.json();
  }
};

// In Results.tsx, just change the import:
// import { searchAPI } from '../api/mockApi';  // ❌ Old
// import { searchAPI } from '../api/realApi';  // ✅ New
```

### 3. **Reusable Data**
Can import `mockDocuments` anywhere:
```typescript
// For testing
import { mockDocuments } from './api/mockData';
expect(mockDocuments).toHaveLength(10);

// For storybook
import { mockDocuments } from './api/mockData';
export const WithData = () => <Results data={mockDocuments} />;
```

### 4. **Better Documentation**
Each file has a single, clear purpose with JSDoc comments

---

## How It Works

### Search Flow:
```
User types query
    ↓
Results.tsx calls searchAPI.search()
    ↓
mockApi.ts imports mockDocuments from mockData.ts
    ↓
Filters documents by query & type
    ↓
Applies pagination
    ↓
Returns results to component
```

---

## Adding New Mock Data

**Option 1: Add to existing array**
```typescript
// mockData.ts
export const mockDocuments: SearchResult[] = [
  // ... existing documents
  {
    id: '11',
    title: 'New Document',
    preview: 'Description...',
    documentUrl: '/documents/new.pdf',
    documentType: 'PDF',
  },
];
```

**Option 2: Create separate categories**
```typescript
// mockData.ts
export const pdfDocuments: SearchResult[] = [...];
export const docxDocuments: SearchResult[] = [...];
export const allDocuments = [...pdfDocuments, ...docxDocuments];
```

---

## Adding New API Methods

```typescript
// mockApi.ts
export const searchAPI = {
  search: async (...) => { ... },
  
  // New method
  getDocumentById: async (id: string) => {
    await delay(300);
    return mockDocuments.find(doc => doc.id === id);
  },
  
  // Another new method
  getPopularDocuments: async (limit: number = 5) => {
    await delay(200);
    return mockDocuments.slice(0, limit);
  },
};
```

---

## Migration Path to Real Backend

When you add a real backend:

1. **Create `realApi.ts`** with same function signatures
2. **Change import** in components
3. **Keep mockApi.ts** for development/testing
4. **Use environment variable** to switch:

```typescript
// api/index.ts
import { searchAPI as mockAPI } from './mockApi';
import { searchAPI as realAPI } from './realApi';

export const searchAPI = 
  import.meta.env.VITE_USE_MOCK === 'true' 
    ? mockAPI 
    : realAPI;
```

---

## Summary

| File | Contains | When to Edit |
|------|----------|--------------|
| `mockData.ts` | Document data | Add/remove documents |
| `mockApi.ts` | API functions | Change search logic, add API methods |

**Clean, organized, and ready to scale!** 🚀
