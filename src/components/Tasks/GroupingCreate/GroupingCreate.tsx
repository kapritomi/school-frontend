import { useEffect } from 'react';
import { useGrouping } from './UseGrouping';
import { useTasks } from '@/store/TasksContext';
import type { creatingComponentProps } from '@/types/tasks';
import { TaskTitle } from '../TaskTitle';
import { TaskDescription } from '../TaskDescription';
import { CreateGroupItemField } from './CreateGroupItemField';

export default function GroupingCreate({ taskId }: creatingComponentProps) {
  const { activeTask } = useTasks();
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
    scrollToId,
    addItemImage,
    itemNameInputDisabled,
    setItemNameInputDisabled,
  } = useGrouping();

  useEffect(() => {
    if (selectedId === null || selectedId === undefined) return;

    const alreadyExists = grouping.groups.some(
      (group) => group.index === selectedId,
    );

    if (!alreadyExists) {
      addGroup(selectedId);
    }
  }, [selectedId]);

  useEffect(() => {
    if (selectedId !== null && typeof selectedId !== 'undefined') {
      const targetGroup = grouping.groups.find(
        (item) => item.index === selectedId,
      );
      if (targetGroup) {
        setSelectedGroup(targetGroup);
      }

      const timer = setTimeout(() => {
        scrollToId(taskId);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedId, grouping]);

  if (activeTask && taskId)
    return (
      <div className="flex  flex-col gap-ElementsSpace">
        <TaskTitle taskId={taskId}></TaskTitle>
        <p>{taskId}</p>
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
        <div className="w-full h-[1px] bg-secondary"></div>
        {selectedGroup && (
          <CreateGroupItemField
            taskId={taskId}
            addItem={addItem}
            addItemImage={addItemImage}
            editingId={editingId}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            isEditing={isEditing}
            itemName={itemName}
            itemNameInputDisabled={itemNameInputDisabled}
            newItemName={newItemName}
            selectedGroup={selectedGroup}
            setEditingId={setEditingId}
            setIsEditing={setIsEditing}
            setItemName={setItemName}
            setItemNameInputDisabled={setItemNameInputDisabled}
            setNewItemName={setNewItemName}
            updateGroupName={updateGroupName}
            updateItem={updateItem}
            key={selectedGroup.index}
          ></CreateGroupItemField>
        )}
      </div>
    );
}
