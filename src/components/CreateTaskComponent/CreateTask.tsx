import Sidebar from '../Sidebar';
import { useTasks } from '../../store/useTasks';
import { TASK_TYPE_ID } from '../../types/tasks';
import AssignmentCreate from '../Tasks/AssignmentCreate';
import ShortAnswerCreate from '../Tasks/ShortAnswerCreate';
import GroupingCreate from '../Tasks/GroupingCreate';
import PairingCreate from '../Tasks/PairingCreate';
import { Navbar } from '../Navbar';
export default function CreateTask() {
  const { activeTask, tasksJson } = useTasks();

  return (
    <div className="bg-gradient-to-r from-[#E8F7EC] to-[#F0F9FF] w-screen h-screen max-h-screen relative overflow-y-hidden">
        <Navbar />
        <div className="mt-[70px]  w-full h-full flex overflow-y-scroll">
            <div className="w-1/6">
              <Sidebar />
            </div>

            <div className="w-4/6 p-4">
              {activeTask?.task_type_id === TASK_TYPE_ID.assignment && (
                <AssignmentCreate />
              )}
              {activeTask?.task_type_id === TASK_TYPE_ID.short && (
                <ShortAnswerCreate />
              )}
              {activeTask?.task_type_id === TASK_TYPE_ID.pair && 
              <PairingCreate />}

              {activeTask?.task_type_id === TASK_TYPE_ID.grouping && (
                <GroupingCreate />
              )}

              {!activeTask && (
                <div className="text-gray-500">Válassz egy feladatot bal oldalt.</div>
              )}
            </div>

        </div>

      
    </div>
  );
}
