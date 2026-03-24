import { create } from "zustand";
import { useTasksStore } from "../lib/store";

interface NewTasksBoxStore {
  newBoxName: string;
  setNewBoxName: (name: string) => void;
  newBoxTasks: string[];
  setNewBoxTasks: (tasks: string[]) => void;
  createBox: () => void;
}

const useNewTasksBoxStore = create<NewTasksBoxStore>((set, get) => ({
  newBoxName: "",
  setNewBoxName: (name) => set({ newBoxName: name }),
  newBoxTasks: [""],
  setNewBoxTasks: (tasks) => set({ newBoxTasks: tasks }),
  createBox: () => {
    const { newBoxName, newBoxTasks } = get();
    const { boxes, setBoxes, loadBox } = useTasksStore.getState();
    const newBox = {
      id: crypto.randomUUID(),
      name: newBoxName.trim() || "Untitled Box",
      tasks: newBoxTasks
        .filter((t) => t.trim() !== "")
        .map((t) => ({
          id: crypto.randomUUID(),
          text: t,
          completed: false,
        })),
    };
    if (!newBoxName.trim() || newBox.tasks.length === 0) return;
    const updatedBoxes = [...boxes, newBox];
    setBoxes(updatedBoxes);
    loadBox(newBox);
    set({ newBoxName: "", newBoxTasks: [""] });
  },
}));

export default function NewTasksBox() {
  const { setView } = useTasksStore();
  const { newBoxName, setNewBoxName, newBoxTasks, setNewBoxTasks, createBox } =
    useNewTasksBoxStore();
  return (
    <div className="relative z-10 w-full max-w-xl mt-8">
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => setView("home")}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          ← Back
        </button>
        <span className="text-xs text-zinc-600 tracking-widest uppercase">
          New Box
        </span>
        <span className="w-10" />
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Box name (e.g. Deep Work)"
          value={newBoxName}
          onChange={(e) => setNewBoxName(e.target.value)}
          className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60 transition-colors"
        />

        <div className="flex flex-col gap-2">
          {newBoxTasks.map((task, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                placeholder={`Task ${i + 1}`}
                value={task}
                onChange={(e) => {
                  const updated = [...newBoxTasks];
                  updated[i] = e.target.value;
                  setNewBoxTasks(updated);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setNewBoxTasks([...newBoxTasks, ""]);
                  }
                }}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
              />
              {newBoxTasks.length > 1 && (
                <button
                  onClick={() =>
                    setNewBoxTasks(newBoxTasks.filter((_, j) => j !== i))
                  }
                  className="text-zinc-600 hover:text-red-400 transition-colors text-xs px-2"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => setNewBoxTasks([...newBoxTasks, ""])}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors text-left pl-1 mt-1"
          >
            + Add task
          </button>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={createBox}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg py-2.5 transition-colors"
          >
            Save & Start Today
          </button>
        </div>
      </div>
    </div>
  );
}
