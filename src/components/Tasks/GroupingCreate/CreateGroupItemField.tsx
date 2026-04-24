import { BinIcon } from '@/assets/Icons/BinIcon';
import { EditIcon } from '@/assets/Icons/EditIcon';
import { MediaUploadButton } from '../MediaUploadButton';
import type { Group } from '@/types/tasks';
import { AddButton } from '../AddButton';
type CreateGroupItemFieldProps = {
  selectedGroup: Group;
  itemName: string | null;
  itemNameInputDisabled: boolean;
  updateGroupName: (selectedGroupIndex: number, value: string) => void;
  setItemName: (itemName: string | null) => void;
  addItem: (index: number) => void;
  setNewItemName: (name: string) => void;
  addItemImage: (url: string, selectedGroupIndex: number) => void;
  editingId: null | number;
  isEditing: boolean;
  setItemNameInputDisabled: (disabled: boolean) => void;
  updateItem: (selectedGroupIndex: number, ii: number) => void;
  newItemName: string | null;
  setIsEditing: (isEditing: boolean) => void;
  setEditingId: (editingID: number | null) => void;
  handleEdit: (ii: number, itemName: string) => void;
  handleDelete: (selectedGroupIndex: number, ii: number) => void;
  taskId: string;
};
export const CreateGroupItemField = ({
  addItem,
  addItemImage,
  editingId,
  isEditing,
  itemName,
  itemNameInputDisabled,
  selectedGroup,
  setItemName,
  setNewItemName,
  updateGroupName,
  newItemName,
  setItemNameInputDisabled,
  updateItem,
  setIsEditing,
  setEditingId,
  handleEdit,
  handleDelete,
  taskId,
}: CreateGroupItemFieldProps) => {
  return (
    <div
      id={`addGroupElements.${taskId}`}
      className="flex flex-col gap-LabelDescriptionInputSpace"
    >
      <div className="flex flex-col gap-LabelDescriptionInputSpace">
        <label
          className="text-[24px] font-medium text-gray"
          htmlFor={`grouping${selectedGroup.index}name`}
        >
          Csoport neve
        </label>
        <input
          maxLength={30}
          className="border-lightBorder shadow-md w-1/2 p-4 outline-none text-gray  h-[40px] border-[1px] rounded-[8px] focus:border-primary focus:ring-1 focus:ring-primary"
          name={`grouping${selectedGroup.index}name`}
          defaultValue={selectedGroup.name}
          onChange={(e) => updateGroupName(selectedGroup.index, e.target.value)}
          placeholder="Csoport neve"
        />
      </div>
      <div className="flex flex-col gap-[30px] ">
        <div className="flex flex-col gap-[10px]">
          <p className="block text-primary text-[30px] font-semibold">
            Csoportok
          </p>
          <p className="text-[15px] text-gray font-medium">
            Adj hozzá szöveget a csoport eleméhez, vagy tölts fel egy képet –
            egyszerre csak az egyik választható.
          </p>
        </div>
        <div className="w-full flex">
          <div className="w-1/2 flex flex-col gap-LabelDescriptionInputSpace">
            <div className="flex flex-col gap-[10px]">
              <label
                className="text-[24px] font-medium text-gray"
                htmlFor={`newGroupItem${selectedGroup.index}`}
              >
                Új elem
              </label>
              <input
                className="border-lightBorder shadow-md w-1/2 p-4 outline-none text-gray  h-[40px] border-[1px] rounded-[8px] focus:border-primary focus:ring-1 focus:ring-primary"
                name={`newGroupItem${selectedGroup.index}`}
                type="text"
                value={itemName ? itemName : ''}
                onChange={(e) => setItemName(e.target.value)}
                disabled={itemNameInputDisabled}
              />
            </div>

            <MediaUploadButton
              itemUrl={null}
              setInputDisabled={setItemNameInputDisabled}
              disabled={itemName ? true : false}
              onUploadSuccess={(url) => addItemImage(url, selectedGroup.index)}
            ></MediaUploadButton>

            <AddButton
              label="Elem hozzáadása"
              onClick={() => addItem(selectedGroup.index)}
            ></AddButton>
          </div>
          <div className="w-1/2 border-l-[1px] py- pl-[35px] border-gray">
            <div className="h-[363px] py-4 px-4 bg-white flex gap-2 flex-wrap border-[1px] border-lightBorder rounded-[6px]">
              {selectedGroup.items.map((item, ii) =>
                item.image !== null ? (
                  <div
                    className={`flex items-center relative h-[100px] w-[100px] ${editingId === ii ? 'border-primary' : 'border-lightBorder'}  border-[1px] px-2 justify-between rounded-[5px] shadow-md`}
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={`http://localhost:${import.meta.env.VITE_PORT}/storage/${item.image}`}
                      alt="Feltöltött kép előnézete"
                    />
                    <div className="flex absolute right-0 top-2 items-center justify-center gap-2">
                      <button
                        className="hover:opacity-80 rounded-full transition-opacity hover:bg-red-50"
                        onClick={() => handleDelete(selectedGroup.index, ii)}
                      >
                        <BinIcon color="#FF575A"></BinIcon>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`flex items-center h-[48px] w-[164px] ${editingId === ii ? 'border-primary' : 'border-lightBorder'}  border-[1px] px-2 justify-between rounded-[5px] shadow-md`}
                    key={ii}
                  >
                    {isEditing && editingId === ii ? (
                      <input
                        className="border-none text-[18px] shadow-md w-full h-full  outline-none text-gray "
                        maxLength={80}
                        autoFocus
                        key={ii}
                        defaultValue={item.name ?? ''}
                        onChange={(e) => setNewItemName(e.target.value)}
                        placeholder="Elem neve"
                      />
                    ) : (
                      <p className="text-[18px] w-2/3 max-w-2/3 truncate font-medium text-gray">
                        {item.name}
                      </p>
                    )}

                    <div className="flex items-center justify-center gap-2">
                      {editingId === ii && newItemName !== item.name ? (
                        <button
                          onClick={() => {
                            updateItem(selectedGroup.index, ii);
                            setIsEditing(!isEditing);
                            setEditingId(null);
                          }}
                        >
                          ✔️
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            (handleEdit(ii, item.name ?? ''),
                              setIsEditing(!isEditing));
                          }}
                        >
                          <EditIcon color="#2E6544"></EditIcon>
                        </button>
                      )}

                      <button
                        className="hover:opacity-80 rounded-full p-1 transition-opacity hover:bg-red-50"
                        onClick={() => handleDelete(selectedGroup.index, ii)}
                      >
                        <BinIcon color="#FF575A"></BinIcon>
                      </button>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
