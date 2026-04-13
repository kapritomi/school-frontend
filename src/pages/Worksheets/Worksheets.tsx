import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Navbar } from '../../components/Navbar';
import { getWorksheets } from '../../api/getWorksheets';
import { Worksheet } from '../../components/Worksheet';
import { ClipLoader } from 'react-spinners';
import { useState } from 'react';
import { deleteWorksheet } from '../../api/deleteWorksheet';
type WorksheetsResponseType = {
  title: string;
  id: number;
};

export const Worksheets = () => {
  const queryClient = useQueryClient();
  const {
    data: worksheets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['worksheets', 'all'],
    queryFn: () => getWorksheets(),
    select: (res: WorksheetsResponseType[]) =>
      res.map((ws) => ({
        title: ws.title,
        id: ws.id,
      })),
    staleTime: 1000 * 60 * 5, // 5 percig nem kéri le újra, ha nem muszáj
  });
  const [selectedWorksheetId, setSelectedWorksheetId] = useState<number | null>(
    null,
  );

  const handleSelectWorksheet = (id: number) => {
    if (id === selectedWorksheetId) {
      setSelectedWorksheetId(null);
      return;
    }
    setSelectedWorksheetId(id);
  };

  const handleDeleteWorksheet = async (id: number) => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt a feladatlapot?")) return;
    if (id) {
      try {
        await deleteWorksheet(id);
        queryClient.setQueryData(
          ['worksheets', 'all'],
          (oldData: WorksheetsResponseType[]) => {
            if (!oldData) return [];
            return oldData.filter((ws: WorksheetsResponseType) => ws.id !== id);
          },
        );

        if (selectedWorksheetId === id) {
          setSelectedWorksheetId(null);
        }
      } catch (error) {
        console.log(error);
      }
    }
    return;
  };
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 font-bold">
          Hiba történt az adatok betöltésekor! {error.message}
        </p>
      </div>
    );
  }
  return (
    <div className="w-screen h-screen max-h-screen relative overflow-y-hidden">
      <Navbar />

      <div className="mt-[70px] px-[41px] w-full flex flex-col gap-[40px] h-full overflow-y-auto">
        {isLoading && (
          <div className="w-full h-full z-20 top-0 flex right-0 items-center justify-center absolute bg-zinc-400 bg-opacity-40">
            <ClipLoader size={90} color="#2E6544" />
          </div>
        )}
        <p className="text-[40px] font-semibold text-primary">
          Feladatlapjaid:
        </p>
        <div className="w-full  flex flex-wrap gap-[60px]">
          {worksheets &&
            worksheets.map((item: WorksheetsResponseType) => (
              <Worksheet
                handleDeleteWorksheet={handleDeleteWorksheet}
                handleSelectWorksheet={handleSelectWorksheet}
                selectedWorksheetId={selectedWorksheetId}
                id={item.id}
                title={item.title}
              ></Worksheet>
            ))}
        </div>
      </div>
    </div>
  );
};
