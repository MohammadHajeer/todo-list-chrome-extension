/// <reference types="chrome" />

type View = "home" | "select-box" | "new-box" | "tasks";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

type TaskBox = {
  id: string;
  name: string;
  tasks: Task[];
};
