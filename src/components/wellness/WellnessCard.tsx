import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface WellnessCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: "up" | "down" | "stable";
  status?: "excellent" | "good" | "moderate" | "poor" | "critical";
  description?: string;
  className?: string;
  children?: ReactNode;
}

const statusConfig = {
  excellent: {
    color: "text-wellness-excellent",
    bg: "bg-wellness-excellent/10",
    border: "border-wellness-excellent/30",
    label: "Excellent",
  },
  good: {
    color: "text-wellness-good",
    bg: "bg-wellness-good/10",
    border: "border-wellness-good/30",
    label: "Good",
  },
  moderate: {
    color: "text-wellness-moderate",
    bg: "bg-wellness-moderate/10",
    border: "border-wellness-moderate/30",
    label: "Moderate",
  },
  poor: {
    color: "text-wellness-poor",
    bg: "bg-wellness-poor/10",
    border: "border-wellness-poor/30",
    label: "Attention",
  },
  critical: {
    color: "text-wellness-critical",
    bg: "bg-wellness-critical/10",
    border: "border-wellness-critical/30",
    label: "Critical",
  },
};

export function WellnessCard({
  title,
  value,
  icon,
  trend,
  status,
  description,
  className,
  children,
}: WellnessCardProps) {
  const statusStyle = status ? statusConfig[status] : null;

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-cosmic group",
        status && "border-2",
        statusStyle?.border,
        className
      )}
    >
      {status && (
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-1",
            statusStyle?.color?.replace("text-", "bg-")
          )}
        />
      )}

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="flex items-center space-x-2">
          {status && (
            <Badge
              variant="outline"
              className={cn(
                "text-xs border transition-all duration-300",
                statusStyle?.color,
                statusStyle?.border,
                statusStyle?.bg
              )}
            >
              {statusStyle?.label}
            </Badge>
          )}
          <div className={cn("transition-colors duration-300", statusStyle?.color || "text-accent")}>
            {icon}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-1">
          <div className="text-2xl font-bold tracking-tight">
            {value}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {trend && (
          <div className="flex items-center space-x-1">
            <div
              className={cn(
                "text-xs font-medium",
                trend === "up" && "text-success",
                trend === "down" && "text-destructive",
                trend === "stable" && "text-muted-foreground"
              )}
            >
              {trend === "up" && "↗"}
              {trend === "down" && "↘"}
              {trend === "stable" && "→"}
            </div>
            <span className="text-xs text-muted-foreground">
              {trend === "up" && "Improving"}
              {trend === "down" && "Declining"}
              {trend === "stable" && "Stable"}
            </span>
          </div>
        )}

        {children}
      </CardContent>
    </Card>
  );
}