
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreateTaskPage } from './pages/CreateTaskPage';
import { Login } from './pages/Login/Login';
import { TeacherHomePage } from './pages/TeacherHomePage';
import { ClassEdit } from './pages/ClassView/ClassEdit';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/teacherHomePage',
      element: <TeacherHomePage />,
    },
    {
      path: '/editClass/:classroomId',
      element: <ClassEdit />,
    },
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
