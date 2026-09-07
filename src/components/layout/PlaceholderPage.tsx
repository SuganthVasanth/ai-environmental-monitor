import { Construction } from "lucide-react";
import { DEMO_NOTICE } from "@/data/mockData";

export function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto w-full max-w-[1600px]">
      <div className="panel grid-backdrop flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
        <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/25">
          <Construction size={22} />
        </span>
        <h2 className="mt-5 text-xl font-semibold text-foreground">{title}</h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
        <p className="label-caps mt-6 text-muted-foreground/60">
          {DEMO_NOTICE.title} · {DEMO_NOTICE.detail}
        </p>
      </div>
    </div>
  );
}
