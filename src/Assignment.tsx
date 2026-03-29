import { useEffect, useMemo, useRef, useState } from 'react';
import type { TaskJson } from './types/tasks';

type XY = { x: number; y: number };
type Point = {
  index: number;
  xy: XY;
  answers: string[];
};
function Assignment({ task }: { task: TaskJson }) {
  if (!task.assignment) return null;

  const frameW = 1800;
  const frameH = 900;
  const src = task.assignment.image ?? '/image.jpg';

  const imgRef = useRef<HTMLImageElement>(null);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);

  // modal state
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Point | null>(null);
  // crop preview canvas
  const cropCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const onLoad = () =>
      setNatural({
        w: img.naturalWidth,
        h: img.naturalHeight,
      });

    if (img.complete) onLoad();
    else img.addEventListener('load', onLoad);

    return () => img.removeEventListener('load', onLoad);
  }, [src]);

  const fit = useMemo(() => {
    if (!natural) return null;
    return containFit(frameW, frameH, natural.w, natural.h);
  }, [frameW, frameH, natural]);

  const points = useMemo(() => {
    if (!task.assignment) return [];

    return task.assignment.coordinatesAndAnswers
      .map((c, index) => {
        const xy = parseCoordinate(c.coordinate);
        return xy
          ? { index, xy, answers: c.answers.map((a) => a.answer) }
          : null;
      })
      .filter(
        (p): p is { index: number; xy: XY; answers: string[] } => p !== null,
      );
  }, [task.assignment]);
  // amikor kiválasztasz egy pontot, rajzoljuk ki a környezetét a canvasra
  useEffect(() => {
    if (!open || !selected || !natural) return;

    const img = imgRef.current;
    const canvas = cropCanvasRef.current;
    if (!img || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // preview méret (képernyőn)
    const outW = 320;
    const outH = 200;
    canvas.width = outW;
    canvas.height = outH;

    // crop méret az eredeti képen (natural px-ben)
    // ezt állíthatod: minél nagyobb, annál "távolabbi" környezet látszik
    const cropW = 600;
    const cropH = 375;

    const sx = clamp(selected.xy.x - cropW / 2, 0, natural.w - cropW);
    const sy = clamp(selected.xy.y - cropH / 2, 0, natural.h - cropH);

    ctx.clearRect(0, 0, outW, outH);
    ctx.imageSmoothingEnabled = true;

    ctx.drawImage(img, sx, sy, cropW, cropH, 0, 0, outW, outH);

    // jelöld a közepét (ahol a kattintott pont van)
    ctx.beginPath();
    ctx.arc(outW / 2, outH / 2, 6, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(255,0,0,0.25)';
    ctx.stroke();
  }, [open, selected, natural]);

  return (
    <div className="flex justify-center">
      <div
        style={{
          width: frameW,
          height: frameH,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          ref={imgRef}
          src={src}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />

        {fit &&
          natural &&
          points.map(({ index, xy, answers }) => {
            // natural px -> UV
            const u = clamp01(xy.x / natural.w);
            const v = clamp01(xy.y / natural.h);

            // UV -> képernyő (contain)
            const x = fit.offsetX + u * fit.drawW;
            const y = fit.offsetY + v * fit.drawH;

            return (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected({ index, xy, answers });
                  setOpen(true);
                }}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  width: 16,
                  height: 16,
                  borderRadius: 999,
                  background: 'red',
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  boxShadow: '0 0 0 4px rgba(255,0,0,0.25)',
                }}
              />
            );
          })}

        {open && (
          <div
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: 520,
                maxWidth: '90vw',
                background: 'white',
                borderRadius: 12,
                padding: 16,
                boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    padding: '6px 10px',
                    cursor: 'pointer',
                  }}
                >
                  Bezár
                </button>
              </div>

              {/* ✅ kivágott környezet preview */}
              <div style={{ marginTop: 12 }}>
                <canvas
                  ref={cropCanvasRef}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 10,
                    border: '1px solid #eee',
                    display: 'block',
                  }}
                />
              </div>

              {/* ✅ answers lista */}
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 12, marginBottom: 6, opacity: 0.7 }}>
                  Válaszlehetőségek
                </div>

                <div style={{ display: 'grid', gap: 8 }}>
                  {selected?.answers.map((a, i) => (
                    <button
                      key={i}
                      onClick={() => alert(`Kiválasztva: ${a}`)}
                      style={{
                        textAlign: 'left',
                        border: '1px solid #ddd',
                        borderRadius: 10,
                        padding: '10px 12px',
                        cursor: 'pointer',
                        background: 'white',
                      }}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function parseCoordinate(s: string): XY | null {
  const parts = s.split(',').map((p) => p.trim());
  if (parts.length !== 2) return null;

  const x = Number(parts[0]);
  const y = Number(parts[1]);

  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  return { x, y };
}

function containFit(
  frameW: number,
  frameH: number,
  imgW: number,
  imgH: number,
) {
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

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export default Assignment;
