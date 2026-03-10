import { useEffect, useMemo, useRef, useState } from "react";
import type { CoordinateAndAnswers } from "../types/tasks";
import { useTasks } from "../store/useTasks";
import { DeleteIcon } from "../icons/Delete";


type XY = { x: number; y: number };
type CoordItem = { id: number; coordinate: string; answer: string };



export default function AssignmentCreate() {
  const { activeTask, updateTask } = useTasks();
   if (!activeTask) return null;

  const task = activeTask;
  const onChange = updateTask;
  const frameW = 700;
  const frameH = 500;
  const src = "/image.jpg";
  const MAX_COORDS = 10;

  const imgRef = useRef<HTMLImageElement>(null);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [answerDraft, setAnswerDraft] = useState("");

  const assignment = task.assignment ?? { image: "", coordinatesAndAnswers: [] };

  const coords: CoordItem[] = useMemo(() => {
    return assignment.coordinatesAndAnswers.map((c, idx) => ({
      id: idx + 1,
      coordinate: c.coordinate,
      answer: c.answers?.[0]?.answer ?? "",
    }));
  }, [assignment.coordinatesAndAnswers]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const onLoad = () =>
      setNatural({
        w: img.naturalWidth,
        h: img.naturalHeight,
      });

    if (img.complete) onLoad();
    else img.addEventListener("load", onLoad);

    return () => img.removeEventListener("load", onLoad);
  }, [src]);

  const fit = useMemo(() => {
    if (!natural) return null;
    return containFit(frameW, frameH, natural.w, natural.h);
  }, [frameW, frameH, natural]);

  const points = useMemo(() => {
    if (!natural) return [];
    return coords
      .map((c) => ({ id: c.id, xy: parseCoordinate(c.coordinate) }))
      .filter((p): p is { id: number; xy: XY } => p.xy !== null);
  }, [coords, natural]);

  const startAdd = () => {
    if (coords.length >= MAX_COORDS) {
      alert("Maximum 10 koordináta adható meg.");
      return;
    }
    setIsAdding(true);
    setAnswerDraft("");
  };

  const cancelAdd = () => {
    setIsAdding(false);
    setAnswerDraft("");
  };

  const onPick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!fit || !natural) return;
    if (!isAdding) return;

    const ans = answerDraft.trim();
    if (!ans) {
      alert("Add meg a megfejtést, mielőtt a képre kattintasz.");
      return;
    }

    if (coords.length >= MAX_COORDS) {
      alert("Maximum 10 koordináta adható meg.");
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const insideX = clickX - fit.offsetX;
    const insideY = clickY - fit.offsetY;

    if (insideX < 0 || insideY < 0 || insideX > fit.drawW || insideY > fit.drawH) return;

    const u = insideX / fit.drawW;
    const v = insideY / fit.drawH;

    const nx = Math.round(u * natural.w);
    const ny = Math.round(v * natural.h);

    const nextEntry: CoordinateAndAnswers = {
      coordinate: `${nx},${ny}`,
      answers: [{ answer: ans, isCorrect: true }],
    };

    onChange({
      ...task,
      assignment: {
        ...assignment,
        image: assignment.image || src,
        coordinatesAndAnswers: [...assignment.coordinatesAndAnswers, nextEntry],
      },
    });

    setIsAdding(false);
    setAnswerDraft("");
  };

  const removeById = (id: number) => {
    const index = id - 1;
    const nextCoords = assignment.coordinatesAndAnswers.filter((_, i) => i !== index);

    onChange({
      ...task,
      assignment: {
        ...assignment,
        coordinatesAndAnswers: nextCoords,
      },
    });
  };

  const clearAll = () => {
    onChange({
      ...task,
      assignment: { ...assignment, coordinatesAndAnswers: [] },
    });
    setIsAdding(false);
    setAnswerDraft("");
  };

  return (
    <div>
      <form className="mb-4">
        <section className="space-y-4 mt-4">
          <label htmlFor="title" className="block text-primary text-[30px] font-semibold">
            A feladat címe:
          </label>
          <input
            type="text"
            id="title"
            value={task.task_title}
            onChange={(e) => onChange({ ...task, task_title: e.target.value })}
            className="block w-full rounded-[6px] p-2 border-[1px] border-[#818181] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
          />
        </section>

        <section className="mt-8">
          <label htmlFor="description" className="block text-primary text-[30px] font-semibold">
            Feladatleírás:
          </label>
          <p className="text-[#818181] mt-4 mb-2 text-[15px]">
            Adja meg a feladat leírását. Ez a feladat índításakor fog megjelenni. A leírás megadása nem
            kötelező, üresen hagyhatja a mezőt.
          </p>
          <textarea
            id="description"
            value={task.task_description}
            onChange={(e) => onChange({ ...task, task_description: e.target.value })}
            className="block w-full rounded-[6px] p-2 border-[1px] border-[#818181] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
          />
        </section>
      </form>

      <h1 className="text-primary text-[30px] font-semibold">Háttérkép:</h1>

      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div>
          <div
            onClick={onPick}
            style={{
              width: frameW,
              height: frameH,
              position: "relative",
              overflow: "hidden",
              cursor: isAdding ? "crosshair" : "default",
              userSelect: "none",
            }}
          >
            <img
              ref={imgRef}
              src={assignment.image || src}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
                pointerEvents: "none",
              }}
            />

            {fit &&
              natural &&
              points.map(({ id, xy }) => {
                const u = clamp01(xy.x / natural.w);
                const v = clamp01(xy.y / natural.h);

                const x = fit.offsetX + u * fit.drawW;
                const y = fit.offsetY + v * fit.drawH;

                return (
                  <div key={id}>
                    <div
                      className="absolute w-[14px] h-[14px] rounded-full bg-red-600 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      key={id}
                      style={{
                        left: x,
                        top: y,
                        boxShadow: "0 0 0 4px rgba(255,0,0,0.25)",
                      }}
                    />
                    <div 
                      className="text-delete absolute font-bold text-[20px]"
                      key={id+1} 
                      style={{
                        left: x-6,
                        top: y-34, 
                      }}
                    >
                      {id}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="w-full">
          {/* ---- Jelöléseid ---- */}
          <div className="flex flex-wrap ">
            <div className="w-full text-primary text-[30px] font-semibold">Jelöléseid:</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>
                {isAdding
                  ? "Add meg a megfejtést, majd kattints a képre a pont felviteléhez."
                  : "Kattintás csak akkor vesz fel pontot, ha előbb rányomsz az „Új koordináta hozzáadása” gombra."}
              </div>
            <div className="flex flex-wrap gap-2 w-full mb-5">
              <div className="flex w-full gap-2">
                {!isAdding && (<button
                    type="button"
                    onClick={startAdd}
                    disabled={isAdding || coords.length >= MAX_COORDS}
                    className="mt-8 rounded-[6px] bg-primary text-white font-semibold text-[18px]"
                    style={{
                      padding: "6px 10px",
                      cursor: isAdding ? "not-allowed" : "pointer",
                      opacity: isAdding ? 0.6 : 1,
                    }}
                  >
                    + Új pont felvétele
                  </button>)}
                
                {isAdding && (
                  <div className="mt-8 flex gap-2">
                    <input
                      value={answerDraft}
                      onChange={(e) => setAnswerDraft(e.target.value)}
                      placeholder="megfejtés"
                      className="px-4 py-2 rounded-[8px]"
                    />
                    <button
                      type="button"
                      onClick={cancelAdd}
                      className="p-2 bg-white rounded-[8px]"
                    >
                      Mégse
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* ---- Új pont felvétele gomb alatti rész ---- */}
          <div className="w-full grid gap-4 mt-4" >
            {coords.length === 0 && <div className="opacity-60 text-[14px]">Még nincs felvett pont.</div>}
            <div className="flex justify-between">
            {coords.length > 0 && <div className="w-full p-2" >{coords.length} / {MAX_COORDS}</div>}
            {coords.length > 0 ? (
                <button
                  type="button"
                  onClick={clearAll}
                  className="flex gap-2 text-end w-[240px] text-delete font-semibold cursor-pointer p-2"
                >
                  <DeleteIcon className="w-6 h-6 text-delete"/>
                  Összes törlése
                </button>
              ) : null}
              </div>
            {coords.map((c) => (
              <div
                key={c.id}
                className="flex justify-between gap-4 items-center border-[1px] border-lightBorder rounded-[8px] p-4"
              >
                <div >
                  <div>
                    {c.id}. megfejtés: {c.answer}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeById(c.id)}
                  className="flex gap-2 cursor-pointer text-delete font-semibold"
                >
                  <DeleteIcon className="w-6 h-6 text-delete "/>
                  Törlés
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function parseCoordinate(s: string): XY | null {
  const parts = s.split(",").map((p) => p.trim());
  if (parts.length !== 2) return null;

  const x = Number(parts[0]);
  const y = Number(parts[1]);

  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  return { x, y };
}

function containFit(frameW: number, frameH: number, imgW: number, imgH: number) {
  const scale = Math.min(frameW / imgW, frameH / imgH);
  const drawW = imgW * scale;
  const drawH = imgH * scale;
  const offsetX = (frameW - drawW) / 2;
  const offsetY = (frameH - drawH) / 2;
  return { drawW, drawH, offsetX, offsetY };
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}