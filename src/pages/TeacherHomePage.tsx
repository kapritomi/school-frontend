import { useEffect, useState } from 'react';
import type { ClassType } from '../types/class';
import { ClassComponent } from '../components/ClassComponent';
import { getClassrooms } from '../api/getClassrooms';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

export const TeacherHomePage = () => {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [isFetching,setIsFetching]=useState<boolean>(true)
  const [errorMessage,setErrorMessage]=useState<string|null>(null)
  const navigate = useNavigate()

  useEffect(()=>{
    setIsFetching(true)
    getClassrooms()
    .then((res)=>setClasses(res.classRooms))
    .catch((e)=>setErrorMessage(e))
    .finally(()=>setIsFetching(false))
  },[])



  return (
    <div className="px-[41px] py-[40px]">
      <p className="text-primary text-[40px] font-semibold mb-[41px]">
        Osztályok
      </p>
      {isFetching ? <ClipLoader size={90} color="#2E6544"></ClipLoader>
      :
      errorMessage? <p>{errorMessage}</p> :
      <div className="flex flex-wrap gap-[56px]">
        {classes.map((item: ClassType) => (
          <ClassComponent
            onClick={()=>navigate(`/editClass/${item.id}`)}
            id={item.id}
            name={item.name}
            key={item.id}
          ></ClassComponent>
        ))}
        <div className="w-[164px] cursor-pointer text-white items-center justify-center shadow-md h-[157px] flex bg-primary rounded-[12px]">
          <p className="text-[40px] font-bold">+</p>
        </div>
      </div>
      }
    </div>
  );
};
