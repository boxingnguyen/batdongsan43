"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";
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

const PROPERTY_TYPES: { value: PropertyType | "all"; label: string }[] = [
  { value: "all", label: "All types" },
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "condo", label: "Condo" },
  { value: "land", label: "Land" },
];

export function HeroSearch() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (propertyType && propertyType !== "all") {
      params.set("property_type", propertyType);
    }
    if (maxPrice) params.set("maxPrice", maxPrice);
    const qs = params.toString();
    router.push(`/properties${qs ? `?${qs}` : ""}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 grid max-w-4xl gap-3 rounded-2xl border border-white/10 bg-white/95 p-4 shadow-2xl backdrop-blur sm:grid-cols-2 lg:grid-cols-[1fr_160px_160px_auto]"
    >
      <div className="relative sm:col-span-2 lg:col-span-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="City, neighborhood, or address..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Select value={propertyType} onValueChange={setPropertyType}>
        <SelectTrigger>
          <SelectValue placeholder="Property type" />
        </SelectTrigger>
        <SelectContent>
          {PROPERTY_TYPES.map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="number"
        placeholder="Max price"
        min={0}
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <Button type="submit" size="lg" className="sm:col-span-2 lg:col-span-1">
        Search
      </Button>
    </form>
  );
}
