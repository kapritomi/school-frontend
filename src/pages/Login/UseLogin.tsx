import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/login';
export type Logincredentials = {
  email: string | null;
  password: string | null;
};

export const useLogin = () => {
  const [email, setEmail] = useState<null | string>("test@test.com");
  const [password, setPassword] = useState<null | string>("sajt");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLodaing, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (
    input: string,
    set: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    if (input.length > 0) {
      set(input);
    }
  };
  const checkCredentials = () => {
    if (!email || !password) {
      setErrorMessage('Hiányzó adatok.');
      return true;
    }
    return false;
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (checkCredentials()) {
      return;
    }
    setErrorMessage(null);
    setIsLoading(true);
    sessionStorage.removeItem('token');
    setErrorMessage(null);
    const credentials: Logincredentials = {
      email: email,
      password: password,
    };
    console.log(credentials);
    try {
      const response = await loginUser(credentials);

      sessionStorage.setItem('token', response.access_token);
      // setAuthenticatedUser({
      //   email: response.user.email,
      //   id: response.user.id,
      //   name: response.user.name,
      //   tier_id: response.user.tier_id,
      //   tier: response.user.tier,
      navigate('/teacherHomePage');
      // });
    } catch (e: any) {
      if (e.response) {
        setErrorMessage(e.response.data.message);
      } else {
        setErrorMessage('Megszakadt a kapcsolat az adatbázissal.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitForm,
    handleInputChange,
    setEmail,
    setPassword,

    errorMessage,
    isLodaing,
  };
};
