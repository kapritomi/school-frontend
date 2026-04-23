import { useEffect } from 'react';

import { EditIcon } from '@/assets/Icons/EditIcon';
import { BinIcon } from '@/assets/Icons/BinIcon';
import { useGrouping } from './UseGrouping';
import { useTasks } from '@/store/TasksContext';
import type { creatingComponentProps } from '@/types/tasks';
import { TaskTitle } from '../TaskTitle';
import { TaskDescription } from '../TaskDescription';

export default function GroupingCreate({ taskId }: creatingComponentProps) {
  const { activeTask, updateTask } = useTasks();
  const {
    selectedGroup,
    setSelectedId,
    addGroup,
    addItem,
    grouping,
    itemName,
    newItemName,
    setItemName,
    setNewItemName,
    setIsEditing,
    setEditingId,
    editingId,
    handleDelete,
    handleEdit,
    isEditing,
    selectedId,
    updateGroupName,
    updateItem,
    setSelectedGroup,
    scrollToId
  } = useGrouping();

  useEffect(() => {
    if (selectedId !== null && typeof selectedId !== 'undefined') {
      if (typeof grouping.groups[selectedId] === 'undefined') {
        addGroup(selectedId);
      }
    }
  }, [selectedId]);

  //a csoport letrehozasanal siman belehet bugoltatni, hogy 2 ugyanolyan indexszel letrehozzon elemet szval ezt megkell nezni
  useEffect(() => {
    console.log(grouping)
    if (selectedId !== null && typeof selectedId !== 'undefined')
      setSelectedGroup(grouping.groups[selectedId]);
        const timer = setTimeout(() => {
        scrollToId();
      }, 300);


      return () => clearTimeout(timer);
  }, [selectedId, grouping]);


  if (!activeTask) return null;
  return (
    <div className="flex  flex-col gap-ElementsSpace">
      <TaskTitle taskId={taskId}></TaskTitle>
      <TaskDescription taskId={taskId}></TaskDescription>
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
      <div  className="w-full h-[1px] bg-secondary"></div>
      {selectedGroup && (
        <div id="addGroupElements" className="flex flex-col gap-LabelDescriptionInputSpace">
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
