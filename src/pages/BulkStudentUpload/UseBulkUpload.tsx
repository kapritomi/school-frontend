import { useEffect, useState } from 'react';
import { bulkUpload } from '../../api/bulkUpload';
import type { MessageType } from '../../types/messageType';
import { useQueryClient } from '@tanstack/react-query';

export const useBulkUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [message, setMessage] = useState<MessageType | null>(null);
  const queryClient = useQueryClient();

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
        queryClient.invalidateQueries({
          queryKey: ['classroom', clasroom_id],
        });
        console.log(response);
      } catch (e: any) {
        setMessage({
          type: 'error',
          message: e.response.data.message,
        });
        console.log(e);
      } finally {
        setIsFetching(false);
      }
    }
  };

  useEffect(() => {
    console.log(message);
  }, [message]);
  return {
    file,
    setFile,
    handleBulkUpload,
    isFetching,
    message,
    setMessage,
  };
};
