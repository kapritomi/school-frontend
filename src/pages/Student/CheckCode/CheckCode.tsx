import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useCheckCode } from './useCheckCode';

export const CheckCode = () => {
  const navigate = useNavigate();
  const {
    isLodaing,
    errorMessage,
    handleInputChange,
    handleSubmit,
    setCode,
    setPassword,
    students,
  } = useCheckCode();

  return (
    <div className="w-screen h-screen max-h-screen relative overflow-y-hidden">
      {isLodaing && (
        <div className="w-full z-20 flex items-center justify-center absolute h-full bg-gray-800 bg-opacity-75">
          <ClipLoader size={90} color="#2E6544"></ClipLoader>
        </div>
      )}
      <div className="pt-[20px] px-[41px] w-full h-full flex items-center justify-center overflow-y-scroll">
        {students ? (
          <div className="w-full h-full">
            <p className="text-[40px] py-8 font-semibold text-primary text-center">
              {' '}
              Válaszd ki a neved!
            </p>
            <div className="w-full h-full flex flex-wrap gap-4 ">
              {students.map((st) => (
                <div
                  className={`flex items-center h-[64px] hover:cursor-pointer hover:border-primary w-[334px] border-lightBorder border-[1px] px-[17px] py-[11px] justify-between rounded-[5px] shadow-md`}
                  key={st.id}
                >
                  <p className="text-[24px] w-2/3 max-w-2/3 truncate font-medium text-darkGrayText">{st.name}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-[500px] flex flex-col gap-[41px]  min-h-[400px] shadow-md rounded-[16px] py-[27px] border-lightBorder border-[1px] px-[32px] ">
            <form
              className="flex flex-col gap-[41px] "
              onSubmit={(e) => handleSubmit(e)}
            >
              <input
                autoFocus
                onChange={(e) => handleInputChange(e.target.value, setCode)}
                className={`w-[436px] focus:border-primary outline-none  h-[60px] border-[2px] transition-all duration-300 rounded-[6px] p-4 ${errorMessage ? 'border-alert outline-2' : 'border-lightBorder'}`}
                type="text"
                placeholder="Kód"
              />
              <input
                autoFocus
                onChange={(e) => handleInputChange(e.target.value, setPassword)}
                className={`w-[436px] focus:border-primary outline-none  h-[60px] border-[2px] transition-all duration-300 rounded-[6px] p-4 ${errorMessage ? 'border-alert outline-2' : 'border-lightBorder'}`}
                type="text"
                placeholder="Jelszó"
              />
              {errorMessage && (
                <div className="w-full flex items-center justify-center">
                  <p className="text-alert">{errorMessage}</p>
                </div>
              )}

              <div className="w-full h-full text-white justify-center flex">
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="w-[232px] h-[60px] rounded-[6px] font-semibold bg-primary"
                >
                  Kezdés
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
