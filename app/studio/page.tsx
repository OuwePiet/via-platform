"use client";

import { ChangeEvent, PointerEvent, useEffect, useRef, useState } from "react";
import styles from "./studio.module.css";

type Point = { x: number; y: number };

export default function StudioPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<Point | null>(null);
  const [brushSize, setBrushSize] = useState(6);
  const [brushColor, setBrushColor] = useState("#4ADE80");
  const [status, setStatus] = useState("Ready — local browser editing only");

  const getCanvas = () => canvasRef.current;
  const getContext = () => getCanvas()?.getContext("2d") ?? null;

  function clearCanvas() {
    const c = getCanvas();
    const ctx = getContext();
    if (!c || !ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    setStatus("Canvas cleared");
  }

  function fitImage(img: HTMLImageElement) {
    const c = getCanvas();
    const ctx = getContext();
    if (!c || !ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    const scale = Math.min(c.width / img.width, c.height / img.height, 1);
    const width = img.width * scale;
    const height = img.height * scale;
    ctx.drawImage(img, (c.width - width) / 2, (c.height - height) / 2, width, height);
  }

  function onUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setStatus("Choose an image file");
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      fitImage(img);
      URL.revokeObjectURL(url);
      setStatus(`${file.name} loaded locally`);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setStatus("Image could not be loaded");
    };
    img.src = url;
    event.target.value = "";
  }

  function point(event: PointerEvent<HTMLCanvasElement>): Point {
    const c = event.currentTarget;
    const rect = c.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * c.width,
      y: ((event.clientY - rect.top) / rect.height) * c.height,
    };
  }

  function startDraw(event: PointerEvent<HTMLCanvasElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    drawingRef.current = true;
    lastPointRef.current = point(event);
  }

  function draw(event: PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current || !lastPointRef.current) return;
    const ctx = getContext();
    if (!ctx) return;
    const next = point(event);
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(next.x, next.y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    lastPointRef.current = next;
  }

  function stopDraw() {
    drawingRef.current = false;
    lastPointRef.current = null;
  }

  function exportPng() {
    const c = getCanvas();
    if (!c) return;
    const link = document.createElement("a");
    link.download = `via-studio-${Date.now()}.png`;
    link.href = c.toDataURL("image/png");
    link.click();
    setStatus("PNG exported locally — nothing was uploaded");
  }

  useEffect(() => {
    const c = getCanvas();
    if (!c) return;
    c.width = 1200;
    c.height = 1200;
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>VIA · viadeso.online</p>
          <h1>Studio</h1>
          <p className={styles.intro}>Free local image workspace. No mint, wallet or paid service is triggered here.</p>
        </div>
        <a className={styles.back} href="/">Back to VIA</a>
      </header>

      <section className={styles.workspace} aria-label="VIA Studio proof of concept">
        <aside className={styles.tools}>
          <label className={styles.upload}>
            Open image
            <input type="file" accept="image/png,image/jpeg,image/webp" onChange={onUpload} />
          </label>

          <label>
            Brush size <strong>{brushSize}px</strong>
            <input type="range" min="2" max="40" value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} />
          </label>

          <label>
            Brush color
            <input className={styles.color} type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} />
          </label>

          <button type="button" onClick={clearCanvas}>Clear canvas</button>
          <button className={styles.primary} type="button" onClick={exportPng}>Export PNG</button>

          <div className={styles.note}>
            <strong>Proof of concept</strong>
            <span>Draw with finger, Apple Pencil/stylus, mouse or trackpad.</span>
          </div>
        </aside>

        <div className={styles.canvasShell}>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            onPointerDown={startDraw}
            onPointerMove={draw}
            onPointerUp={stopDraw}
            onPointerCancel={stopDraw}
            onPointerLeave={stopDraw}
            aria-label="Image editing canvas"
          />
          <p className={styles.status} role="status" aria-live="polite">{status}</p>
        </div>
      </section>
    </main>
  );
}
