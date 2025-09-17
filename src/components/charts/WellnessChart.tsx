import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartDataPoint {
  time: string;
  value: number;
  status?: string;
}

interface WellnessChartProps {
  title: string;
  data: ChartDataPoint[];
  type?: "line" | "area";
  color?: string;
  height?: number;
}

export function WellnessChart({
  title,
  data,
  type = "line",
  color = "hsl(var(--accent))",
  height = 200,
}: WellnessChartProps) {
  const Chart = type === "area" ? AreaChart : LineChart;

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-cosmic">
          <p className="text-sm font-medium">{`Time: ${label}`}</p>
          <p className="text-sm text-accent">
            {`Value: ${payload[0].value}`}
          </p>
          {payload[0].payload.status && (
            <p className="text-xs text-muted-foreground">
              Status: {payload[0].payload.status}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <Chart data={data}>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip content={customTooltip} />
            {type === "area" ? (
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                fill={`${color}30`}
                strokeWidth={2}
              />
            ) : (
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: color }}
              />
            )}
          </Chart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}