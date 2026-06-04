import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PropertyNotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold text-slate-900">Property not found</h1>
      <p className="mt-2 text-slate-500">
        This listing may have been removed or the URL is incorrect.
      </p>
      <Button asChild className="mt-6">
        <Link href="/properties">Back to listings</Link>
      </Button>
    </div>
  );
}
