import { Navbar } from '@/components/Navbar';
import { Worksheets } from './Worksheets';
import { BgLeftBottom } from '@/assets/Icons/BgLeftBottom';
import { BgRightTop } from '@/assets/Icons/BgRightTop';

export const WorksheetsPage = () => {
  return (
    <div className="w-screen h-screen max-h-screen relative overflow-y-hidden">
      <Navbar></Navbar>
      <div className="absolute bottom-0 left-0 -z-10">
        <BgLeftBottom></BgLeftBottom>
      </div>
      <div className="absolute top-0 right-0 -z-10">
        <BgRightTop></BgRightTop>
      </div>
      <div className="mt-[70px] px-[41px]">
        <Worksheets></Worksheets>
      </div>
    </div>
  );
};
