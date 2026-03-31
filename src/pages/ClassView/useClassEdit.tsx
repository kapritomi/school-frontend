import { useState } from 'react';
import { storeStudent } from '../../api/storeStudent';
import { updateStudent } from '../../api/updateStudent';
import {
  deleteStudents,
  type deleteStudentsType,
} from '../../api/deleteStudents';
import { useNavigate } from 'react-router-dom';
import { deleteClassroom } from '../../api/deleteClasroom';
import type { MessageType } from '../../types/messageType';
import { useQueryClient } from '@tanstack/react-query';

export type studentObject = {
  classroom_id: number;
  name: string;
};
export type Student = {
  id: number;
  name: string;
};
export type ClassroomData = {
  name: string;
  clasroom_id: number;
  students: Student[];
};
export const useClassEdit = () => {
  const [studentName, setStudentName] = useState<string | null>(null);
  const [classroomData, setClassroomData] = useState<ClassroomData | null>(
    null,
  );
  const [message, setMessage] = useState<MessageType | null>(null);
  const [editView, setEditView] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleStudentEdit = (id: number | null) => {
    if (editingId === id) {
      setEditingId(null);
    } else {
      setEditingId(id);
    }
  };


  const handleUpdateStudent = async (student_id: number, name: string, classroom_id: number) => {
    if (!student_id || !name || !classroom_id) return;

    setIsFetching(true);
    try {
      const updateData = { name: name.trim() };
      
     
      const response = await updateStudent(updateData, student_id);

      queryClient.setQueryData(['classroom', String(classroom_id)], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          students: oldData.students.map((s: any) => 
            s.id === student_id ? { ...s, name: name.trim() } : s
          ),
        };
      });

      setMessage({ type: 'success', message: response.message });
      setEditingId(null);

    } catch (e: any) {
      setMessage({ type: 'error', message: 'Hiba a mentés során!' });
    } finally {
      setIsFetching(false);
    }
  };

  const handleDeleteUsers = async (
    student_id: number,
    classroom_id: number,
  ) => {
    if (!classroom_id || !student_id) {
      return;
    }
    setIsFetching(true);
    try {
      const deleteData: deleteStudentsType = {
        classroom_id: classroom_id,
        student_ids: [student_id],
      };
      const response = await deleteStudents(deleteData);
     queryClient.setQueryData(['classroom', String(classroom_id)], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          students: oldData.students.filter((s: any) => 
            s.id !== student_id 
          ),
        };
      });
      setMessage({
        type: 'success',
        message: response.message,
      });

      setEditingId(null);
    } catch (e: any) {
      setMessage({
        type: 'error',
        message: e.response.data.message,
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleDeleteClassroom = async (clasroom_id: number) => {
    if (clasroom_id) {
      setIsFetching(true);
      try {
        await deleteClassroom(clasroom_id);

        queryClient.removeQueries({
          queryKey: ['classroom', clasroom_id],
        });

        queryClient.invalidateQueries({ queryKey: ['classrooms'] });
        navigate('/teacherHomePage');
      } catch (e: any) {
        setMessage({
          type: 'error',
          message: e.response.data.message,
        });
      } finally {
        setIsFetching(false);
      }
    }
  };

  const handleInputChange = (e: string) => {
    let studentName = e;
    setStudentName(studentName);
  };
  const handleSaveStudent = async (classroom_id: number) => {
    if (studentName && classroom_id) {
      const postData: studentObject = {
        classroom_id: classroom_id,
        name: studentName.trim(),
      };
      setIsFetching(true);
      try {
        setMessage(null);
        const response = await storeStudent(postData);
        queryClient.invalidateQueries({
          queryKey: ['classroom', String(classroom_id)],
        });

        setMessage({
          type: 'success',
          message: response.message,
        });
      } catch (e: any) {
        setMessage({
          type: 'error',
          message: e.response.data.message,
        });
      } finally {
        setIsFetching(false);
        setStudentName('');
      }
    }
  };
  return {
    studentName,
    classroomData,
    message,
    editView,
    editingId,
    isFetching,
    handleStudentEdit,
    setEditView,
    setClassroomData,
    handleSaveStudent,
    handleInputChange,
    handleUpdateStudent,
    setIsFetching,
    handleDeleteUsers,
    handleDeleteClassroom,
    setMessage,
  };
};
