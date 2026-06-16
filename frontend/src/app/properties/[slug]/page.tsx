import { notFound } from "next/navigation";
import { EtherealPropertyDetail } from "@/components/property/ethereal-property-detail";
import { getStaticPropertyDetail } from "@/lib/static-properties";
import { mapStrapiToPropertyDetail } from "@/lib/map-property-detail";
import { getPropertyBySlug } from "@/lib/strapi";

interface PropertyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  const staticDetail = getStaticPropertyDetail(slug);
  if (staticDetail) {
    return {
      title: `${staticDetail.title} | Property Details`,
      description: staticDetail.description[0]?.slice(0, 160),
    };
  }

  const property = await getPropertyBySlug(slug).catch(() => null);
  if (!property) return { title: "Property not found" };
  return {
    title: `${property.title} | Property Details`,
    description: `${property.title} in ${property.city ?? "prime location"}`,
  };
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { slug } = await params;

  const staticDetail = getStaticPropertyDetail(slug);
  if (staticDetail) {
    return <EtherealPropertyDetail property={staticDetail} />;
  }

  let property: Awaited<ReturnType<typeof getPropertyBySlug>> = null;
  try {
    property = await getPropertyBySlug(slug, { revalidate: 30 });
  } catch {
    property = null;
  }

  if (!property) notFound();

  return (
    <EtherealPropertyDetail property={mapStrapiToPropertyDetail(property)} />
  );
}
