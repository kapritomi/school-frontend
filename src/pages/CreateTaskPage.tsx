import { CreateTask } from '../components/CreateTaskComponent/CreateTask';
import { TasksProvider } from '../store/TasksContext';

export const CreateTaskPage = () => {
  return (
    <TasksProvider>
      <CreateTask></CreateTask>
    </TasksProvider>
  );
};
