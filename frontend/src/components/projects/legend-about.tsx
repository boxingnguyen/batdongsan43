interface Stat {
  label: string;
  value: string;
}

interface LegendAboutProps {
  overview: string[];
  stats: Stat[];
  highlights: Array<{ title: string; description: string }>;
}

export function LegendAbout({
  overview,
  stats,
  highlights
}: LegendAboutProps) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-20 md:py-24">
      {/* Overview */}
      <div className="mb-20">
        <h2 className="mb-8 font-serif text-3xl md:text-4xl text-[#4a3829]">
          Giới Thiệu Dự Án
        </h2>
        <div className="space-y-6">
          {overview.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-lg leading-relaxed text-[#4e453e]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-20 grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border-b border-[#8C7B6E]/20 pb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8C7B6E]">
              {stat.label}
            </p>
            <p className="mt-3 font-serif text-xl text-[#4a3829] md:text-2xl">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {highlights.map((highlight) => (
          <div
            key={highlight.title}
            className="rounded-lg bg-white p-8 shadow-sm"
          >
            <h3 className="font-serif text-xl text-[#4a3829]">
              {highlight.title}
            </h3>
            <p className="mt-4 text-[#4e453e]">
              {highlight.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
