import { useState } from 'react';
import { BinIcon } from '../assets/Icons/BinIcon';
import { EditIcon } from '../assets/Icons/EditIcon';

type StudentCardProps = {
  id: number;
  name: string;
  editView: boolean;
  editingId: number | null;
  handleStudentEdit: (id: number) => void;
  handleDeleteStudents: (student_id: number) => void;
  handleUpdateStudent: (student_id: number, name: string) => void;
};
export const StudentCard = ({
  id,
  name,
  editView,
  editingId,
  handleStudentEdit,
  handleUpdateStudent,
  handleDeleteStudents,
}: StudentCardProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newStudentName, setNewStudentName] = useState<string>(name);
  return (
    <div
      className={`flex items-center h-[64px] w-[334px] ${editView && editingId === id ? 'border-primary' : 'border-lightBorder'}  border-[1px] px-[17px] py-[11px] justify-between rounded-[5px] shadow-md`}
      key={id}
    >
      {isEditing && editingId === id ? (
        <input
          className="text-[24px]  p-0  border-none outline-none  w-2/3 max-w-2/3 truncate font-medium text-darkGrayText"
          type="text"
          autoFocus
          maxLength={30}
          onChange={(e) => setNewStudentName(e.target.value)}
          defaultValue={name}
        />
      ) : (
        <p className="text-[24px] w-2/3 max-w-2/3 truncate font-medium text-darkGrayText">
          {name}
        </p>
      )}
      {editView && (
        <div className="flex items-center justify-center gap-2">
          {editingId === id &&
          name !== newStudentName &&
          newStudentName.length > 0 ? (
            <button
              onClick={() => {
                (handleUpdateStudent(id, newStudentName),
                  setIsEditing(!isEditing));
              }}
            >
              ✔️
            </button>
          ) : (
            <button
              onClick={() => {
                (handleStudentEdit(id), setIsEditing(!isEditing));
              }}
            >
              <EditIcon color="#2E6544"></EditIcon>
            </button>
          )}

          <button onClick={() => handleDeleteStudents(id)}>
            <BinIcon color="#FF575A"></BinIcon>
          </button>
        </div>
      )}
    </div>
  );
};
