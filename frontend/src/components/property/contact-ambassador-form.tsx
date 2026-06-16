"use client";

export function ContactAmbassadorForm() {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-[0.2em] text-[#4e453e]">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Johnathan Sterling"
          className="w-full border-b border-[#8C7B6E] bg-[#e5e2dd]/30 p-3 outline-none transition-all focus:border-[#4a3829]"
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-[0.2em] text-[#4e453e]">
          Email Address
        </label>
        <input
          type="email"
          placeholder="j.sterling@example.com"
          className="w-full border-b border-[#8C7B6E] bg-[#e5e2dd]/30 p-3 outline-none transition-all focus:border-[#4a3829]"
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-[0.2em] text-[#4e453e]">
          Message
        </label>
        <textarea
          rows={4}
          placeholder="I am interested in a private viewing..."
          className="w-full resize-none border-b border-[#8C7B6E] bg-[#e5e2dd]/30 p-3 outline-none transition-all focus:border-[#4a3829]"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#4a3829] py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90"
      >
        Request Private Viewing
      </button>
    </form>
  );
}
