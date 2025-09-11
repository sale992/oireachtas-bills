# Oireachtas Bills

A React application for browsing Irish Oireachtas bills. Built with TypeScript, Material-UI, and React Query.

## Features

- **Browse Bills**: View all Irish Oireachtas bills with pagination
- **Filter by Type**: Filter bills by type (All, Private, Public)
- **Favorites Management**: Mark bills as favorites with persistent storage
- **Bilingual Support**: View bill titles in both English and Irish (Gaeilge)
- **Real-time Data**: Fetches data from the Oireachtas API

## Tech Stack

- **Frontend**: React 19, TypeScript
- **UI Library**: Material-UI (MUI)
- **State Management**: Zustand, React Query
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library
- **Linting**: ESLint, TypeScript ESLint

## Prerequisites

- Node.js (v20.19 or higher)
- npm
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sale992/oireachtas-bills.git
cd oireachtas-bills
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
VITE_OIREACHTAS_BASE_URL=https://api.oireachtas.ie/v1
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Test Coverage

The project includes comprehensive test coverage for:

- Components (BillsTable, Modal, Show, Tabs)
- Custom hooks (useBills, useTablePagination, useToggleState)
- Zustand state management (useBillsStore)
- Utility functions
- API integration

## Project Structure

```
src/
├── api/                    # API layer
│   └── bills/              # Bills API endpoints
├── components/             # UI components
│   ├── BillsTable/         # Main bills table component
│   ├── Modal/              # Modal component
│   ├── Tabs/               # Tab navigation component
│   └── Show/               # Conditional rendering component
├── hooks/                  # Custom React hooks
│   ├── useBills/           # Bills data fetching hook
│   ├── useTablePagination/ # Table pagination hook
│   └── useToggleState/     # Toggle state hook
├── pages/                  # Page components
│   └── Home/               # Main application page (Home page without React Router)
├── services/               # External service configurations
│   ├── axios/              # HTTP client setup
│   └── queryClient/        # React Query
├── stores/                 # Global state management
│   └── useBillsStore.ts    # Zustand store for favorites
├── theme/                  # Material-UI theme configuration
├── types/                  # TypeScript types
├── utils/                  # Utility functions
└── __mocks__/              # Test data
```

## UI Components

### BillsTable

- Displays bills in a paginated table format
- Supports filtering by bill type
- Includes favorite functionality
- Loading State
- No data state

### Modal

- Reusable modal dialog component
- Supports custom content

### Tabs

- Custom tab navigation component
- Supports dynamic tab content

### Show

- Custom component for conditional rendering

## Configuration

### TypeScript

- Strict mode enabled
- Path aliases configured (`@/` for `src/`)
- Type definitions

### ESLint

- TypeScript ESLint rules
- React hooks rules
- React refresh plugin

### Vite

- React plugin
- Path resolution
- Development server configuration

## API Integration

The application integrates with the [Oireachtas API](https://api.oireachtas.ie/) to fetch:

- Bill information
- Pagination data
- Real-time updates

### API Endpoints Used

- `GET /legislation` - Fetch bills with pagination

## Key Features Implementation

### Favorites System

- Uses Zustand for state management
- Persists favorites in localStorage

### Pagination

- Server-side pagination
- Configurable page sizes (10, 25, 50)
- Smooth navigation between pages

### Filtering

- Client-side filtering by bill type (/legislation API doesn't support filtering with query parameter)
- Maintains pagination state
- Real-time filter updates

##  Performance Optimizations

- React Query for efficient data fetching
- Memoized components and calculations

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests with coverage
