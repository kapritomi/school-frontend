import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Itt globális beállításokat adhatsz meg
      retry: 1, // Hiba esetén hányszor próbálkozzon újra automatikusan
      refetchOnWindowFocus: false, // Ne töltsön újra minden alkalommal, ha visszakattintasz a böngészőre
    },
  },
});
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App></App>
  </QueryClientProvider>,
);
