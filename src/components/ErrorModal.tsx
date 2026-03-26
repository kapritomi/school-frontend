type ErrorModalProps = {
  text: string;
  setModalErrorMessage: (value: string | null) => void;
};
export const ErrorModal = ({ text, setModalErrorMessage }: ErrorModalProps) => {
  return (
    <div className="absolute left-1/2 top-4 -translate-x-1/2 bg-alert bg-opacity-20 font-bold min-w-[400px] shadow-xl  text-alert  border-[1px] rounded-[8px]">
      <div className="relative w-full h-full  flex items-center justify-center px-8 py-5 rounded-[8px] ">
        <button
          onClick={() => setModalErrorMessage(null)}
          className="absolute top-1 right-1"
        >
          ❌
        </button>
        <p>{text}</p>
      </div>
    </div>
  );
};
