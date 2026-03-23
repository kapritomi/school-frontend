import { useState } from 'react';
import type { ClassType } from '../types/class';
import { ClassComponent } from '../components/ClassComponent';

export const TeacherHomePage = () => {
  const [classes, setClasses] = useState<ClassType[]>([
    { id: 0, name: '4.c', teacher_id: 1 },
    { id: 0, name: '4.c', teacher_id: 1 },
    { id: 0, name: '4.c', teacher_id: 1 },
    { id: 0, name: '4.c', teacher_id: 1 },
    { id: 0, name: '4.c', teacher_id: 1 },
    { id: 0, name: '4.c', teacher_id: 1 },
    { id: 0, name: '4.c', teacher_id: 1 },
    { id: 0, name: '4.c', teacher_id: 1 },
    { id: 0, name: '4.c', teacher_id: 1 },
    { id: 0, name: '4.c', teacher_id: 1 },
    { id: 0, name: '4.c', teacher_id: 1 },
    { id: 0, name: '4.c', teacher_id: 1 },
  ]);
  return (
    <div className="px-[41px] py-[40px]">
      <p className="text-primary text-[40px] font-semibold mb-[41px]">
        Osztályok
      </p>
      <div className="flex flex-wrap gap-[56px]">
        {classes.map((item: ClassType) => (
          <ClassComponent
            id={item.id}
            name={item.name}
            key={item.id}
          ></ClassComponent>
        ))}
        <div className="w-[164px] cursor-pointer text-white items-center justify-center shadow-md h-[157px] flex bg-primary rounded-[12px]">
          <p className="text-[40px] font-bold">+</p>
        </div>
      </div>
    </div>
  );
};
