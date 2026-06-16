"use client";

export function FooterRegisterForm() {
  return (
    <form
      className="flex max-w-sm flex-col gap-3"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        placeholder="Name"
        className="border-b border-[#8C7B6E]/30 bg-[#f9f9f9]/50 p-2 text-xs outline-none transition-colors focus:border-[#4a3829]"
      />
      <input
        type="email"
        placeholder="Email"
        className="border-b border-[#8C7B6E]/30 bg-[#f9f9f9]/50 p-2 text-xs outline-none transition-colors focus:border-[#4a3829]"
      />
      <button
        type="submit"
        className="w-fit bg-[#4a3829] px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90"
      >
        Subscribe
      </button>
    </form>
  );
}
