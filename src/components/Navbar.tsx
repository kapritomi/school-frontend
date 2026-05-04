import { logout } from '@/api/logout';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTasks } from '@/store/TasksContext';



export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const {setWorksheetInfo}=useTasks()

  
  const navigate = useNavigate();
  const location = useLocation();

  const toggleClass = (cls: string) => {
    setSelectedClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls],
    );
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const handleSave = () => {
    const data = {
      isPublic,
      password: isPublic ? undefined : password,
      classes: selectedClasses,
    };
    setIsModalOpen(false);
  };
  return (
    <div className="w-screen bg-white h-[70px] px-[19px] shadow-md absolute flex justify-between top-0 z-10">
      <div className="flex items-center">
        <button
          className="w-[117px] h-[36px] bg-primary text-white font-semibold text-[20px] rounded-[6px]"
          onClick={() => navigate(-1)}
        >
          Vissza
        </button>
        <div className="ml-[140px] flex items-center">
          <Link to={'/taskPreview'}>
            <div className="px-3 py-3">
              <div className="h-[36px] px-2 border-[2px] border-secondary rounded-[8px] flex items-center justify-center text-secondaryFont hover:text-gray font-bold drop-shadow-lg">
                Előnézet
              </div>
            </div>
          </Link>
          <div className="px-3">
            <div
              className="h-[36px] px-2 border-[2px] border-primary bg-primary text-white rounded-[8px] flex items-center justify-center text-secondaryFont hover:text-[#f2f2f2] font-bold drop-shadow-lg"
              onClick={() => setIsModalOpen(true)}
            >
              Feladatsor mentése
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-8 font-semibold text-[20px] text-primary">
                <div
          className={`h-full flex items-center ${location.pathname.includes('teacherHomePage') ? ' border-b-[3px] border-primary' : 'hover:border-b-[3px] border-primary'}`}
        >
          <button
            onClick={() => navigate('/teacherHomePage')}
            className={`hover:text-secondary transition-all duration-150`}
          >
            Kezdőlap
          </button>
        </div>
        <div
          className={`h-full flex items-center ${location.pathname.includes('worksheets') ? ' border-b-[3px] border-primary' : 'hover:border-b-[3px] border-primary'}`}
        >
          <button
            onClick={() => navigate('/worksheets')}
            className={`hover:text-secondary transition-all duration-150`}
          >
            Feladatsoraim
          </button>
        </div>
        <div
          className={`h-full flex items-center ${location.pathname.includes('Class')  ? ' border-b-[3px] border-primary' : 'hover:border-b-[3px] border-primary'}`}
        >
          <button
            onClick={() => navigate('/teacherHomePage')}
            className={`hover:text-secondary transition-all duration-150 `}
          >
            Osztályok
          </button>
        </div>

        <button
          onClick={() => handleLogout()}
          className={`hover:text-secondary transition-all duration-150`}
        >
          Kijelentkezés
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px] space-y-4">
            {/* Láthatóság */}
            <div>
              <div className="mb-4">
                <p className="font-semibold mb-1 text-secondaryFont ">
                  Feladatlap címe:
                </p>
                <input
                  type="text"
                  className="border border-gray rounded-[5px] px-3 py-2 w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <p className="font-semibold mb-2 text-secondaryFont">
                Feladatlap láthatósága:
              </p>
              <label className="flex items-center gap-2 text-gray font-medium">
                <input
                  type="radio"
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                />
                Publikus
              </label>
              <label className="flex items-center gap-2 text-gray font-medium">
                <input
                  type="radio"
                  checked={!isPublic}
                  onChange={() => setIsPublic(false)}
                />
                Privát
              </label>
            </div>

            {/* Jelszó */}
            {!isPublic && (
              <div>
                <p className="font-semibold mb-1 text-secondaryFont">
                  Feladatlap jelszava:
                </p>
                <input
                  type="password"
                  className="border border-gray rounded-[5px] px-3 py-2 w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}

            {/* Osztályok */}
            <div>
              <p className="font-semibold mb-2 text-secondaryFont">
                Hozzárendelt osztályok:
              </p>
              {/* <div className="flex flex-wrap gap-2">
                {classesList.map((cls) => (
                  <button
                    key={cls}
                    onClick={() => toggleClass(cls)}
                    className={`w-[38px] h-[38px] flex items-center justify-center rounded border border-primary text-gray font-semibold ${
                      selectedClasses.includes(cls)
                        ? 'bg-primary text-white'
                        : 'bg-white'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div> */}
            </div>

            {/* Gombok */}
            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-secondary rounded text-secondaryFont font-semibold"
              >
                Mégse
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary text-white rounded font-bold"
              >
                Mentés
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
