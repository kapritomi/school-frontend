import { useTasks } from '@/store/TasksContext';
import type { Group } from '@/types/tasks';
import { useState } from 'react';

export const useGrouping = () => {
  const { activeTask, updateTask } = useTasks();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<null | Group>(null);
  const [itemName, setItemName] = useState<null | string>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newItemName, setNewItemName] = useState<string | null>(null);
  const [itemNameInputDisabled, setItemNameInputDisabled] =
    useState<boolean>(false);
  const grouping = activeTask?.grouping ?? { groups: [] };

  const addGroup = (index: number) => {
    if (!activeTask) return;
    updateTask({
      ...activeTask,
      grouping: {
        groups: [...grouping.groups, { index: index, name: '', items: [] }],
      },
    });
  };

  const updateGroupName = (index: number, value: string) => {
    const next = grouping.groups.map((g, i) =>
      i === index ? { ...g, name: value } : g,
    );
    if (!activeTask) return;
    updateTask({
      ...activeTask,
      grouping: { groups: next },
    });
  };

  const addItem = (groupIndex: number) => {
    const targetGroup = grouping.groups[groupIndex];

    if (itemName && targetGroup && targetGroup.items.length < 10) {
      const next = grouping.groups.map((g, i) =>
        i === groupIndex
          ? { ...g, items: [...g.items, { image: null, name: itemName }] }
          : g,
      );

      if (!activeTask) return;

      updateTask({
        ...activeTask,
        grouping: { groups: next },
      });

      setItemName(null);
    }
  };

  const addItemImage = (url: string, groupIndex: number) => {
    if (url && selectedGroup) {
      const next = grouping.groups.map((g, i) =>
        i === groupIndex
          ? { ...g, items: [...g.items, { image: url, name: null }] }
          : g,
      );
      if (!activeTask) return;
      updateTask({
        ...activeTask,
        grouping: { groups: next },
      });
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
      if (!activeTask) return;
      updateTask({
        ...activeTask,
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
    if (!activeTask) return;
    updateTask({
      ...activeTask,
      grouping: {
        ...activeTask.grouping,
        groups: updatedGroups,
      },
    });
  };

  const scrollToId = (taskId: string) => {
    const container = document.getElementById('scroll-container');
    const node = document.getElementById(`addGroupElements.${taskId}`);

    if (node && container) {
      const containerRect = container.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();

      const scrollTarget =
        nodeRect.top - containerRect.top + container.scrollTop;

      container.scrollTo({
        top: scrollTarget,
        behavior: 'smooth',
      });
    }
  };

  return {
    handleDelete,
    handleEdit,
    updateItem,
    addItem,
    addGroup,
    updateGroupName,
    setSelectedGroup,
    setSelectedId,
    selectedGroup,
    grouping,
    isEditing,
    selectedId,
    itemName,
    setItemName,
    editingId,
    setNewItemName,
    setIsEditing,
    setEditingId,
    newItemName,
    scrollToId,
    addItemImage,
    itemNameInputDisabled,
    setItemNameInputDisabled,
  };
};
