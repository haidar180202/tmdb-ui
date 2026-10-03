export function MovieSkeleton() {
  return (
    <div className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden animate-pulse flex flex-col">
      <div className="aspect-[2/3] bg-slate-800/70" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-800 rounded w-3/4" />
        <div className="h-3 bg-slate-800 rounded w-1/3" />
        <div className="space-y-1.5 pt-1">
          <div className="h-3 bg-slate-800/60 rounded w-full" />
          <div className="h-3 bg-slate-800/60 rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}
