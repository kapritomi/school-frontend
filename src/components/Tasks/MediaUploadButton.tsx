import { uploadMedia } from '@/api/Worksheet/mediaUpload';
import { BinIcon } from '@/assets/Icons/BinIcon';
import { useTasks } from '@/store/TasksContext';
import { useEffect, useRef, useState } from 'react';

type MediaUploadButtonProps = {
  disabled: boolean;
  onUploadSuccess: (url: string) => void;
  setInputDisabled: (inputDisabled: boolean) => void;
  itemUrl: string | null;
};

export const MediaUploadButton = ({
  disabled,
  onUploadSuccess,
  setInputDisabled,
  itemUrl,
}: MediaUploadButtonProps) => {
  const { setIsLoading } = useTasks();
  const [filePath, setFilePath] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Az URL-ből kinyerjük a fájl nevét, amit a PHP fűzött össze (UUID--Name.ext)
  useEffect(() => {
    if (itemUrl) {
      setFilePath(`/${itemUrl}`);

      const parts = itemUrl.split('--');
      if (parts.length > 1) {
        setFileName(parts.pop() || null);
      } else {
        setFileName(itemUrl.split('/').pop() || null);
      }
    } else {
      // Ha nincs URL, reseteljük a belső state-eket is
      setFilePath(null);
      setFileName(null);
    }
  }, [itemUrl]);

  const handleUpload = async (selectedFile: File) => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    // Azonnal beállítjuk a nevet a UI-on a jó élményért
    setFileName(selectedFile.name);

    try {
      setErrorMessage(null);
      setIsLoading(true);
      const res = await uploadMedia(formData);

      setFilePath(res.url);
      onUploadSuccess(res.path);
      setInputDisabled(true);
    } catch (e: any) {
      setErrorMessage(
        e.response?.data?.message || 'Hiba történt a feltöltés során',
      );
      setFileName(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    setInputDisabled(false);
    setFilePath(null);
    setFileName(null);
    onUploadSuccess('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setErrorMessage(null);
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="block font-medium text-gray-700">Kép</label>

      <div className="flex gap-4 items-center">
        <label
          htmlFor="pairQuestionImage"
          className={`
            cursor-pointer py-2 px-4 rounded-md border border-solid text-sm font-medium transition-all
            ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'bg-white hover:bg-gray-50 active:bg-gray-100'}
            ${errorMessage ? 'border-alert text-alert' : 'border-lightBorder text-gray-600'}
          `}
        >
          {fileName ? 'Kép módosítása' : 'Kép kiválasztása'}
        </label>

        <input
          ref={fileInputRef}
          id="pairQuestionImage"
          type="file"
          accept="image/*"
          disabled={disabled}
          onChange={(e) => {
            const fileFromInput = e.target.files?.[0];
            if (fileFromInput) handleUpload(fileFromInput);
          }}
          className="hidden"
        />

        {filePath && (
          <button
            type="button"
            className="p-1 hover:bg-red-50 rounded-full transition-all"
            onClick={handleDelete}
          >
            <BinIcon color="#FF575A" />
          </button>
        )}
      </div>

      {fileName && !errorMessage && (
        <p className="text-xs text-gray-500 italic">
          Kiválasztott fájl:{' '}
          <span className="font-semibold text-gray-700">{fileName}</span>
        </p>
      )}

      {filePath && !errorMessage && (
        <div className="w-[120px] h-[120px] rounded-lg overflow-hidden  shadow-md">
          <img
            className="w-full h-full object-cover"
            src={`http://localhost:${import.meta.env.VITE_PORT}/storage${filePath}`}
            alt="Feltöltött kép előnézete"
          />
        </div>
      )}

      {errorMessage && (
        <p className="text-sm text-alert font-medium">{errorMessage}</p>
      )}
    </div>
  );
};
