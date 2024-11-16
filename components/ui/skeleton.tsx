import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-none bg-slate-800 dark:bg-neutral-700",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-950 to-transparent transform -translate-x-full animate-skeleton"
      />
    </div>
  );
}

export { Skeleton };
