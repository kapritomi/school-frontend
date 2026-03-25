import { use, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStudents } from '../../api/getStudents';
import { StudentCard } from '../../components/StudentCard';
import { EditIcon } from '../../assets/Icons/EditIcon';
import { BinIcon } from '../../assets/Icons/BinIcon';
import { useClassEdit, type Student } from './useClassEdit';

export const ClassEdit = () => {
  const { classroomId } = useParams();

  const {
    handleSaveStudent,
    handleInputChange,
    setClassroomData,
    setEditView,
    classroomData,
    studentName,
    errorMessage,
    editView,
    editingId,
    handleStudentEdit,
  } = useClassEdit();
  useEffect(() => {
    if (classroomId) {
      getStudents(Number(classroomId))
        .then((res) =>
          setClassroomData({
            name: res.classroom_name,
            students: res.students,
          }),
        )
        .catch((e) => console.log(e));
    }
  }, []);

  return (
    <div className="px-[41px] ">
      {classroomData && classroomData.name && (
        <div className="flex flex-col gap-[33px]">
          <p className="text-[40px] font-semibold text-primary">
            {classroomData.name}:
          </p>

          <p className="text-[26px] font-medium">Osztály szerkesztése</p>
          <div className="flex justify-between w-full">
            <div className="w-[573px] min-h-[140px] h-fit px-[21px] py-[10px] flex flex-col gap-[23px] border-lightBorder border-[1px] shadow-md rounded-[8px]">
              <label className="text-[24px]  text-secondaryFont font-medium">
                Új tanuló felvétele az osztályba:
              </label>
              <div className="flex gap-[16px]">
                <div className="flex flex-col gap-4">
                  <input
                    maxLength={30}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className={`w-[333px] ${errorMessage ? 'border-alert' : 'border-lightBorder'} p-4 outline-none focus:border-primary focus:border-[2px] h-[48px] border-[1px] rounded-[8px]`}
                    type="text"
                  />
                  <p className="text-[16px] font-semibold text-alert">
                    {errorMessage}
                  </p>
                </div>
                <button
                  disabled={!studentName || studentName.length === 0}
                  onClick={() => handleSaveStudent(Number(classroomId))}
                  className="bg-primary disabled:bg-primaryDisabled w-[108px] h-[48px] rounded-[8px] text-white text-[20px] font-semibold"
                >
                  Felvétel
                </button>
              </div>
            </div>
            <div className="h-[140px] flex flex-col justify-between">
              <button
                onClick={() => {
                  (setEditView(!editView), handleStudentEdit(null, null));
                }}
                className="w-[283px]  h-[48px] bg-primary rounded-[8px] text-white flex gap-4 items-center justify-center text-[20px] font-semibold"
              >
                Névsor szerkesztése
                <EditIcon color="white"></EditIcon>
              </button>
              <button className="w-[283px] h-[48px] bg-alert rounded-[8px] text-white flex gap-4 items-center justify-center text-[20px] font-semibold">
                Osztály törlése
                <BinIcon color="white"></BinIcon>
              </button>
            </div>
          </div>

          <div className="w-full h-[2px] bg-primary"></div>

          <div className="flex flex-wrap gap-[35px]">
            {classroomData.students.map((item: Student) => (
              <StudentCard
                editingId={editingId}
                handleStudentEdit={handleStudentEdit}
                editView={editView}
                id={item.id}
                name={item.name}
                key={item.id}
              ></StudentCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
