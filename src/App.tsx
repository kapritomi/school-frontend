import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';

import { Login } from './pages/Login/Login';
import { TeacherHomePage } from './pages/TeacherHomePage/TeacherHomePage';
import { ClassEdit } from './pages/ClassView/ClassEdit';
import { BulkStudentUpload } from './pages/BulkStudentUpload/BulkStudentUpload';
import { Worksheets } from './pages/Worksheets/Worksheets';

import TaskPreview from './TaskPreview';
import { TasksProvider } from './store/TasksContext';
import { WorksheetSolutions } from './pages/WorksheetSolutions/WorksheetSolutions';
import { CheckCode } from './pages/Student/CheckCode/CheckCode';
import CreateTask from './components/CreateTaskComponent/CreateTask';
import StudentView from './StudentView';
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
      element: <CreateTask />,
    },
    {
      path: '/worksheetSolutions/:worksheetId',
      element: <WorksheetSolutions />,
    },
    {
      path: '/student/checkCode/:code?',
      element: <CheckCode />,
    },
    {
      path: '/taskPreview',
      element: (
          <TaskPreview />
      ),
    },
    {
      path: '/StudentView',
      element: (
        <StudentView />
      )
    }
  ]);
  return <RouterProvider router={router} />;
}
