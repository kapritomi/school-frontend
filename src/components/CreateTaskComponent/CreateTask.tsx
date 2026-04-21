import Sidebar from '../Sidebar';
import { TASK_TYPE_ID } from '../../types/tasks';
import AssignmentCreate from '../Tasks/AssignmentCreate';
import ShortAnswerCreate from '../Tasks/ShortAnswerCreate/ShortAnswerCreate';
import GroupingCreate from '../Tasks/GroupingCreate/GroupingCreate';
import PairingCreate from '../Tasks/PairingCreate/PairingCreate';
import { useTasks } from '@/store/TasksContext';
import { Navbar } from '../Navbar';
import { BgLeftBottom } from '@/assets/Icons/BgLeftBottom';
import { BgRightTop } from '@/assets/Icons/BgRightTop';
import { ClipLoader } from 'react-spinners';

export default function CreateTask() {
  const { activeTask, saveWorksheetToDB, tasksJson, isLoading } = useTasks();

  return (
    <div className=" overflow-hidden w-screen h-dvh max-h-dvh relative   flex">
      <Navbar></Navbar>
      {isLoading && (
        <div className="w-full h-full z-20 top-0 flex right-0 items-center justify-center absolute bg-zinc-400 bg-opacity-40">
          <ClipLoader size={90} color="#2E6544" />
        </div>
      )}
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
        <div
          id="scroll-container"
          className="w-full p-4 overflow-y-scroll h-full "
        >
          {tasksJson.tasks.map((task) => {
            switch (task.task_type_id) {
              case TASK_TYPE_ID.assignment:
                return (
                  <div className="h-dvh">
                    <AssignmentCreate key={task.id} />
                  </div>
                );

              case TASK_TYPE_ID.short:
                return (
                  <div className="min-h-dvh">
                    {' '}
                    <ShortAnswerCreate taskId={task.id} key={task.id} />
                  </div>
                );

              case TASK_TYPE_ID.pair:
                return (
                  <div className="min-h-dvh">
                    {' '}
                    <PairingCreate taskId={task.id} key={task.id} />
                  </div>
                );

              case TASK_TYPE_ID.grouping:
                return (
                  <div className="h-dvh">
                    {' '}
                    <GroupingCreate taskId={task.id} key={task.id} />{' '}
                  </div>
                );

              default:
                return null;
            }
          })}

          {!activeTask ? (
            <div className="text-gray-500">
              Válassz egy feladatot bal oldalt.
            </div>
          ) : (
            <button onClick={() => saveWorksheetToDB()}>
              Feladatlap mentése
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
