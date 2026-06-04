import Link from "next/link";
import { Building2, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="dark-section border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600">
              <Building2 className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">LuxeEstate</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
            Curated luxury homes and investment properties. Data-driven insights
            meet white-glove service.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/properties" className="hover:text-emerald-400">
                All properties
              </Link>
            </li>
            <li>
              <Link
                href="/properties?status=for-sale"
                className="hover:text-emerald-400"
              >
                For sale
              </Link>
            </li>
            <li>
              <Link
                href="/properties?status=for-rent"
                className="hover:text-emerald-400"
              >
                For rent
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-emerald-500" />
              100 Market St, San Francisco, CA
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-emerald-500" />
              (415) 555-0199
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-emerald-500" />
              hello@luxestate.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} LuxeEstate. All rights reserved.
      </div>
    </footer>
  );
}
