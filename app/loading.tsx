export default function GlobalLoading() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Navbar skeleton */}
      <div className="h-16 bg-white dark:bg-gray-900 border-b border-slate-100 dark:border-gray-800 animate-pulse" />

      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20">
        <div className="container mx-auto px-4 space-y-4">
          <div className="h-4 w-32 bg-white/10 rounded-full" />
          <div className="h-10 w-64 bg-white/10 rounded-xl" />
          <div className="h-4 w-48 bg-white/10 rounded-full" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="bg-slate-50 dark:bg-gray-950 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-slate-200 dark:bg-gray-700" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-slate-200 dark:bg-gray-700 rounded-full w-3/4" />
                  <div className="h-3 bg-slate-100 dark:bg-gray-600 rounded-full w-full" />
                  <div className="h-3 bg-slate-100 dark:bg-gray-600 rounded-full w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
