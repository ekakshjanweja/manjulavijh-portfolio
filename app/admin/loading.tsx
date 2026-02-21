export default function AdminLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-3 w-32 rounded-full bg-slate-200" />
        <div className="h-6 w-64 rounded-full bg-slate-200" />
        <div className="h-4 w-72 rounded-full bg-slate-100" />
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="grid grid-cols-4 gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-400">
          <div className="h-3 w-20 rounded-full bg-slate-200" />
          <div className="h-3 w-24 rounded-full bg-slate-200" />
          <div className="h-3 w-28 rounded-full bg-slate-200" />
          <div className="h-3 w-16 rounded-full bg-slate-200" />
        </div>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 border-b border-slate-100 px-4 py-4">
            <div className="h-3 w-28 rounded-full bg-slate-100" />
            <div className="h-3 w-32 rounded-full bg-slate-100" />
            <div className="h-3 w-48 rounded-full bg-slate-100" />
            <div className="h-3 w-20 rounded-full bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
