import { useTasksStore } from "../lib/store";

export default function SelectBox() {
  const { setView, boxes, setBoxes, loadBox } = useTasksStore();

  const deleteBox = (id: string) => {
    const updated = boxes.filter((b) => b.id !== id);
    setBoxes(updated);
  };
  return (
    <div className="relative z-10 w-full max-w-xl mt-8">
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => setView("home")}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
        >
          ← Back
        </button>
        <span className="text-xs text-zinc-600 tracking-widest uppercase">
          Task Boxes
        </span>
        <button
          onClick={() => setView("new-box")}
          className="text-xs text-emerald-500 hover:text-emerald-400 transition-colors"
        >
          + New
        </button>
      </div>

      {boxes.length === 0 && (
        <p className="text-center text-zinc-600 text-sm py-12">
          No boxes yet. Create one!
        </p>
      )}

      <div className="flex flex-col gap-3">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="group flex items-start gap-4 p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 transition-all duration-200 cursor-pointer"
            onClick={() => loadBox(box)}
          >
            <div className="flex-1">
              <div className="text-sm font-semibold text-zinc-200 mb-2">
                {box.name}
              </div>
              <div className="flex flex-col gap-1">
                {box.tasks.slice(0, 3).map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center gap-2 text-xs text-zinc-500"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0" />
                    {t.text}
                  </div>
                ))}
                {box.tasks.length > 3 && (
                  <span className="text-xs text-zinc-600 pl-3.5">
                    +{box.tasks.length - 3} more
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 pt-0.5">
              <span className="text-[10px] text-zinc-600 border border-zinc-800 rounded px-1.5 py-0.5">
                {box.tasks.length} tasks
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteBox(box.id);
                }}
                className="text-zinc-700 hover:text-red-400 text-xs transition-colors opacity-0 group-hover:opacity-100"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
