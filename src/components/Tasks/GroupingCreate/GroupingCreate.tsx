import { useEffect } from 'react';
import { useGrouping } from './UseGrouping';
import { TaskTitle } from '../TaskTitle';
import { TaskDescription } from '../TaskDescription';
import { CreateGroupItemField } from './CreateGroupItemField';
import type { TaskJson } from '@/types/tasks';

export default function GroupingCreate({ task }: { task: TaskJson }) {
  const {
    selectedGroup,
    setSelectedId,
    addGroup,
    addItem,
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
  const grouping = task?.grouping ?? { groups: [] };

  useEffect(() => {
    if (selectedId === null || selectedId === undefined) return;

    const alreadyExists = grouping.groups.some(
      (group) => group.index === selectedId,
    );

    if (!alreadyExists) {
      addGroup(selectedId, task);
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
        scrollToId(task.id);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedId, grouping]);

  if (task)
    return (
      <div className="flex  flex-col gap-ElementsSpace">
        <TaskTitle taskId={task.id}></TaskTitle>
        <TaskDescription taskId={task.id}></TaskDescription>
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
            taskId={task.id}
            addItem={(idx) => addItem(idx, task)}
            addItemImage={(url, idx) => addItemImage(url, idx, task)}
            editingId={editingId}
            handleDelete={(gi, ii) => handleDelete(gi, ii, task)}
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
            updateGroupName={(idx, val) => updateGroupName(idx, val, task)}
            updateItem={(ii, gi) => updateItem(ii, gi, task)}
            key={selectedGroup.index}
          ></CreateGroupItemField>
        )}
      </div>
    );
}
