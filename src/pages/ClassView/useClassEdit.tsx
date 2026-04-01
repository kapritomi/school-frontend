import { useState } from 'react';
import { storeStudent } from '../../api/storeStudent';
import { updateStudent } from '../../api/updateStudent';
import {
  deleteStudents,
  type deleteStudentsType,
} from '../../api/deleteStudents';
import { useNavigate } from 'react-router-dom';
import { deleteClassroom } from '../../api/deleteClasroom';

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editView, setEditView] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [modalErrorMessage, setModalErrorMessage] = useState<null | string>(
    null,
  );

  const navigate = useNavigate();
  const handleStudentEdit = (id: number | null) => {
    if (editingId === id) {
      setEditingId(null);
    } else {
      setEditingId(id);
    }
  };

  const handleUpdateStudent = async (student_id: number, name: string) => {
    if (!student_id || !name) {
      return;
    }
    setIsFetching(true);
    try {
      const updateData = {
        name: name,
      };
      const response = await updateStudent(updateData, student_id);
      console.log(response);

      setClassroomData((prev) => {
        if (!prev) return null;

        return {
          ...prev,
          students: prev.students.map((student) =>
            student.id === student_id ? { ...student, name: name } : student,
          ),
        };
      });
      setEditingId(null);
    } catch (e: any) {
      setModalErrorMessage(e.response.data.message);
    } finally {
      setIsFetching(false);
    }
  };

  const handleDeleteUsers = async (student_id: number) => {
    if (!classroomData?.clasroom_id || !student_id) {
      return;
    }
    setIsFetching(true);
    try {
      const deleteData: deleteStudentsType = {
        classroom_id: classroomData.clasroom_id,
        student_ids: [student_id],
      };
      console.log(deleteData);
      const response = await deleteStudents(deleteData);
      console.log(response);

      setClassroomData((prev) => {
        if (!prev) return null;

        return {
          ...prev,
          students: prev.students.filter(
            (student) => student.id !== student_id,
          ),
        };
      });
      setEditingId(null);
    } catch (e: any) {
      setModalErrorMessage(e.response.data.message);
    } finally {
      setIsFetching(false);
    }
  };

  const handleDeleteClassroom = async () => {
    if (classroomData?.clasroom_id) {
      setIsFetching(true);
      try {
        const response = await deleteClassroom(classroomData?.clasroom_id);
        navigate('/teacherHomePage');
      } catch (e: any) {
        setModalErrorMessage(e.response.data.message);
      } finally {
        setIsFetching(false);
      }
    }
  };

  const handleInputChange = (e: string) => {
    let studentName = e.trim();
    setStudentName(studentName);
  };
  const handleSaveStudent = async (classroom_id: number) => {
    if (studentName && classroom_id) {
      const postData: studentObject = {
        classroom_id: classroom_id,
        name: studentName,
      };
      setIsFetching(true);
      try {
        setErrorMessage(null);
        const response = await storeStudent(postData);

        if (classroomData) {
          const newStudent: Student = {
            id:
              classroomData.students.length > 0
                ? Math.max(...classroomData.students.map((s) => s.id)) + 1
                : 1,
            name: studentName.trim(),
          };

          setClassroomData({
            ...classroomData,
            students: [...classroomData.students, newStudent],
          });
        }
      } catch (e: any) {
        setErrorMessage(e.response.data.message);
      } finally {
        setIsFetching(false);
        setStudentName('');
      }
    }
  };
  return {
    studentName,
    classroomData,
    errorMessage,
    editView,
    editingId,
    isFetching,
    modalErrorMessage,
    handleStudentEdit,
    setEditView,
    setClassroomData,
    handleSaveStudent,
    handleInputChange,
    handleUpdateStudent,
    setIsFetching,
    handleDeleteUsers,
    handleDeleteClassroom,
    setModalErrorMessage,
  };
};
