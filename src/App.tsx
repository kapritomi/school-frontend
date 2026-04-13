import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreateTaskPage } from './pages/CreateTaskPage';
import { Login } from './pages/Login/Login';
import { TeacherHomePage } from './pages/TeacherHomePage';
import { ClassEdit } from './pages/ClassView/ClassEdit';
import { BulkStudentUpload } from './pages/BulkStudentUpload/BulkStudentUpload';
import { Worksheets } from './pages/Worksheets/Worksheets';

import TaskPreview from './TaskPreview';
import { TasksProvider } from './store/TasksContext';
import { WorksheetSolutions } from './pages/WorksheetSolutions/WorksheetSolutions';
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
      path: '/worksheetSolutions/:worksheetId',
      element: <WorksheetSolutions />,
    },
    {
      path: '/taskPreview',
      element: (
        <TasksProvider>
          <TaskPreview />
        </TasksProvider>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
