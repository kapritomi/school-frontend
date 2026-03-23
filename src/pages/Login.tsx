import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[500px] flex flex-col gap-[41px] h-[400px] shadow-md rounded-[16px] py-[27px] border-lightBorder border-[1px] px-[32px] ">
        <p className="text-TaskTitle font-semibold">Belépés</p>
        <input
          className="w-[436px] focus:outline-primary  h-[60px] border-lightBorder border-[1px] rounded-[6px] p-4"
          type="text"
          placeholder="Email"
        />
        <input
          className="w-[436px] focus:outline-primary h-[60px] border-lightBorder border-[1px] rounded-[6px] p-4"
          type="password"
          placeholder="Jelszó"
        />

        <div className="w-full h-full text-white justify-center flex">
          <button
            onClick={() => navigate('/teacherHomePage')}
            className="w-[232px] h-[60px] rounded-[6px] font-semibold bg-primary"
          >
            Bejelentkezés
          </button>
        </div>
      </div>
    </div>
  );
};
