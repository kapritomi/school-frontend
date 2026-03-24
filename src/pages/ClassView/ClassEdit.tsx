import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStudents } from '../../api/getStudents';
import { StudentCard } from '../../components/StudentCard';
type Student = {
    id:number,
    name:string
}
export const ClassEdit = ()=>{
    const { classroomId } = useParams();
    const [students,setStudents]=useState<Student[]>([])
    useEffect(()=>{
        if(classroomId)
        {
            getStudents(Number(classroomId))
            .then((res)=>setStudents(res.students))
            .catch((e)=>console.log(e))
        }
    },[])
    return(
        <div>
            <div className='flex flex-wrap gap-[35px]'>
                {students.map((item)=>
                    <StudentCard id={item.id} name={item.name} key={item.id}></StudentCard>
                )}
            </div>
        </div>
    )
}