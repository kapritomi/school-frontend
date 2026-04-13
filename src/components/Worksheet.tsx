import { useNavigate } from 'react-router-dom';

type WorksheetProps = {
  title: string;
  id: number;
  handleSelectWorksheet: (id: number) => void;
  selectedWorksheetId: number | null;
  handleDeleteWorksheet: (id: number) => void;
};
export const Worksheet = ({
  title,
  id,
  handleSelectWorksheet,
  selectedWorksheetId,
  handleDeleteWorksheet,
}: WorksheetProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex gap-[16px] transition-all duration-300ms ${id === selectedWorksheetId ? 'w-[400px]' : 'w-[197px]'}`}
    >
      <div
        onClick={() => handleSelectWorksheet(id)}
        className={` w-[197px] h-[300px] flex p-[30px] rounded-[12px] cursor-pointer bg-primary text-white    tranition-all ${id === selectedWorksheetId ? 'outline outline-4 outline-secondary' : 'hover:outline hover:outline-2 hover:outline-secondary'} `}
      >
        <p className="text-[20px] font-bold">{title}</p>
      </div>
      {id === selectedWorksheetId && (
        <div className="flex flex-col gap-4 p-4 text-[20px]">
          <p
            onClick={() => navigate(`/worksheetSolutions/${id}`)}
            className="cursor-pointer hover:font-medium transition-all duration-150"
          >
            Megoldások
          </p>
          <p className="cursor-pointer hover:font-medium transition-all duration-150">
            Szerkesztés
          </p>
          <p
            className="text-alert cursor-pointer hover:font-medium transition-all duration-150"
            onClick={() => handleDeleteWorksheet(id)}
          >
            Törlés
          </p>
        </div>
      )}
    </div>
  );
};
