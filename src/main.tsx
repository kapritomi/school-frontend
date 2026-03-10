import { createRoot } from 'react-dom/client'
import './index.css'
import Main from './App.tsx'
import { TasksProvider } from './store/TasksContext.tsx'

createRoot(document.getElementById('root')!).render(
  <TasksProvider>
    <Main />
  </TasksProvider>,
)
