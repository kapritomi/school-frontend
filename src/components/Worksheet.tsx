type WorksheetProps = {
  title: string;
};
export const Worksheet = ({ title }: WorksheetProps) => {
  return (
    <div className="w-[197px] h-[300px] flex p-[30px] rounded-[12px] bg-primary text-white">
      <p className="text-[20px] font-bold">{title}</p>
    </div>
  );
};
