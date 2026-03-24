export default function Background() {
  return (
    <>
      {/* Grid bg */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] bg-size-[40px_40px]" />
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_40%,#09090b_100%)]" />
    </>
  );
}
