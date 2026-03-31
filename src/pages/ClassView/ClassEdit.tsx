import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';

// API és Custom Hookok
import { getOneClassroom } from '../../api/getOneClassroom';
import { useClassEdit, type Student } from './useClassEdit';

// Komponensek
import { StudentCard } from '../../components/StudentCard';
import { Modal } from '../../components/Modal';
import { Navbar } from '../../components/Navbar';

// Ikonok
import { EditIcon } from '../../assets/Icons/EditIcon';
import { BinIcon } from '../../assets/Icons/BinIcon';

export const ClassEdit = () => {
  const { classroomId } = useParams();
  const navigate = useNavigate();

  const {
    data: classroom,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['classroom', classroomId],
    queryFn: () => getOneClassroom(Number(classroomId)),
    enabled: !!classroomId, 
    select: (res) => ({
      name: res.classroom_name,
      students: res.students,
      classroom_id: res.classroom_id,
    }),
    staleTime: 1000 * 60 * 5, // 5 percig nem kéri le újra, ha nem muszáj
  });

  const {
    handleSaveStudent,
    handleInputChange,
    setEditView,
    studentName,
    message,
    setMessage,
    editView,
    editingId,
    handleStudentEdit,
    handleUpdateStudent,
    handleDeleteUsers,
    handleDeleteClassroom,
    isFetching,
  } = useClassEdit();

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 font-bold">
          Hiba történt az adatok betöltésekor!
        </p>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen max-h-screen relative overflow-y-hidden">
      <Navbar />

      <div className="mt-[70px] px-[41px] w-full h-full overflow-y-scroll">
        {/* Üzenetek (Sikeres mentés / Hiba) */}
        {message && (
          <Modal
            setModalErrorMessage={setMessage}
            text={message.message}
            type={message.type}
          />
        )}

        {/* Töltés jelzése: Akkor látszik, ha nincs adat (isLoading) vagy épp frissül (isFetching) */}
        {(isLoading || isFetching) && (
          <div className="w-full h-full z-20 top-0 flex right-0 items-center justify-center absolute bg-zinc-400 bg-opacity-40">
            <ClipLoader size={90} color="#2E6544" />
          </div>
        )}

        {/* Csak akkor jelenítjük meg a tartalmat, ha megérkezett a 'classroom' adat */}
        {classroom && (
          <div className="flex flex-col gap-[33px] pb-20">
            <p className="text-[40px] font-semibold text-primary">
              {classroom.name}:
            </p>

            <p className="text-[26px] font-medium">Osztály szerkesztése</p>

            <div className="flex justify-between w-full">
              <div className="flex gap-4">
                {/* Új tanuló felvétele box */}
                <div className="w-[573px] min-h-[140px] h-fit px-[21px] py-[10px] flex flex-col gap-[23px] border-lightBorder border-[1px] shadow-md rounded-[8px]">
                  <label className="text-[24px] text-secondaryFont font-medium">
                    Új tanuló felvétele az osztályba:
                  </label>
                  <div className="flex gap-[16px]">
                    <input
                      maxLength={30}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="w-[333px] border-lightBorder p-4 outline-none focus:border-primary focus:border-[2px] h-[48px] border-[1px] rounded-[8px]"
                      type="text"
                      value={studentName || ''}
                      placeholder="Tanuló neve..."
                    />
                    <button
                      disabled={!studentName || studentName.length === 0}
                      onClick={() => handleSaveStudent(Number(classroomId))}
                      className="bg-primary disabled:bg-primaryDisabled w-[108px] h-[48px] rounded-[8px] text-white text-[20px] font-semibold transition-colors"
                    >
                      Felvétel
                    </button>
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() =>
                      navigate(`/bulkStudentUpload/${classroomId}`)
                    }
                    className="w-[283px] h-[48px] text-primary font-semibold text-[20px] rounded-[8px] hover:bg-zinc-50"
                  >
                    Tömeges adatfelvitel
                  </button>
                </div>
              </div>

              {/* Szerkesztő gombok */}
              <div className="h-[140px] items-end flex flex-col justify-between">
                <button
                  onClick={() => {
                    setEditView(!editView);
                    handleStudentEdit(null);
                  }}
                  className="w-[283px] h-[48px] bg-primary rounded-[8px] text-white flex gap-4 items-center justify-center text-[20px] font-semibold"
                >
                  Névsor szerkesztése
                  <EditIcon color="white" />
                </button>

                <button
                  onClick={() => handleDeleteClassroom(classroom.classroom_id)}
                  className="w-[283px] h-[48px] bg-alert rounded-[8px] text-white flex gap-4 items-center justify-center text-[20px] font-semibold"
                >
                  Osztály törlése
                  <BinIcon color="white" />
                </button>
              </div>
            </div>

            {/* Elválasztó vonal */}
            <div className="w-full h-[2px] bg-primary"></div>

            {/* Tanulók listája */}
            <div className="flex flex-wrap gap-[35px]">
              {classroom.students.map((item: Student) => (
                <StudentCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  handleDeleteStudents={(studentId) =>
                    handleDeleteUsers(studentId, classroom.classroom_id)
                  }
                  handleUpdateStudent={(studentId, newName) =>
                    handleUpdateStudent(
                      studentId,
                      newName,
                      classroom.classroom_id,
                    )
                  }
                  editingId={editingId}
                  handleStudentEdit={handleStudentEdit}
                  editView={editView}
                />
              ))}
              {classroom.students.length === 0 && (
                <p className="text-gray-400 italic">
                  Még nincsenek tanulók ebben az osztályban.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
