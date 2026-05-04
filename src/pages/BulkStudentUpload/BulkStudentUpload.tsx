import { ClipLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import { useBulkUpload } from './UseBulkUpload';
import table from '../../assets/table.png';
import { Modal } from '../../components/Modal';
import { Navbar } from '../../components/Navbar';
import React from 'react';
export const BulkStudentUpload = () => {
  const { classroomId } = useParams();
  const { setFile, handleBulkUpload, isFetching, message, setMessage } =
    useBulkUpload();
  const rules = [
    {
      id: 1,
      label: 'Maximum létszám',
      desc: '30 felhasználó (A fejlécen felül max. 30 sor).',
    },
    {
      id: 2,
      label: 'Adat típusa',
      desc: 'Szöveg (név vagy becenév).',
    },
    {
      id: 3,
      label: 'Üres sorok',
      desc: 'Ne hagyj üres sorokat a nevek között, mert a rendszer azt hiheti, vége a listának.',
    },
    {
      id: 4,
      label: 'Duplikáció',
      desc: 'Ügyelj rá, hogy egy név csak egyszer szerepeljen a listában.',
    },
  ];
  return (
    <div className="w-screen h-screen max-h-screen relative overflow-y-hidden">
      <Navbar></Navbar>
      <div className="w-full mt-[70px] h-full overflow-y-auto px-[41px]">
        {isFetching && (
          <div className="w-full h-full z-20 top-0 flex right-0 items-center justify-center absolute bg-zinc-400 bg-opacity-40">
            <ClipLoader size={90} color="#2E6544" />
          </div>
        )}
        {message && (
          <Modal
            setModalErrorMessage={setMessage}
            text={message.message}
            type={message.type}
          ></Modal>
        )}

        <div className="flex text-secondaryFont flex-col gap-[23px]">
          <p className="text-[40px] font-semibold text-primary">
            Tömeges adatfelvitel:
          </p>
          <p className="text-[28px] font-bold">
            Útmutató a Névlista Kezeléséhez
          </p>
          <p className="text-[18px] font-medium">
            Ez a leírás segít abban, hogy a táblázatod (Excel, Google Sheets
            vagy CSV) mindig kompatibilis legyen a feldolgozó rendszerrel.
          </p>
          <div className="flex flex-col gap-[10px]">
            <p className="font-bold text-[22px]">1. A táblázat szerkezete:</p>A
            lista egyetlen oszlopból álljon, ahol az első sor a meghatározó
            fejléc.
            <ol className="list-disc list-inside ml-4">
              <li>
                A1 cella (Fejléc): Kizárólag a name vagy a nev (ékezet nélkül
                vagy ékezettel: név) szót tartalmazhatja.
              </li>
              <li>
                A2 - A31 cellák: Ide kerülnek a diákok teljes nevei vagy
                becenevei, egymás alá felsorolva.
              </li>
            </ol>
          </div>
          <div className="flex flex-col gap-[10px]">
            <p className="font-bold text-[22px]">2. Korlátok és szabályok</p>
            <p>Hogy a rendszer stabilan működjön, tartsd be az alábbiakat:</p>
            <div className="max-w-4xl text-[20px] ">
              <div className="grid grid-cols-2 md:grid-cols-[300px_1fr] border-b-2 border-gray">
                <div className="font-semibold p-4 uppercase ">Megnevezés</div>
                <div className=" font-semibold p-4 uppercase">Szabály</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-[300px_1fr]">
                {rules.map((item) => (
                  <React.Fragment key={item.id}>
                    {/* Címke oszlop */}
                    <div className=" p-4 font-bold  border-b border-gray">
                      {item.label}
                    </div>
                    {/* Leírás oszlop */}
                    <div className="p-4   border-b border-gray ">
                      {item.desc}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full max-w-full">
            <img className="w-full h-full object-cover" src={table} alt="" />
          </div>

          <div className=" flex flex-col gap-[10px] min-h-[200px] ">
            <p className="text-[30px] text-primary font-semibold">
              Fájl feltöltés
            </p>

            <form
              className="flex gap-[35px]"
              onSubmit={(e) => handleBulkUpload(e, classroomId)}
            >
              <input
                className="
             file:h-[40px]
              file:w-[192px]
              file:rounded-[6px] 
              file:border-[2px]
              file:border-gray
              file:border-solid
              file:text-[20px]
              file:bg-white
              file:text-gray hover:file:text-primary
             
              cursor-pointer"
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
              <button
                className="w-[211px] h-[40px] font-bold text-white rounded-[6px] bg-primary "
                type="submit"
              >
                Feltöltés
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
