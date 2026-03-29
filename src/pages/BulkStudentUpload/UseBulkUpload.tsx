import { useState } from 'react';
import { bulkUpload } from '../../api/bulkUpload';
import type { MessageType } from '../../types/messageType';

export const useBulkUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [message, setMessage] = useState<MessageType | null>(null);

  const handleBulkUpload = async (
    e: React.FormEvent,
    clasroom_id: string | undefined,
  ) => {
    e.preventDefault();
    if (file && clasroom_id) {
      setIsFetching(true);
      try {
        const response = await bulkUpload(file, clasroom_id);
        setMessage({
          type: 'success',
          message: response.message,
        });
        console.log(response);
      } catch (e: any) {
        setMessage({
          type: 'success',
          message: e.response.data.message,
        });
      } finally {
        setIsFetching(false);
      }
    }
  };
  return {
    file,
    setFile,
    handleBulkUpload,
    isFetching,
    message,
  };
};
