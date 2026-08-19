# ButtonColorful (Referenz-Snippet)
Kategorie: UI | Dependencies: shadcn-Button-Konzept, lucide-react, cn()-Util
Use-Case: High-End CTA mit Glow-Gradient-Hover-Effekt

## Code
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export function ButtonColorful({ className, label = "Explore", ...props }) {
  return (
    <Button
      className={cn(
        "relative h-10 px-4 overflow-hidden",
        "bg-zinc-900 dark:bg-zinc-100",
        "transition-all duration-200 group",
        className
      )}
      {...props}
    >
      <div className={cn(
        "absolute inset-0",
        "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
        "opacity-40 group-hover:opacity-80 blur transition-opacity duration-500"
      )} />
      <div className="relative flex items-center justify-center gap-2">
        <span className="text-white dark:text-zinc-900">{label}</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-white/90 dark:text-zinc-900/90" />
      </div>
    </Button>
  );
}

## Anpassung bei Einsatz
- Gradient aus Tokens speisen (var(--theme-primary), var(--theme-accent))
- WCAG-Kontrast pruefen (K1 bereits implementiert)
- shadcn-Button-Konzept nachbauen falls nicht vorhanden