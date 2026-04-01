import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreateTaskPage } from './pages/CreateTaskPage';
import { Login } from './pages/Login/Login';
import { TeacherHomePage } from './pages/TeacherHomePage';
import { ClassEdit } from './pages/ClassView/ClassEdit';
<<<<<<< HEAD
import { BulkStudentUpload } from './pages/BulkStudentUpload/BulkStudentUpload';
import { Worksheets } from './pages/Worksheets/Worksheets';

=======
import TaskPreview from './TaskPreview';
import { TasksProvider } from './store/TasksContext';
>>>>>>> edae6fc5707e0f44c7efc29218966b3631deb17b
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
      path: '/worksheets',
      element: <Worksheets />,
    },
    {
      path: '/editClass/:classroomId',
      element: <ClassEdit />,
    },
    {
      path: '/bulkStudentUpload/:classroomId',
      element: <BulkStudentUpload />,
    },
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/createTask',
      element: <CreateTaskPage />,
    },
    {
      path: '/taskPreview',
      element: <TasksProvider><TaskPreview /></TasksProvider>
    }
  ]);

  return <RouterProvider router={router} />;
}
