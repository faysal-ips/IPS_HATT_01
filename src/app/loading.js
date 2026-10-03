export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[50vh] flex-col items-center justify-center gap-4"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#00a651]" />
      <p className="text-sm font-semibold text-slate-500">Loading...</p>
    </div>
  );
}
