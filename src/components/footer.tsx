export default function Footer() {
  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-10 pointer-events-none">
      <div className="flex items-center gap-2 text-[10px] text-zinc-700 border border-zinc-800/60 rounded-full px-3 py-1 bg-zinc-950/80 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        daily.dev — new tab
      </div>
    </div>
  );
}
