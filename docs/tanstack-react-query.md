# React Query

React Query is used for fetching, caching, and updating server data in React.

## Documentation

```text
https://tanstack.com/query/latest/docs/framework/react/installation
```

## Installation

```bash
npm install @tanstack/react-query
```

## Setup

Create only one `QueryClient` instance at the root of the application.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import App from './App';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);
```

Components inside `QueryClientProvider` can now use React Query hooks such as `useQuery` and `useMutation`.
