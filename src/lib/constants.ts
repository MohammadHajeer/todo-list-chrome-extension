export const DEFAULT_BOXES: TaskBox[] = [
  {
    id: crypto.randomUUID(),
    name: "Deep Work",
    tasks: [
      {
        id: crypto.randomUUID(),
        text: "Pick one hard problem to solve",
        completed: false,
      },
      {
        id: crypto.randomUUID(),
        text: "No meetings before noon",
        completed: false,
      },
      {
        id: crypto.randomUUID(),
        text: "Write 500 words of documentation",
        completed: false,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: "Weekly Review",
    tasks: [
      {
        id: crypto.randomUUID(),
        text: "Review open PRs and issues",
        completed: false,
      },
      {
        id: crypto.randomUUID(),
        text: "Update project roadmap",
        completed: false,
      },
      { id: crypto.randomUUID(), text: "Clear email inbox", completed: false },
      {
        id: crypto.randomUUID(),
        text: "Plan next week's priorities",
        completed: false,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: "Deployment Day",
    tasks: [
      {
        id: crypto.randomUUID(),
        text: "Run full test suite",
        completed: false,
      },
      { id: crypto.randomUUID(), text: "Review changelog", completed: false },
      { id: crypto.randomUUID(), text: "Deploy to staging", completed: false },
      {
        id: crypto.randomUUID(),
        text: "Monitor error logs post-deploy",
        completed: false,
      },
    ],
  },
];
