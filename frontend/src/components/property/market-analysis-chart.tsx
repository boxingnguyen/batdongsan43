export function MarketAnalysisChart({ marketYoY }: { marketYoY: string }) {
  return (
    <section className="border border-[#8C7B6E]/10 bg-[#eeeeee]/50 p-8 md:p-12">
      <div className="mb-12 flex flex-col items-end justify-between gap-4 md:flex-row">
        <div>
          <h3 className="font-serif text-2xl text-[#4a3829]">Market Analysis</h3>
          <p className="mt-1 text-xs text-[#4e453e]">
            Property Value Appreciation: {marketYoY}
          </p>
        </div>
        <div className="flex gap-4">
          <span className="flex items-center gap-2 text-xs text-[#4e453e]">
            <span className="h-3 w-3 bg-[#4a3829]" />
            Neighborhood
          </span>
          <span className="flex items-center gap-2 text-xs text-[#4e453e]">
            <span className="h-3 w-3 border border-[#4a3829]" />
            This Property
          </span>
        </div>
      </div>
      <div className="relative h-64 w-full">
        <svg
          className="h-full w-full overflow-visible"
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
          aria-label="Property value appreciation chart 2020 to 2024"
        >
          <line
            stroke="#8C7B6E"
            strokeOpacity="0.1"
            x1="0"
            x2="1000"
            y1="0"
            y2="0"
          />
          <line
            stroke="#8C7B6E"
            strokeOpacity="0.1"
            x1="0"
            x2="1000"
            y1="50"
            y2="50"
          />
          <line
            stroke="#8C7B6E"
            strokeOpacity="0.1"
            x1="0"
            x2="1000"
            y1="100"
            y2="100"
          />
          <line
            stroke="#8C7B6E"
            strokeOpacity="0.1"
            x1="0"
            x2="1000"
            y1="150"
            y2="150"
          />
          <line
            stroke="#8C7B6E"
            strokeOpacity="0.2"
            x1="0"
            x2="1000"
            y1="200"
            y2="200"
          />
          <path
            d="M0,180 Q100,160 200,150 T400,120 T600,100 T800,70 T1000,50"
            fill="none"
            stroke="#8C7B6E"
            strokeDasharray="4,4"
            strokeWidth="1"
          />
          <path
            className="chart-line"
            d="M0,190 Q100,180 200,140 T400,110 T600,80 T800,40 T1000,20"
            fill="none"
            stroke="#4a3829"
            strokeWidth="3"
          />
          <circle cx="200" cy="140" fill="#4a3829" r="4" />
          <circle cx="600" cy="80" fill="#4a3829" r="4" />
          <circle cx="1000" cy="20" fill="#4a3829" r="4" />
        </svg>
        <div className="mt-6 flex justify-between text-xs text-[#4e453e]">
          <span>2020</span>
          <span>2021</span>
          <span>2022</span>
          <span>2023</span>
          <span>2024</span>
        </div>
      </div>
    </section>
  );
}
