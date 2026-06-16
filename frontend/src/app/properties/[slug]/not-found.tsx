import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PropertyNotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-5 text-center md:px-20">
      <h1 className="font-serif text-3xl text-[#4a3829]">Property not found</h1>
      <p className="mt-2 text-[#4e453e]">
        This listing may have been removed or the URL is incorrect.
      </p>
      <Button
        asChild
        className="mt-6 rounded-sm bg-[#4a3829] text-white hover:bg-[#534335]"
      >
        <Link href="/properties">Back to listings</Link>
      </Button>
    </div>
  );
}
