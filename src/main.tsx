import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { TasksProvider } from './store/TasksContext.tsx';

createRoot(document.getElementById('root')!).render(<TasksProvider><App/></TasksProvider>);
