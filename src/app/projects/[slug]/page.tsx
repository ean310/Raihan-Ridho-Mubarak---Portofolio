import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ProjectDetailClient } from "@/components/ProjectDetailClient";

export function generateStaticParams() {
  return PORTFOLIO_DATA.projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PORTFOLIO_DATA.projects.find((p) => p.slug === slug);
  if (!project) {
    return { title: "Project Not Found | Raihan Ridho Mubarok" };
  }
  return {
    title: `${project.name} — ${project.tagline} | Raihan Ridho Mubarok`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PORTFOLIO_DATA.projects.find((p) => p.slug === slug);
  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}

