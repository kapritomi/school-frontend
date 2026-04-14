import { useState } from 'react';
import { checkCodeAndPassword } from '../../../api/Student/checkCode';
type Student = {
  name: string;
  id: number;
};
export const useCheckCode = () => {
  const [isLodaing, setIsLoading] = useState<null | boolean>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [code, setCode] = useState<null | string>('U7yfql0X');
  const [password, setPassword] = useState<null | string>('körte123');
  const [students, setStudents] = useState<null | Student[]>(null);
  const [worksheetId, setWorksheetId] = useState<null | number>(0);
  const handleInputChange = (
    input: string,
    set: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    if (input.length > 0) {
      set(input);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !password) return;
    setIsLoading(true)
    const data = {
      access_code: code,
      password: password,
    };
    try {
      const res = await checkCodeAndPassword(data);
      setStudents(res.students);
      setWorksheetId(res.worksheet_id);
    } catch (error: any) {
      const serverMessage =
        error.response?.data?.message || 'Hiba történt a mentés során!';
      setErrorMessage(serverMessage);
    }
    finally{
        setIsLoading(false)
    }
  };
  return {
    isLodaing,
    setIsLoading,
    errorMessage,
    students,
    handleSubmit,
    setPassword,
    setCode,
    handleInputChange,
  };
};
