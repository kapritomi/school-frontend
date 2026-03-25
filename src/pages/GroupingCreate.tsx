import { useTasks } from "../store/useTasks"

export default function GroupingCreate (){
     const { activeTask, updateTask } = useTasks();

    if (!activeTask) return null;

    const task = activeTask;
    const grouping = task.grouping ?? { groups: [] };

    const addGroup = () => {
    updateTask({
      ...task,
      grouping: {
        groups: [...grouping.groups, { name: "", items: [] }],
      },
    });
    };

    const updateGroupName = (index: number, value: string) => {
        const next = grouping.groups.map((g, i) =>
        i === index ? { ...g, name: value } : g
        );

        updateTask({
        ...task,
        grouping: { groups: next },
        });
    };

    const addItem = (groupIndex: number) => {
        const next = grouping.groups.map((g, i) =>
        i === groupIndex
            ? { ...g, items: [...g.items, { name: "" }] }
            : g
        );

        updateTask({
        ...task,
        grouping: { groups: next },
        });
    };

    const updateItem = (
        groupIndex: number,
        itemIndex: number,
        value: string
    ) => {
        const next = grouping.groups.map((g, i) => {
        if (i !== groupIndex) return g;

        const newItems = g.items.map((item, j) =>
            j === itemIndex ? { name: value } : item
        );

        return { ...g, items: newItems };
        });

        updateTask({
        ...task,
        grouping: { groups: next },
        });
    };

    return(
        <div>
<input
        value={task.task_title}
        onChange={(e) =>
          updateTask({ ...task, task_title: e.target.value })
        }
      />

      <button onClick={addGroup}>+ Új csoport</button>

      {grouping.groups.map((group, gi) => (
        <div key={gi}>
          <input
            value={group.name}
            onChange={(e) => updateGroupName(gi, e.target.value)}
            placeholder="Csoport neve"
          />

          <button onClick={() => addItem(gi)}>+ Elem</button>

          {group.items.map((item, ii) => (
            <input
              key={ii}
              value={item.name}
              onChange={(e) =>
                updateItem(gi, ii, e.target.value)
              }
              placeholder="Elem neve"
            />
          ))}
        </div>
      ))}
        </div>
    )
}