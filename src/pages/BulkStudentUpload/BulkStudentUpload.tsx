import { ClipLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import { useBulkUpload } from './UseBulkUpload';

export const BulkStudentUpload = () => {
  const { classroomId } = useParams();
  const { setFile, handleBulkUpload, isFetching, message } = useBulkUpload();
  return (
    <div className="px-[41px] w-screen h-screen relative">
      {isFetching && (
        <div className="w-full h-full z-20 flex right-0 items-center justify-center absolute  bg-zinc-400 bg-opacity-40 ">
          <ClipLoader size={90} color="#2E6544"></ClipLoader>
        </div>
      )}
      {message && (
        <div>
          <p>{message.message}</p>
        </div>
      )}
      <form onSubmit={(e) => handleBulkUpload(e, classroomId)}>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <button type="submit">Feltöltés</button>
      </form>
    </div>
  );
};
