import { uploadMedia } from '@/api/Worksheet/mediaUpload';
import { BinIcon } from '@/assets/Icons/BinIcon';
import { useTasks } from '@/store/TasksContext';
import { useRef, useState } from 'react';

type MediaUploadButtonProps = {
  disabled: boolean;
  onUploadSuccess: (url: string) => void;
  setInputDisabled: (inputDisabled: boolean) => void;
};
export const MediaUploadButton = ({
  disabled,
  onUploadSuccess,
  setInputDisabled,
}: MediaUploadButtonProps) => {
  const { setIsLoading } = useTasks();
  const [filePath, setFilePath] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUpload = async (selectedFile: File) => {
    const formData = new FormData();
    if (selectedFile) formData.append('file', selectedFile);

    try {
      setErrorMessage(null);
      setIsLoading(true);
      const res = await uploadMedia(formData);

      setFilePath(res.url);
    //   onUploadSuccess(res.url);
        onUploadSuccess(res.path)
      setInputDisabled(true);
    } catch (e: any) {
      setErrorMessage(e.response.data.message);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } finally {
      setIsLoading(false);
    }
  };

  //handleDelete
  const handleDelete = () => {
    setInputDisabled(false);
    setFilePath(null);
    onUploadSuccess('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setErrorMessage(null);
  };
  return (
    <div className="flex flex-col gap-[15px]">
      <label htmlFor="pairQuestionImage" className="block font-medium">
        Kép
      </label>
      <div className="flex gap-4 items-center">
        <input
          ref={fileInputRef}
          id="pairQuestionImage"
          onChange={(e) => {
            const fileFromInput = e.target.files?.[0];
            if (fileFromInput) {
              handleUpload(fileFromInput);
            }
          }}
          className={` w-[360px]
                  text-sm 
                  file:cursor-pointer
                  file:mr-4
                  file:py-2
                  file:px-4
                  file:rounded-md
                  file:border-[1px]   
                  file:border-solid
                 
                  file:text-sm
                  file:bg-white
                  
                 ${errorMessage ? 'file:border-alert file:text-alert text-alert' : ' file:border-lightBorder text-gray file:text-gray'}
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  `}
          type="file"
          accept="image/*"
          disabled={disabled}
        />

        {filePath && (
          <div className="cursor-pointer" onClick={() => handleDelete()}>
            <BinIcon color="#FF575A"></BinIcon>
          </div>
        )}
      </div>
      {filePath && (
        <div className="w-[100px] h-[100px]">
          {filePath && (
            <img
              className="w-full h-full object-cover"
              src={`http://localhost:8000${filePath}`}
              alt="na"
            />
          )}
        </div>
      )}

      {errorMessage && <p className="text-[16px] text-alert">{errorMessage}</p>}
    </div>
  );
};
