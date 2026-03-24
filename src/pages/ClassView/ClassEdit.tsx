import { useParams } from 'react-router-dom';
export const ClassEdit = ()=>{
    const { classroomId } = useParams();
    return(
        <div>{classroomId}</div>
    )
}