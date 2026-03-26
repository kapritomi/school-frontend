import Sidebar from "../Sidebar";
import { useTasks } from "../../store/useTasks";
import { TASK_TYPE_ID } from "../../types/tasks";
import AssignmentCreate from "../Tasks/AssignmentCreate";
import ShortAnswerCreate from "../Tasks/ShortAnswerCreate";
import GroupingCreate from "../Tasks/GroupingCreate";
import PairingCreate from "../Tasks/PairingCreate";
import Grouping from "../../Grouping";
import Pairing from "../../Pairing";
import Assignment from "../../Assignment";
import ShortAnswer from "../../ShortAnswer";
import type { TaskJson } from "../../types/tasks";
export default function CreateTask() {
  const { activeTask, tasksJson } = useTasks();

 const TASK_COMPONENTS: Record<
  number,
  React.ComponentType<{ task: TaskJson }>
> = {
  1: Grouping,
  2: Pairing,
  3: Assignment,
  4: ShortAnswer,
};

  return (
    <div className="bg-gradient-to-r from-[#E8F7EC] to-[#F0F9FF] h-screen flex">
   
      <div className="w-1/6">
        <Sidebar />
      </div>

      <div className="w-4/6 p-4">
       <button
        onClick={() => console.log(JSON.stringify(tasksJson, null, 2))}
      >
        JSON kiírás
      </button>
        {activeTask?.task_type_id === TASK_TYPE_ID.assignment && (
          <AssignmentCreate />
        )}
        {activeTask?.task_type_id === TASK_TYPE_ID.short && (
          <ShortAnswerCreate />
        )}
        {activeTask?.task_type_id === TASK_TYPE_ID.pair && (
          <PairingCreate />
        )}
        {activeTask?.task_type_id === TASK_TYPE_ID.grouping && (
          <GroupingCreate />
        )}
        
        {!activeTask && <div className="text-gray-500">Válassz egy feladatot bal oldalt.</div>}
       
       {tasksJson.tasks.map((task) => {
    const Component = TASK_COMPONENTS[task.task_type_id];

    if (!Component) return null;

    return (
      <div key={task.id} className="mb-8">
        <h2 className="font-bold mb-2">{task.task_title}</h2>
        <Component task={task} />
      </div>
    );
  })}
      </div>
       
      <div className="w-1/6" />
    </div>
  );
}