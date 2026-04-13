import Grouping from './Grouping';
import Pairing from './Pairing';
import Assignment from './Assignment';
import ShortAnswer from './ShortAnswer';
import type { TaskJson } from './types/tasks';
import { useTasks } from './store/useTasks';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function TaskPreview() {
  const { tasksJson } = useTasks();
  useEffect(() => {
    console.log(tasksJson);
  }, [tasksJson]);
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
    <div>
      <Link to={'/createTask'}>vissza</Link>
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
  );
}
