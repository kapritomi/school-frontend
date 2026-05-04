import Grouping from './Grouping';
import Pairing from './Pairing';
import Assignment from './Assignment';
import ShortAnswer from './ShortAnswer';
import type { TaskJson } from './types/tasks';
import { useTasks } from '@/store/TasksContext';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ClockBackground } from './assets/Icons/ClockBackground';
import { Clock } from './assets/Icons/Clock';

export default function StudentView() {
  const { tasksJson } = useTasks();
  const [time, setTime] = useState(45 * 60); // 45 perc másodpercben
  const [dataType, setDataType] = useState<'frontend' | 'backend'>('frontend');



  



  useEffect(() => {
    console.log(tasksJson);
  }, [tasksJson]);
  const TASK_COMPONENTS: Record<
    number,
    React.ComponentType<{ task: TaskJson; dataType: 'frontend' | 'backend' }>
  > = {
    1: Grouping,
    2: Pairing,
    3: ShortAnswer,
    4: Assignment,
  };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50">
        <div className="relative flex items-center justify-center">
          <ClockBackground />

          <div className="absolute flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Clock />{' '}
            <span className="text-[30px] text-white font-medium mb-3">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      <Link to={'/createTask'}>vissza</Link>

      {tasksJson.tasks.map((task) => {
        const Component = TASK_COMPONENTS[task.task_type_id];

        if (!Component) return null;

        return (
          <div key={task.id} className="snap-start h-screen flex flex-col">
            <h2 className="task-padding font-semibold text-TaskTitle">
              {task.task_title}
            </h2>
             <Component dataType={dataType} task={task} />
          </div>
        );
      })}
    </div>
  );
}
