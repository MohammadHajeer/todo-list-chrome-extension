interface ProgressBarProps {
  tasks: Task[];
  activeBoxName: string;
}

export default function ProgressBar({
  tasks,
  activeBoxName,
}: ProgressBarProps) {
  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;
  return (
    <div className="relative z-10 w-full max-w-xl mt-4 mb-8">
      <div className="flex justify-between text-xs text-zinc-500 mb-1.5">
        <span>{activeBoxName || "Today's Tasks"}</span>
        <span className="text-emerald-400">
          {completedCount}/{tasks.length} done
        </span>
      </div>
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
