import { useTasksStore } from "../lib/store";

export default function Home() {
  const { setView } = useTasksStore();
  return (
    <div className="relative z-10 w-full max-w-xl mt-10 flex flex-col gap-3">
      <p className="text-zinc-500 text-xs tracking-widest uppercase mb-2 text-center">
        What are you working on today?
      </p>
      <button
        onClick={() => setView("select-box")}
        className="group flex items-center gap-4 p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-900/80 transition-all duration-200"
      >
        <div className="w-9 h-9 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg group-hover:bg-emerald-500/20 transition-colors">
          ▦
        </div>
        <div className="text-left">
          <div className="text-sm font-semibold text-zinc-200">
            Load a Task Box
          </div>
          <div className="text-xs text-zinc-500">
            Pick from your saved templates
          </div>
        </div>
        <span className="ml-auto text-zinc-600 group-hover:text-zinc-400 transition-colors">
          →
        </span>
      </button>

      <button
        onClick={() => setView("new-box")}
        className="group flex items-center gap-4 p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/80 transition-all duration-200"
      >
        <div className="w-9 h-9 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 text-lg group-hover:bg-zinc-700 transition-colors">
          +
        </div>
        <div className="text-left">
          <div className="text-sm font-semibold text-zinc-200">
            Create New Box
          </div>
          <div className="text-xs text-zinc-500">
            Define tasks and optionally save as template
          </div>
        </div>
        <span className="ml-auto text-zinc-600 group-hover:text-zinc-400 transition-colors">
          →
        </span>
      </button>
    </div>
  );
}
