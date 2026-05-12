import { Clock, TrendingUp, CalendarCheck, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OutcomeItem {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  metric: string;
  label: string;
}

const defaultItems: OutcomeItem[] = [
  {
    icon: Clock,
    iconBg: "bg-success/10",
    iconColor: "text-success",
    metric: "+30 min",
    label: "average weekly time on the platform",
  },
  {
    icon: TrendingUp,
    iconBg: "bg-yellow/10",
    iconColor: "text-yellow-dim",
    metric: "×2",
    label: "daily mini-task completion rate",
  },
  {
    icon: CalendarCheck,
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
    metric: "43%",
    label: "of self-paced students voluntarily set deadlines",
  },
];

export function OutcomeGrid({ items = defaultItems }: { items?: OutcomeItem[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 my-8">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.metric} className="bg-surface-overlay rounded-xl p-5 flex flex-col gap-1.5">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-1", item.iconBg)}>
              <Icon size={16} className={item.iconColor} />
            </div>
            <p className="font-display font-semibold text-3xl text-ink-primary leading-none">
              {item.metric}
            </p>
            <p className="font-body text-sm text-ink-secondary leading-snug">
              {item.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
