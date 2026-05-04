import Grouping from './Grouping';
import Pairing from './Pairing';
import Assignment from './Assignment';
import ShortAnswer from './ShortAnswer';
import { useTasks } from '@/store/TasksContext';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOneWorkSheet } from './api/Worksheet/getOneWorksheet';
import { useQuery } from '@tanstack/react-query';
import type { TaskJson, TasksJson } from './types/tasks';
import { ClipLoader } from 'react-spinners';
import { ClockBackground } from './assets/Icons/ClockBackground';
import { Clock } from './assets/Icons/Clock';
export default function TaskPreview() {
  const { tasksJson } = useTasks();
  const { worksheet_id } = useParams();
  const [time, setTime] = useState(45 * 60);
  const [dataToPreview, setDataToPreview] = useState<TasksJson>({ tasks: [] });
  const [dataType, setDataType] = useState<'frontend' | 'backend'>('frontend');

  const {
    data: worksheet,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['worksheet', worksheet_id],
    queryFn: () => getOneWorkSheet(Number(worksheet_id)),
    enabled: !!worksheet_id,

    staleTime: 1000 * 60 * 5, // 5 percig nem kéri le újra, ha nem muszáj
  });

    useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    let incomingData = null;
    if (worksheet?.data) {
      incomingData = worksheet?.data;
      setDataType('backend');
    } else {
      incomingData = tasksJson;
      setDataType('frontend');
    }

    if (
      incomingData &&
      !Array.isArray(incomingData) &&
      (incomingData as any).tasks
    ) {
      setDataToPreview({ tasks: (incomingData as any).tasks });
    } else {
      setDataToPreview({ tasks: (incomingData as any).tasks });
    }
  }, [worksheet, tasksJson, worksheet]);

  useEffect(() => {
    console.log(dataToPreview);
  }, [dataToPreview]);

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
    <div className='h-screen overflow-y-scroll snap-y snap-mandatory'>
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
      {isLoading && (
        <div className="w-full h-full z-20 top-0 flex right-0 items-center justify-center absolute bg-zinc-400 bg-opacity-40">
          <ClipLoader size={90} color="#2E6544" />
        </div>
      )}
      <Link to={'/createTask'}>vissza</Link>
      {dataToPreview.tasks &&
        dataToPreview.tasks.map((task: any, index: number) => {
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
