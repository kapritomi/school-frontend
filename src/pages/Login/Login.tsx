import { useNavigate } from 'react-router-dom';
import { useLogin } from './UseLogin';
import { ClipLoader } from 'react-spinners';

export const Login = () => {
  const navigate = useNavigate();
  const {
    handleInputChange,
    submitForm,

    setEmail,
    setPassword,

    errorMessage,
    isLodaing,
  } = useLogin();

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {isLodaing && (
        <div className="w-full z-20 flex items-center justify-center absolute h-full bg-gray-800 bg-opacity-75">
          <ClipLoader size={90} color="#2E6544"></ClipLoader>
        </div>
      )}

      <div className="w-[500px] flex flex-col gap-[41px]  min-h-[400px] shadow-md rounded-[16px] py-[27px] border-lightBorder border-[1px] px-[32px] ">
        <p className="text-TaskTitle font-semibold">Belépés</p>
        <form
          className="flex flex-col gap-[41px] "
          onSubmit={(e) => submitForm(e)}
        >
          <input
            autoFocus
            onChange={(e) => handleInputChange(e.target.value, setEmail)}
            className={`w-[436px] focus:border-primary outline-none  h-[60px] border-[2px] transition-all duration-300 rounded-[6px] p-4 ${errorMessage ? 'border-alert outline-2' : 'border-lightBorder'}`}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => handleInputChange(e.target.value, setPassword)}
            className={`w-[436px] focus:border-primary outline-none  h-[60px] border-[2px] transition-all duration-300 rounded-[6px] p-4 ${errorMessage ? 'border-alert outline-2' : 'border-lightBorder'}`}
            type="password"
            placeholder="Jelszó"
          />
          {errorMessage && (
            <div className="w-full flex items-center justify-center">
              <p className="text-alert">{errorMessage}</p>
            </div>
          )}

          <div className="w-full h-full text-white justify-center flex">
            <button
              onClick={(e) => submitForm(e)}
              className="w-[232px] h-[60px] rounded-[6px] font-semibold bg-primary"
            >
              Bejelentkezés
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
