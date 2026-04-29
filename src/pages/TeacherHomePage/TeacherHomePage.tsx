import type { ClassType } from '../../types/class';
import { ClassComponent } from '../../components/ClassComponent';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Modal } from '../../components/Modal';
import { useTeacherHomePage } from './useTeacherHomePage';
import { Worksheets } from '../Worksheets/Worksheets';

export const TeacherHomePage = () => {
  const navigate = useNavigate();
  const {
    cancelCreate,
    classRoomName,
    classrooms,
    confirmCreate,
    error,
    isLoading,
    isModalOpen,
    message,
    setClassRoomName,
    setIsModalOpen,
    setMessage,
    mutation,
  } = useTeacherHomePage();

  return (
    <div className="relative w-screen h-screen max-h-screen overflow-y-hidden">
      <Navbar></Navbar>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onMouseDown={cancelCreate}
        >
          <div className="absolute inset-0 bg-black/40" />

          <div
            className="relative z-10 w-[820px] rounded-xl bg-white p-4 shadow-lg"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="text-lg font-medium mb-3">
              Új osztály létrehozása
            </div>
            {/* innen majd az input classát át kell tenni a sidebarba is */}
            <input
              className="w-full  focus:border-primary focus:border-[2px] h-[48px] border-lightBorder border-[1px] rounded-lg px-3 py-2 outline-none"
              placeholder="Osztály neve"
              value={classRoomName ? classRoomName : ''}
              onChange={(e) => setClassRoomName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') confirmCreate();
                if (e.key === 'Escape') cancelCreate();
              }}
              autoFocus
            />

            <div className="flex gap-2 mt-2"></div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                className="px-3 py-2 rounded-lg border border-lightBorder"
                onClick={cancelCreate}
              >
                Mégse
              </button>
              <button
                type="button"
                className="px-3 py-2 rounded-lg disabled:bg-primaryDisabled cursor-pointer  disabled:cursor-auto bg-primary text-white font-semibold"
                onClick={confirmCreate}
                disabled={!classRoomName}
              >
                Létrehozás
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="px-[41px] mt-[70px] flex flex-col gap-16 overflow-y-auto w-full h-full">
        {message && (
          <Modal
            setModalErrorMessage={setMessage}
            text={message.message}
            type={message.type}
          />
        )}
        <div>
          <Worksheets></Worksheets>
        </div>

        <div>
          <p className="text-primary text-[40px] font-semibold mb-[41px]">
            Osztályok
          </p>
          {error && (
            <p className="text-[16px] text-alert">
              Hiba az osztályok betöltése közben.
            </p>
          )}
          {isLoading ||
            (mutation.isPending && (
              <ClipLoader size={90} color="#2E6544"></ClipLoader>
            ))}

          {classrooms && (
            <div className="flex flex-wrap gap-[56px]">
              {classrooms.map((item: ClassType) => (
                <ClassComponent
                  onClick={() => navigate(`/editClass/${item.id}`)}
                  id={item.id}
                  name={item.name}
                  key={item.id}
                ></ClassComponent>
              ))}
              <div
                onClick={() => setIsModalOpen(true)}
                className="w-[164px] cursor-pointer text-white items-center justify-center shadow-md h-[157px] flex bg-primary rounded-[12px]"
              >
                <p className="text-[40px] font-bold">+</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
