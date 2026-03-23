import AssignmentCreate from '../Tasks/AssignmentCreate';
import ShortAnswerCreate from '../Tasks/ShortAnswerCreate';
import { useTasks } from '../../store/useTasks';
import { TASK_TYPE_ID } from '../../types/tasks';
import Sidebar from '../Sidebar';

export const CreateTask = () => {
  const { activeTask, tasksJson } = useTasks();

  return (
    <div className="bg-gradient-to-r from-[#E8F7EC] to-[#F0F9FF] h-screen flex">
      <div className="w-1/6">
        <Sidebar />
      </div>

      <div className="w-4/6 p-4">
        <button onClick={() => console.log(JSON.stringify(tasksJson, null, 2))}>
          JSON kiírás
        </button>
        {activeTask?.task_type_id === TASK_TYPE_ID.assignment && (
          <AssignmentCreate />
        )}
        {activeTask?.task_type_id === TASK_TYPE_ID.short && (
          <ShortAnswerCreate />
        )}

        {!activeTask && (
          <div className="text-gray-500">Válassz egy feladatot bal oldalt.</div>
        )}
      </div>

      <div className="w-1/6" />
    </div>
  );
};
