import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center gap-4">
      <Link
        className="font-bolt p-6 bg-primary w-[300px] text-white"
        to={'/createTask'}
      >
        Tovább a feladat létrehozására
      </Link>
      <Link
        className="font-bolt p-6 bg-primary w-[300px] text-white"
        to={'/login'}
      >
        Tovább a belépésre
      </Link>
    </div>
  );
};
