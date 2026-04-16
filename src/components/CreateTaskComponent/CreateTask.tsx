import Sidebar from '../Sidebar';
import { TASK_TYPE_ID } from '../../types/tasks';
import AssignmentCreate from '../Tasks/AssignmentCreate';
import ShortAnswerCreate from '../Tasks/ShortAnswerCreate';
import GroupingCreate from '../Tasks/GroupingCreate';
import PairingCreate from '../Tasks/PairingCreate';
import { Link } from 'react-router-dom';
import { useTasks } from '@/store/TasksContext';
import { Navbar } from '../Navbar';
export default function CreateTask() {
  const { activeTask, tasksJson } = useTasks();

  return (
    <div className="bg-gradient-to-r w-screen  max-h-screen relative overflow-y-hidden from-[#E8F7EC] to-[#F0F9FF] h-screen flex">
      <Navbar></Navbar>
      <div className="mt-[70px] flex w-full">
        <div className="w-1/6">
          <Sidebar />
        </div>

        <div className="w-full p-4 overflow-y-auto">
          <button
            onClick={() => console.log(JSON.stringify(tasksJson, null, 2))}
          >
            JSON kiírás
          </button>

          <p>
            <Link to={'/taskPreview'}>feladat előnézet</Link>
          </p>
          {activeTask?.task_type_id === TASK_TYPE_ID.assignment && (
            <AssignmentCreate />
          )}
          {activeTask?.task_type_id === TASK_TYPE_ID.short && (
            <ShortAnswerCreate />
          )}
          {activeTask?.task_type_id === TASK_TYPE_ID.pair && <PairingCreate />}
          {activeTask?.task_type_id === TASK_TYPE_ID.grouping && (
            <GroupingCreate />
          )}

          {!activeTask && (
            <div className="text-gray-500">
              Válassz egy feladatot bal oldalt.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
