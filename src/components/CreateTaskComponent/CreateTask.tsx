import Sidebar from '../Sidebar';
import { TASK_TYPE_ID } from '../../types/tasks';
import AssignmentCreate from '../Tasks/AssignmentCreate';
import ShortAnswerCreate from '../Tasks/ShortAnswerCreate';
import GroupingCreate from '../Tasks/GroupingCreate';
import PairingCreate from '../Tasks/PairingCreate';
import { useTasks } from '@/store/TasksContext';
import { Navbar } from '../Navbar';
import { BgLeftBottom } from '@/assets/Icons/BgLeftBottom';
import { BgRightTop } from '@/assets/Icons/BgRightTop';
export default function CreateTask() {
  const { activeTask } = useTasks();

  return (
    <div className="bg-gradient-to-r w-screen  max-h-screen relative overflow-y-hidden  h-screen flex">
      <Navbar></Navbar>
      <div className="absolute bottom-0 left-0 -z-10">
        <BgLeftBottom></BgLeftBottom>
      </div>
      <div className="absolute top-0 right-0 -z-10">
        <BgRightTop></BgRightTop>
      </div>
      <div className="mt-[70px] flex w-full">
        <div className="w-1/6">
          <Sidebar />
        </div>

        <div className="w-full p-4 overflow-y-scroll">
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
