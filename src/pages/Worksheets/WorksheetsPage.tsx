import { Navbar } from '@/components/Navbar';
import { Worksheets } from './Worksheets';

export const WorksheetsPage = () => {
  return (
    <div className="w-screen h-screen max-h-screen relative overflow-y-hidden">
      <Navbar></Navbar>
      <div className="mt-[70px] px-[41px]">
        <Worksheets></Worksheets>
      </div>
    </div>
  );
};
