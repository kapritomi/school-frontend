import { useQuery } from "@tanstack/react-query";
import { getWorksheetSolutions } from "../../api/getWorksheetSolutions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { ClipLoader } from "react-spinners";
type WorksheetSolutionsResponseType={
    worksheet_id:number,
    solutions:SolutionType[],
    tasks:WorksheetTasksType[]
}
type WorksheetTasksType={
  task_id:number,
  task_title:string
}
type SolutionDetailType={
  task_id:number,
  score:number
}
type SolutionType={
    id:number,
    student_id:number,
    student_name:string,
    totalScore:number,
    details:SolutionDetailType[]
}
export const WorksheetSolutions = ()=>{
    const {worksheetId}=useParams()
  const {
  data: worksheetSolutions,
  isLoading,
  error,
} = useQuery<WorksheetSolutionsResponseType>({
  queryKey: ['worksheetsSolutions', worksheetId], 
  queryFn: () => getWorksheetSolutions(worksheetId!), 
  enabled: !!worksheetId, 
  staleTime: 1000 * 60 * 5,
});
  useEffect(()=>{
    console.log(worksheetSolutions)
  },[worksheetSolutions])
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
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="mt-[70px] flex-1 overflow-auto px-[41px] pb-16">
           {isLoading && (
          <div className="w-full h-full z-20 top-0 flex right-0 items-center justify-center absolute bg-zinc-400 bg-opacity-40">
            <ClipLoader size={90} color="#2E6544" />
          </div>
        )}
        {worksheetSolutions && (
          <div className="relative w-fit border border-lightBorder  rounded-lg">

            <div 
              className="grid  sticky top-0 z-20  shadow-md" 
              style={{ 
                gridTemplateColumns: `300px repeat(${worksheetSolutions.tasks.length}, 400px)` 
              }}
            >
             
              <div className="sticky left-0 z-30 bg-primary text-white font-semibold text-[20px] p-3 ">
                Tanuló neve
              </div>
              
              {worksheetSolutions.tasks.map((task) => (
                <div key={task.task_id} className="text-white bg-primary text-center text-[20px] p-3 ">
                  {task.task_title}
                </div>
              ))}
            </div>

          
            <div>
              {worksheetSolutions.solutions.map((student) => (
                <div 
                  key={student.id}
                  className="grid border-b border-b-lightBorder  hover:bg-secondary cursor-pointer hover:text-white text-primary"
                  style={{ 
                    gridTemplateColumns: `300px repeat(${worksheetSolutions.tasks.length}, 400px)` 
                  }}
                >
                 
                  <div className="sticky left-0 z-10 text-[25px] font-semibold text-primary bg-white p-4  border-r border-lightBorder  ">
                    {student.student_name}
                  </div>
                  
                
                  {student.details.map((detail) => (
                    <div key={detail.task_id} className="text-center p-4 border-r font-medium  text-[25px] border-lightBorder">
                      {detail.score}P
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

}