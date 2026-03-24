import { create } from "zustand";
import { DEFAULT_BOXES } from "./constants";
import { storage } from "./chrome-storage";

interface TasksState {
  view: View;
  setView: (view: View) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  activeBoxName: string;
  setActiveBoxName: (name: string) => void;
  boxes: TaskBox[];
  setBoxes: (boxes: TaskBox[]) => void;
  loadBox: (box: TaskBox) => void;
  resetDay: () => void;
}

export const useTasksStore = create<TasksState>((set) => ({
  view: "home" as View,
  setView: (view: View) => set({ view }),
  tasks: [] as Task[],
  setTasks: (tasks: Task[]) => set({ tasks }),
  activeBoxName: "",
  setActiveBoxName: (name: string) => set({ activeBoxName: name }),
  boxes: DEFAULT_BOXES as TaskBox[],
  setBoxes: (boxes: TaskBox[]) => set({ boxes }),
  loadBox: (box: TaskBox) =>
    set({ tasks: box.tasks, activeBoxName: box.name, view: "tasks" }),
  resetDay: () => {
    set({ tasks: [], activeBoxName: "", view: "home" });
    storage.set({ tasks: [], lastDate: "", activeBoxName: "" });
  },
}));
