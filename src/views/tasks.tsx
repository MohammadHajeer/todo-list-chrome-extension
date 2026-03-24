import { useState } from "react";
import { useTasksStore } from "../lib/store";

export default function Tasks() {
  const [newTaskText, setNewTaskText] = useState("");
  const { tasks, setView, setTasks, resetDay } = useTasksStore();

  const toggleTask = (id: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t,
    );
    setTasks(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
  };

  const addTask = () => {
    if (!newTaskText.trim()) return;
    const updated = [
      ...tasks,
      { id: crypto.randomUUID(), text: newTaskText.trim(), completed: false },
    ];
    setTasks(updated);
    setNewTaskText("");
  };

  return (
    <div className="relative z-10">
      {/* Task list */}
      <div className="flex flex-col gap-2 mb-4">
        {tasks.length === 0 && (
          <p className="text-center text-zinc-600 text-sm py-8">
            No tasks yet. Add one below.
          </p>
        )}
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`group flex items-center gap-3 p-3.5 rounded-lg border transition-all duration-200 cursor-pointer ${
              task.completed
                ? "bg-zinc-900/40 border-zinc-800/50 opacity-50"
                : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
            }`}
          >
            <button
              className={`w-5 h-5 rounded shrink-0 border flex items-center justify-center transition-all duration-200 ${
                task.completed
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "border-zinc-600 hover:border-emerald-500"
              }`}
            >
              {task.completed && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <span
              className={`flex-1 text-sm transition-all duration-200 ${
                task.completed ? "line-through text-zinc-600" : "text-zinc-200"
              }`}
            >
              {task.text}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(task.id);
              }}
              className="text-zinc-700 hover:text-red-400 transition-colors text-xs opacity-0 group-hover:opacity-100 shrink-0"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Add task input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60 transition-colors"
        />
        <button
          onClick={() => addTask()}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm px-4 rounded-lg border border-zinc-700 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800/60">
        <button
          onClick={() => setView("select-box")}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          ⬡ Switch box
        </button>
        <button
          onClick={resetDay}
          className="text-xs text-zinc-600 hover:text-red-400 transition-colors"
        >
          Reset day
        </button>
      </div>
    </div>
  );
}
