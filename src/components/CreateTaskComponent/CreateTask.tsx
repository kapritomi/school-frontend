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
import { Modal } from '../Modal';
import { useState } from 'react';
import { useEffect } from 'react';

export default function CreateTask() {
  const [sideBarIsOpen, setSidebarIsOpen] = useState<boolean>(true);
  const {
    activeTask,
    tasksJson,
    isLoading,
    worksheetMessage,
    setWorksheetMessage,
  } = useTasks();

  useEffect(() => {
    console.log(tasksJson);
  }, [tasksJson]);
  return (
    <div className="overflow-hidden w-screen h-dvh max-h-dvh relative flex">
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
        {worksheetMessage && (
          <Modal
            setModalErrorMessage={setWorksheetMessage}
            text={worksheetMessage.message}
            type={worksheetMessage.type}
          />
        )}
        <div
          className={`transition-all ${sideBarIsOpen ? 'max-w-[500px]' : 'max-w-[0px]'} `}
        >
          <Sidebar isOpen={sideBarIsOpen} setIsOpen={setSidebarIsOpen} />
        </div>
        <div
          id="scroll-container"
          className="w-full p-4 overflow-y-scroll h-full"
        >
          {/* <Link to={'/StudentView'}>Tanulói nézet</Link> */}
          {tasksJson.tasks.map((task, id) => {
            switch (task.task_type_id) {
              case TASK_TYPE_ID.assignment:
                return (
                  <AssignmentCreate key={task.id} task={task} index={id} />
                );

              case TASK_TYPE_ID.short:
                return (
                  <ShortAnswerCreate key={task.id} task={task} index={id} />
                );

              case TASK_TYPE_ID.pair:
                return <PairingCreate key={task.id} task={task} index={id} />;

              case TASK_TYPE_ID.grouping:
                return <GroupingCreate key={task.id} task={task} index={id} />;

              default:
                return null;
            }
          })}

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
