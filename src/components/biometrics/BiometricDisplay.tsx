import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Heart, Activity, Zap, Moon, Droplets, Thermometer } from "lucide-react";

interface BiometricData {
  id: string;
  name: string;
  value: number;
  unit: string;
  range: { min: number; max: number };
  status: "excellent" | "good" | "moderate" | "poor" | "critical";
  icon: keyof typeof iconMap;
  trend: "up" | "down" | "stable";
  lastUpdated: string;
}

const iconMap = {
  heart: Heart,
  activity: Activity,
  zap: Zap,
  moon: Moon,
  droplets: Droplets,
  thermometer: Thermometer,
};

const statusConfig = {
  excellent: { color: "text-wellness-excellent", label: "Excellent", progress: 90 },
  good: { color: "text-wellness-good", label: "Good", progress: 75 },
  moderate: { color: "text-wellness-moderate", label: "Moderate", progress: 60 },
  poor: { color: "text-wellness-poor", label: "Attention", progress: 40 },
  critical: { color: "text-wellness-critical", label: "Critical", progress: 20 },
};

interface BiometricDisplayProps {
  data: BiometricData;
  showDetails?: boolean;
}

export function BiometricDisplay({ data, showDetails = true }: BiometricDisplayProps) {
  const Icon = iconMap[data.icon];
  const statusStyle = statusConfig[data.status];
  const percentage = ((data.value - data.range.min) / (data.range.max - data.range.min)) * 100;

  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-glow group">
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-1 transition-all duration-300",
          statusStyle.color.replace("text-", "bg-")
        )}
      />

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon className={cn("h-5 w-5", statusStyle.color)} />
            <CardTitle className="text-base font-medium">{data.name}</CardTitle>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "text-xs transition-all duration-300",
              statusStyle.color,
              statusStyle.color.replace("text-", "border-") + "/30"
            )}
          >
            {statusStyle.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight">
              {data.value}
            </span>
            <span className="text-sm text-muted-foreground">{data.unit}</span>
          </div>

          <Progress
            value={Math.max(0, Math.min(100, percentage))}
            className="h-2"
          />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{data.range.min}</span>
            <span>{data.range.max}</span>
          </div>
        </div>

        {showDetails && (
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Trend</span>
              <div className="flex items-center space-x-1">
                <span
                  className={cn(
                    "text-sm",
                    data.trend === "up" && "text-success",
                    data.trend === "down" && "text-destructive",
                    data.trend === "stable" && "text-muted-foreground"
                  )}
                >
                  {data.trend === "up" && "↗"}
                  {data.trend === "down" && "↘"}
                  {data.trend === "stable" && "→"}
                </span>
                <span className="text-sm text-muted-foreground capitalize">
                  {data.trend}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Update</span>
              <span className="text-sm text-foreground">{data.lastUpdated}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}