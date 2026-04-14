import { useState } from 'react';
import type { MessageType } from '../../types/messageType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getClassrooms } from '../../api/getClassrooms';
import { useNavigate } from 'react-router-dom';
import { createClassroom } from '../../api/createClassroom';

export const useTeacherHomePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [classRoomName, setClassRoomName] = useState<null | string>(null);
  const [message, setMessage] = useState<MessageType | null>(null);

  const queryClient = useQueryClient();
  const {
    data: classrooms,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['classrooms', 'all'],
    queryFn: () => getClassrooms(),

    staleTime: 1000 * 60 * 5, // 5 percig nem kéri le újra, ha nem muszáj
  });

  const confirmCreate = () => {
    if (classRoomName) mutation.mutate({ name: classRoomName });
    setClassRoomName(null);
    setIsModalOpen(false);
  };

  const cancelCreate = () => {
    setIsModalOpen(false);
    setClassRoomName('');
  };

  const mutation = useMutation({
    mutationFn: createClassroom,
    onSuccess: (res) => {
      queryClient.setQueryData(['classrooms', 'all'], (old: any) => [
        ...old,
        res.classroom,
      ]);

      navigate(`/editClass/${res.classroom.id}`);
    },
    onError: (error: any) => {
      const serverMessage =
        error.response?.data?.message || 'Hiba történt a mentés során!';
      setMessage({ type: 'error', message: serverMessage });
    },
  });
  return {
    classrooms,
    error,
    isLoading,
    isModalOpen,
    classRoomName,
    message,
    setIsModalOpen,
    setClassRoomName,
    setMessage,
    confirmCreate,
    cancelCreate,
    mutation,
  };
};
