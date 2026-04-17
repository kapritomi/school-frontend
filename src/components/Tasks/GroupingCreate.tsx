import { useEffect, useState } from 'react';
import { useTasks } from '../../store/TasksContext';
import type { Group } from '@/types/tasks';
import { EditIcon } from '@/assets/Icons/EditIcon';
import { BinIcon } from '@/assets/Icons/BinIcon';

export default function GroupingCreate() {
  const { activeTask, updateTask } = useTasks();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<null | Group>(null);
  const [itemName, setItemName] = useState<null | string>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newItemName, setNewItemName] = useState<string | null>(null);
  if (!activeTask) return null;

  const task = activeTask;
  const grouping = task.grouping ?? { groups: [] };

  const addGroup = (index: number) => {
    updateTask({
      ...task,
      grouping: {
        groups: [...grouping.groups, { index: index, name: '', items: [] }],
      },
    });
  };
  useEffect(() => {
    if (selectedId !== null && typeof selectedId !== 'undefined') {
      if (typeof grouping.groups[selectedId] === 'undefined') {
        addGroup(selectedId);
      }
    }
  }, [selectedId]);

  useEffect(() => {
    console.log(grouping.groups);
  }, [grouping]);

  useEffect(() => {
    if (selectedId !== null && typeof selectedId !== 'undefined')
      setSelectedGroup(grouping.groups[selectedId]);
  }, [selectedId, grouping]);

  const updateGroupName = (index: number, value: string) => {
    const next = grouping.groups.map((g, i) =>
      i === index ? { ...g, name: value } : g,
    );

    updateTask({
      ...task,
      grouping: { groups: next },
    });
  };

  const addItem = (groupIndex: number) => {
    if (itemName && selectedGroup) {
      const next = grouping.groups.map((g, i) =>
        i === groupIndex
          ? { ...g, items: [...g.items, { name: itemName }] }
          : g,
      );

      updateTask({
        ...task,
        grouping: { groups: next },
      });
      setItemName(null);
    }
  };

  const updateItem = (groupIndex: number, itemIndex: number) => {
    if (newItemName) {
      const next = grouping.groups.map((g, i) => {
        if (i !== groupIndex) return g;

        const newItems = g.items.map((item, j) =>
          j === itemIndex ? { ...item, name: newItemName } : item,
        );

        return { ...g, items: newItems };
      });

      updateTask({
        ...task,
        grouping: { groups: next },
      });
    }
  };
  const handleEdit = (index: number, itemName: string) => {
    if (index === editingId) {
      setEditingId(null);
      setNewItemName(null);
    } else {
      setEditingId(index);
      setNewItemName(itemName);
    }
  };
  const handleDelete = (groupIndex: number, itemIndex: number) => {
    const updatedGroups = grouping.groups.map((g, i) => {
      if (i !== groupIndex) return g;
      const filteredItems = g.items.filter((_, j) => j !== itemIndex);
      return { ...g, items: filteredItems };
    });

    updateTask({
      ...task,
      grouping: {
        ...task.grouping,
        groups: updatedGroups,
      },
    });
  };
  return (
    <div className="flex flex-col gap-ElementsSpace">
      <section className="flex flex-col gap-LabelDescriptionInputSpace">
        <label className="block text-primary text-[30px] font-semibold">
          A feladat címe:
        </label>
        <input
          value={task.task_title}
          onChange={(e) => updateTask({ ...task, task_title: e.target.value })}
          className="border-lightBorder shadow-md w-full p-4 outline-none text-gray  h-[48px] border-[1px] rounded-[8px] focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </section>
      <section className="flex flex-col gap-LabelDescriptionInputSpace">
        <div className="flex flex-col gap-LabelDescriptionSpace">
          <label className="block text-primary text-[30px] font-semibold">
            Feladatleírás:
          </label>
          <p className="text-[#818181]  text-[15px]">
            Adja meg a feladat leírását. Ez a feladat índításakor fog
            megjelenni. A leírás megadása nem kötelező, üresen hagyhatja a
            mezőt.
          </p>
        </div>
        <textarea
          value={task.task_description}
          onChange={(e) =>
            updateTask({ ...task, task_description: e.target.value })
          }
          maxLength={255}
          className="w-full shadow-md resize-none p-4 h-[70px] rounded-[8px] border-[1px] border-lightBorder outline-none text-gray transition-all
             focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </section>
      <section className="flex flex-col gap-LabelDescriptionInputSpace">
        <p className="block text-primary text-[30px] font-semibold">
          Csoportok
        </p>
        <div className="flex gap-[19px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <button
              key={index}
              className={`w-[197px] h-[190px] border-[3px]  rounded-[5px] transition-all  ${index === selectedId ? 'border-primary' : 'border-dashed border-secondary'}`}
              onClick={() => setSelectedId(index)}
            >
              <p className="text-[22px] w-full truncate font-semibold text-secondaryFont">
                {grouping.groups[index]?.name || '+ Új csoport'}
              </p>
            </button>
          ))}
        </div>
      </section>
      <div className="w-full h-[1px] bg-secondary"></div>
      {selectedGroup && (
        <div className="flex flex-col gap-LabelDescriptionInputSpace">
          <div className="flex flex-col gap-LabelDescriptionInputSpace">
            <label
              className="text-[24px] font-medium text-gray"
              htmlFor={`grouping${selectedGroup.index}name`}
            >
              Csoport neve
            </label>
            <input
              maxLength={30}
              className="border-lightBorder shadow-md w-1/2 p-4 outline-none text-gray  h-[40px] border-[1px] rounded-[8px] focus:border-primary focus:ring-1 focus:ring-primary"
              name={`grouping${selectedGroup.index}name`}
              value={selectedGroup.name}
              onChange={(e) =>
                updateGroupName(selectedGroup.index, e.target.value)
              }
              placeholder="Csoport neve"
            />
          </div>
          <div className="flex flex-col gap-[30px] ">
            <div className="flex flex-col gap-[10px]">
              <p className="block text-primary text-[30px] font-semibold">
                Csoportok
              </p>
              <p className="text-[15px] text-gray font-medium">
                Adj hozzá szöveget a csoport eleméhez, vagy tölts fel egy képet
                – egyszerre csak az egyik választható.
              </p>
            </div>
            <div className="w-full flex">
              <div className="w-1/2 flex flex-col gap-LabelDescriptionInputSpace">
                <div className="flex flex-col gap-[10px]">
                  <label
                    className="text-[24px] font-medium text-gray"
                    htmlFor={`newGroupItem${selectedGroup.index}`}
                  >
                    Új elem
                  </label>
                  <input
                    className="border-lightBorder shadow-md w-1/2 p-4 outline-none text-gray  h-[40px] border-[1px] rounded-[8px] focus:border-primary focus:ring-1 focus:ring-primary"
                    name={`newGroupItem${selectedGroup.index}`}
                    type="text"
                    value={itemName ? itemName : ''}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <label
                    className="text-[24px] font-medium text-gray"
                    htmlFor="pairQuestionImage"
                  >
                    Kép
                  </label>
                  <input
                    className="
                  w-1/2
                  text-sm 
                  file:cursor-pointer
                  file:mr-4
                  file:py-2
                  file:px-4
                  file:rounded-md
                  file:border-[1px]   
                  file:border-solid
                  file:border-lightBorder
                  file:text-sm
                  file:bg-white
                  file:text-gray
                 
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  "
                    type="file"
                    accept="image/*"
                    disabled={itemName ? true : false}
                  />
                </div>

                <button
                  className="w-1/2 bg-primary text-white h-[50px] rounded-[6px]"
                  onClick={() => addItem(selectedGroup.index)}
                >
                  Elem hozzáadása
                </button>
              </div>
              <div className="w-1/2 border-l-[1px] py- pl-[35px] border-gray">
                <div className="h-[363px] py-4 px-4 bg-white flex gap-2 flex-wrap border-[1px] border-lightBorder rounded-[6px]">
                  {selectedGroup.items.map((item, ii) => (
                    <div
                      className={`flex items-center h-[48px] w-[164px] ${editingId === ii ? 'border-primary' : 'border-lightBorder'}  border-[1px] px-2 justify-between rounded-[5px] shadow-md`}
                      key={ii}
                    >
                      {isEditing && editingId === ii ? (
                        <input
                          className="border-none text-[18px] shadow-md w-full h-full  outline-none text-gray "
                          maxLength={80}
                          autoFocus
                          key={ii}
                          defaultValue={item.name}
                          onChange={(e) => setNewItemName(e.target.value)}
                          placeholder="Elem neve"
                        />
                      ) : (
                        <p className="text-[18px] w-2/3 max-w-2/3 truncate font-medium text-gray">
                          {item.name}
                        </p>
                      )}

                      <div className="flex items-center justify-center gap-2">
                        {editingId === ii && newItemName !== item.name ? (
                          <button
                            onClick={() => {
                              updateItem(selectedGroup.index, ii);
                              setIsEditing(!isEditing);
                              setEditingId(null);
                            }}
                          >
                            ✔️
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              (handleEdit(ii, item.name),
                                setIsEditing(!isEditing));
                            }}
                          >
                            <EditIcon color="#2E6544"></EditIcon>
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(selectedGroup.index, ii)}
                        >
                          <BinIcon color="#FF575A"></BinIcon>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
