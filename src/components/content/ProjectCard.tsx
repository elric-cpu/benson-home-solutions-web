import Link from 'next/link';
import { Card, CardContent, Badge } from '@/components/ui';

interface ProjectCardProps {
  project: {
    _id: string;
    title: string;
    slug: string;
    shortDescription?: string;
    services?: { title: string; slug: string }[];
    area?: { title: string; slug: string };
    completionDate?: string;
    featured?: boolean;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group h-full">
      <Card hover className="flex h-full flex-col overflow-hidden">
        <div className="bg-slate/10 relative flex aspect-video items-center justify-center overflow-hidden">
          [No Image]
          {project.featured && (
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-oxblood text-cream">
                Featured
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="flex flex-1 flex-col p-6">
          <div className="mb-2 flex items-center gap-2">
            {project.area && (
              <span className="text-slate text-xs font-bold tracking-widest uppercase opacity-60">
                {project.area.title}
              </span>
            )}
            {project.completionDate && (
              <span className="text-slate text-xs opacity-40">
                &bull; {new Date(project.completionDate).getFullYear()}
              </span>
            )}
          </div>
          <h3 className="text-charcoal group-hover:text-oxblood mb-2 text-xl font-bold transition-colors">
            {project.title}
          </h3>
          <p className="text-slate mb-4 line-clamp-2 text-sm leading-relaxed">
            {project.shortDescription}
          </p>
          <div className="mt-auto flex flex-wrap gap-2">
            {project.services?.slice(0, 2).map((service) => (
              <Badge
                key={service.slug}
                variant="secondary"
                className="text-[10px]"
              >
                {service.title}
              </Badge>
            ))}
            {(project.services?.length || 0) > 2 && (
              <span className="text-slate text-[10px] opacity-40">
                +{(project.services?.length || 0) - 2} more
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
