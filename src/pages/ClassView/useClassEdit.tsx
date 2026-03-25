import { useState } from 'react';
import { storeStudent } from '../../api/storeStudent';

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

  const handleStudentEdit = (id: number | null, name: string | null) => {
    setEditingId(id);
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
      }
    }
  };
  return {
    studentName,
    classroomData,
    errorMessage,
    editView,
    editingId,
    handleStudentEdit,
    setEditView,
    setClassroomData,
    handleSaveStudent,
    handleInputChange,
  };
};
