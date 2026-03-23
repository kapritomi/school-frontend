type ClassProps = {
  id: number;
  name: string;
};
export const ClassComponent = ({ id, name }: ClassProps) => {
  return (
    <div
      key={id}
      className="w-[164px] cursor-pointer text-white items-center justify-center shadow-md h-[157px] flex bg-primary rounded-[12px]"
    >
      <p className="text-[40px] font-bold">{name}</p>
    </div>
  );
};
