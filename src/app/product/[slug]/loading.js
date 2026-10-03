const pulse = "animate-pulse bg-slate-200/80";

export default function ProductLoading() {
  return (
    <div
      role="status"
      aria-label="Loading product"
      className="min-h-screen bg-slate-50/60 py-4 md:py-10"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className={`mb-4 h-4 w-64 rounded md:mb-6 ${pulse}`} />

        <div className="grid grid-cols-1 gap-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6 md:p-8 lg:grid-cols-12 lg:gap-8">
          {/* Gallery */}
          <div className="lg:col-span-5">
            <div className={`aspect-square rounded-2xl ${pulse}`} />
            <div className="mt-3 flex gap-2.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-16 w-16 rounded-xl sm:h-20 sm:w-20 ${pulse}`}
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 lg:col-span-7">
            <div className={`h-6 w-28 rounded-full ${pulse}`} />
            <div className={`h-8 w-full rounded ${pulse}`} />
            <div className={`h-8 w-2/3 rounded ${pulse}`} />
            <div className={`h-4 w-48 rounded ${pulse}`} />
            <div className={`h-20 w-full rounded-2xl ${pulse}`} />
            <div className={`h-4 w-full rounded ${pulse}`} />
            <div className={`h-4 w-5/6 rounded ${pulse}`} />
            <div className="flex gap-3 pt-2">
              <div className={`h-12 w-32 rounded-xl ${pulse}`} />
              <div className={`h-12 flex-1 rounded-xl ${pulse}`} />
              <div className={`h-12 flex-1 rounded-xl ${pulse}`} />
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">Loading product...</span>
    </div>
  );
}
