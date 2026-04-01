import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <Link to={'/createTask'}>Tovább a feladatlétrehozására</Link>
    </div>
  );
};
