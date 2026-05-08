import { Stars } from "./Stars";
export function ReviewCard({ name, text, role }: { name: string; text: string; role?: string }) {
  return (
    <div className="card-surface p-6">
      <Stars />
      <p className="mt-4 text-foreground/90 leading-relaxed">"{text}"</p>
      <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-surface-2 to-surface flex items-center justify-center text-sm font-medium">
          {name.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-medium">{name}</div>
          {role && <div className="text-xs text-muted-foreground">{role}</div>}
        </div>
      </div>
    </div>
  );
}
