import { useEffect } from 'react';
import type { MessageType } from '../types/messageType';

type ErrorModalProps = {
  text: string;
  setModalErrorMessage: (value: MessageType | null) => void;
  type: 'success' | 'error';
};
export const Modal = ({
  text,
  setModalErrorMessage,
  type,
}: ErrorModalProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setModalErrorMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  if (type === 'error')
    return (
      <div className="absolute left-1/2 top-4  -translate-x-1/2 bg-alert  font-bold min-w-[400px] shadow-xl  text-white rounded-[6px]">
        <div className="relative w-full h-full  flex items-center justify-center px-8 py-5  ">
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
  return (
    <div className="absolute left-1/2 top-4 -translate-x-1/2 bg-secondary text-white font-bold min-w-[400px] shadow-xl  rounded-[6px]">
      <div className="relative w-full h-full  flex items-center justify-center px-8 py-5 ">
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
