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
import { Link } from 'react-router-dom';

export default function CreateTask() {
  const { activeTask,saveWorksheetToDB,tasksJson} = useTasks();

  return (
    <div className=" overflow-hidden w-screen h-dvh max-h-dvh relative   flex">
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
        <div id='scroll-container' className="w-full p-4 overflow-y-scroll h-full ">
           <Link to={'/StudentView'}>Tanulói nézet</Link>
          {tasksJson.tasks.map((task) => {
            
            switch (task.task_type_id) {
              case TASK_TYPE_ID.assignment:
                return <AssignmentCreate key={task.id} task={task}/>;

              case TASK_TYPE_ID.short:
                return <ShortAnswerCreate key={task.id} task={task}/>;

              case TASK_TYPE_ID.pair:
                return <PairingCreate key={task.id} task={task}/>;

              case TASK_TYPE_ID.grouping:
                return <GroupingCreate key={task.id} task={task}/>;

              default:
                return null;
            }
          })}

          {!activeTask ? (
            <div className="text-gray-500">
              Válassz egy feladatot bal oldalt.
            </div>
          )
        :<button onClick={()=>saveWorksheetToDB()}>Feladatlap mentése</button>}

           
        </div>
      </div>
    </div>
  );
}