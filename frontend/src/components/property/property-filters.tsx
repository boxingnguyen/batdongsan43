"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PropertyType } from "@/types/strapi";

export function PropertyFiltersSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (!value) params.delete(key);
        else params.set(key, value);
      });
      startTransition(() => {
        router.push(`/properties?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  function clearFilters() {
    startTransition(() => router.push("/properties"));
  }

  return (
    <aside className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
        {isPending && (
          <span className="text-xs text-emerald-600">Updating…</span>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Search</label>
        <Input
          defaultValue={searchParams.get("search") ?? ""}
          placeholder="Keyword..."
          onBlur={(e) => updateParams({ search: e.target.value || undefined })}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateParams({
                search: (e.target as HTMLInputElement).value || undefined,
              });
            }
          }}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Status</label>
        <Select
          value={searchParams.get("status") ?? "all"}
          onValueChange={(v) =>
            updateParams({ status: v === "all" ? undefined : v })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Any status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any status</SelectItem>
            <SelectItem value="for-sale">For sale</SelectItem>
            <SelectItem value="for-rent">For rent</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Type</label>
        <Select
          value={searchParams.get("property_type") ?? "all"}
          onValueChange={(v) =>
            updateParams({ property_type: v === "all" ? undefined : v })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Any type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any type</SelectItem>
            {( ["house", "apartment", "condo", "land"] as PropertyType[] ).map(
              (t) => (
                <SelectItem key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Max price</label>
        <Input
          type="number"
          min={0}
          defaultValue={searchParams.get("maxPrice") ?? ""}
          placeholder="No limit"
          onBlur={(e) =>
            updateParams({ maxPrice: e.target.value || undefined })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">City</label>
        <Input
          defaultValue={searchParams.get("city") ?? ""}
          placeholder="e.g. San Francisco"
          onBlur={(e) => updateParams({ city: e.target.value || undefined })}
        />
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={clearFilters}
      >
        Clear filters
      </Button>
    </aside>
  );
}
