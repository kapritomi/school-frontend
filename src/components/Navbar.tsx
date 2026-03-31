import { useLocation, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="w-screen h-[70px] px-[19px] shadow-md absolute flex items-center justify-between top-0">
      <button
        className="w-[117px] h-[36px] bg-primary text-white font-semibold text-[20px] rounded-[6px]"
        onClick={() => navigate(-1)}
      >
        Vissza
      </button>
      <div className="flex gap-8 font-semibold text-[20px] text-primary">
        <button
          onClick={() => navigate('/worksheets')}
          className={`hover:text-secondary transition-all duration-150 ${location.pathname.includes('worksheets') ? 'border-b-[1px]  border-primary' : 'border-none'}`}
        >
          Feladatsoraim
        </button>
        <button
          onClick={() => navigate('/teacherHomePage')}
          className={`hover:text-secondary transition-all duration-150 ${location.pathname.includes('Class') || location.pathname.includes('teacherHomePage') ? ' border-b-[1px] border-primary' : 'border-none'}`}
        >
          Osztályok
        </button>
        <button className={`hover:text-secondary transition-all duration-150`}>
          Kijelentkezés
        </button>
      </div>
    </div>
  );
};
