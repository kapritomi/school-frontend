import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreateTaskPage } from './pages/CreateTaskPage';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/createTask',
      element: <CreateTaskPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
