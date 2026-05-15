export function CondominioIllustration() {
  return (
    <div className="relative h-[214px] max-w-xl">
      <div className="absolute bottom-0 left-0 h-36 w-28 rounded-t-[2rem] border border-white/15 bg-white/10 backdrop-blur">
        <div className="grid grid-cols-2 gap-3 p-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <span
              className="h-8 rounded-xl bg-white/80"
              key={`tower-a-${index}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-24 h-48 w-40 rounded-t-[2.25rem] border border-white/15 bg-white shadow-2xl shadow-primary-dark/40">
        <div className="grid grid-cols-3 gap-3 p-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <span
              className="h-8 rounded-xl bg-primary-light"
              key={`tower-b-${index}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-60 h-32 w-28 rounded-t-[2rem] border border-white/15 bg-white/10 backdrop-blur">
        <div className="grid grid-cols-2 gap-3 p-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <span
              className="h-8 rounded-xl bg-white/80"
              key={`tower-c-${index}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute right-4 top-2 w-52 rounded-3xl border border-white/15 bg-white/10 p-4 shadow-2xl shadow-primary/30 backdrop-blur">
        <div className="flex items-center justify-between">
          <span className="h-3 w-24 rounded-full bg-white/80" />
          <span className="h-3 w-3 rounded-full bg-secondary" />
        </div>
        <div className="mt-5 space-y-3">
          <span className="block h-3 rounded-full bg-white/50" />
          <span className="block h-3 w-4/5 rounded-full bg-white/35" />
        </div>
      </div>
    </div>
  );
}
