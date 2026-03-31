import { useQuery } from "@tanstack/react-query";
import { Navbar } from "../../components/Navbar";
import { getWorksheets } from "../../api/getWorksheets";

export const Worksheets = ()=>{
      const {
    data: worksheets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['worksheets', classroomId],
    queryFn: () => getWorksheets(),
    select: (res) => ({
      name: res.classroom_name,
      students: res.students,
      classroom_id: res.classroom_id,
    }),
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
    return(
        <div className="w-screen h-screen max-h-screen relative overflow-y-hidden">
              <Navbar />
        
              <div className="mt-[70px] px-[41px] w-full h-full overflow-y-scroll">
                {
                    
                }
              </div>
        </div>
    )
}