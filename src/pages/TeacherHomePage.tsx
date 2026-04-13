import { useEffect, useState } from 'react';
import type { ClassType } from '../types/class';
import { ClassComponent } from '../components/ClassComponent';
import { getClassrooms } from '../api/getClassrooms';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useQuery } from '@tanstack/react-query';

export const TeacherHomePage = () => {

  const navigate = useNavigate();

  const {
    data: classrooms,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['classrooms', 'all'],
    queryFn: () => getClassrooms(),

    staleTime: 1000 * 60 * 5, // 5 percig nem kéri le újra, ha nem muszáj
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 font-bold">
          Hiba történt az adatok betöltésekor!
        </p>
      </div>
    );
  }
  return (
    <div className="relative w-screen h-screen max-h-screen overflow-y-hidden">
      <Navbar></Navbar>
      <div className="px-[41px] mt-[70px] overflow-y-auto w-full h-full">
        <p className="text-primary text-[40px] font-semibold mb-[41px]">
          Osztályok
        </p>
        {isLoading && <ClipLoader size={90} color="#2E6544"></ClipLoader>}

        {classrooms && (
          <div className="flex flex-wrap gap-[56px]">
            {classrooms.map((item: ClassType) => (
              <ClassComponent
                onClick={() => navigate(`/editClass/${item.id}`)}
                id={item.id}
                name={item.name}
                key={item.id}
              ></ClassComponent>
            ))}
            <div className="w-[164px] cursor-pointer text-white items-center justify-center shadow-md h-[157px] flex bg-primary rounded-[12px]">
              <p className="text-[40px] font-bold">+</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
