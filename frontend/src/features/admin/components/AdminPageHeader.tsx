import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description: string;
  actions?: ReactNode;
}

export function AdminPageHeader({ title, description, actions }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {actions}
    </div>
  );
}

interface AdminResultCountProps {
  count: number;
  singular: string;
  plural: string;
  searching: boolean;
  query: string;
}

export function AdminResultCount({ count, singular, plural, searching, query }: AdminResultCountProps) {
  if (searching) {
    return (
      <p className="text-sm text-muted-foreground">
        {count} {count === 1 ? singular : plural} para «{query}»
      </p>
    );
  }
  return (
    <p className="text-sm text-muted-foreground">
      {count} {count === 1 ? singular : plural}
    </p>
  );
}
