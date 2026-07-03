import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import { Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getStrapiMediaUrl } from "@/lib/utils";
import type { Agent } from "@/types/strapi";

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const avatarUrl =
    getStrapiMediaUrl(agent.avatar) ??
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80";

  return (
    <Card className="sticky top-24 border-slate-200">
      <CardHeader>
        <CardTitle className="text-base text-slate-500">Listed by</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full bg-slate-100">
            <ImageWithSkeleton
              src={avatarUrl}
              alt={agent.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-slate-900">{agent.name}</p>
            {agent.role && (
              <p className="text-sm text-slate-500">{agent.role}</p>
            )}
          </div>
        </div>

        <div className="space-y-2 text-sm">
          {agent.phone && (
            <a
              href={`tel:${agent.phone}`}
              className="flex items-center gap-2 text-slate-600 hover:text-emerald-600"
            >
              <Phone className="h-4 w-4" />
              {agent.phone}
            </a>
          )}
          <a
            href={`mailto:${agent.email}`}
            className="flex items-center gap-2 text-slate-600 hover:text-emerald-600"
          >
            <Mail className="h-4 w-4" />
            {agent.email}
          </a>
        </div>

        <Button asChild className="w-full">
          <a href={`mailto:${agent.email}?subject=Property inquiry`}>
            Contact agent
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
