import { useState, useEffect } from "react";
import { useTasksStore, storage, todayStr } from "./lib";
import { Home, NewTasksBox, SelectBox, Tasks } from "./views";
import { Background, Clock, Footer, ProgressBar } from "./components";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const {
    view,
    setView,
    tasks,
    setTasks,
    activeBoxName,
    setActiveBoxName,
    boxes,
    setBoxes,
  } = useTasksStore();

  // ── Load from storage ──────────────────────────────────────────────────────
  useEffect(() => {
    storage
      .get(["tasks", "lastDate", "boxes", "activeBoxName"])
      .then((data) => {
        console.log("Loaded data:", data);
        const today = todayStr();
        const savedBoxes = data.boxes as TaskBox[] | undefined;
        if (savedBoxes?.length) setBoxes(savedBoxes);

        if (data.lastDate === today && Array.isArray(data.tasks)) {
          setTasks(data.tasks as Task[]);
          setActiveBoxName((data.activeBoxName as string) || "");
          setView("tasks");
        }
        setLoaded(true);
      });
  }, [setActiveBoxName, setBoxes, setTasks, setView]);

  // ── Persist tasks ──────────────────────────────────────────────────────────
  useEffect(() => {
    const saveTasks = (updated: Task[], boxName = activeBoxName) => {
      storage.set({
        tasks: updated,
        lastDate: todayStr(),
        activeBoxName: boxName,
      });
      console.log("Saved tasks:", updated);
    };
    if (loaded) saveTasks(tasks);
  }, [activeBoxName, loaded, setTasks, tasks]);

  useEffect(() => {
    const saveBoxes = (updated: TaskBox[]) => {
      storage.set({ boxes: updated });
      console.log("Saved boxes:", updated);
    };
    if (loaded) saveBoxes(boxes);
  }, [boxes, loaded, setBoxes]);

  if (!loaded) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono flex flex-col items-center justify-start pt-16 pb-24 px-4 selection:bg-emerald-500/30">
      <Background />

      <Clock />

      {view === "home" && <Home />}

      {view === "select-box" && <SelectBox />}

      {view === "new-box" && <NewTasksBox />}

      {view === "tasks" && (
        <div className="flex flex-col w-full max-w-xl mt-2">
          {tasks.length > 0 && (
            <ProgressBar
              tasks={tasks}
              activeBoxName={activeBoxName || "Today's Tasks"}
            />
          )}

          <Tasks />
        </div>
      )}

      <Footer />
    </div>
  );
}
