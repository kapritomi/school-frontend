import Sidebar from '../Sidebar';

import { TASK_TYPE_ID } from '../../types/tasks';
import AssignmentCreate from '../Tasks/AssignmentCreate';
import ShortAnswerCreate from '../Tasks/ShortAnswerCreate';
import GroupingCreate from '../Tasks/GroupingCreate';
import PairingCreate from '../Tasks/PairingCreate';
import { Link } from 'react-router-dom';
import { useTasks } from '@/store/TasksContext';
export default function CreateTask() {
  const { activeTask, tasksJson } = useTasks();

  return (
    
    <div className="bg-gradient-to-r from-[#E8F7EC] to-[#F0F9FF] h-screen flex">
      <div className="fixed top-0 left-0 w-[240px] h-full z-40">
        <Sidebar />
      </div>
      <div className='w-1/6'></div>
      <div className="w-4/6 p-4">
        <button onClick={() => console.log(JSON.stringify(tasksJson, null, 2))}>
          JSON kiírás
        </button>

        <p>
          <Link to={'/taskPreview'}>feladat előnézet</Link>
        </p>
        {tasksJson.tasks.map((task) => {
      switch (task.task_type_id) {
        case TASK_TYPE_ID.assignment:
          return <AssignmentCreate key={task.id} />;

        case TASK_TYPE_ID.short:
          return <ShortAnswerCreate key={task.id} />;

        case TASK_TYPE_ID.pair:
          return <PairingCreate key={task.id} />;

        case TASK_TYPE_ID.grouping:
          return <GroupingCreate key={task.id} />;

        default:
          return null;
      }
    })}
        {!activeTask && (
          <div className="text-gray-500">Válassz egy feladatot bal oldalt.</div>
        )}
      </div>

      <div className="w-1/6" />
    </div>
  );
}
