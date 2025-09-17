import { BiometricDisplay } from "@/components/biometrics/BiometricDisplay";
import { WellnessChart } from "@/components/charts/WellnessChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Activity,
  Zap,
  Moon,
  Droplets,
  Thermometer,
  Wifi,
  AlertTriangle,
  CheckCircle,
  Settings,
  Download,
} from "lucide-react";

const biometricData = [
  {
    id: "hr",
    name: "Heart Rate",
    value: 72,
    unit: "BPM",
    range: { min: 60, max: 100 },
    status: "good" as const,
    icon: "heart" as const,
    trend: "stable" as const,
    lastUpdated: "2 min ago",
  },
  {
    id: "hrv",
    name: "Heart Rate Variability",
    value: 45,
    unit: "ms",
    range: { min: 20, max: 60 },
    status: "excellent" as const,
    icon: "activity" as const,
    trend: "up" as const,
    lastUpdated: "2 min ago",
  },
  {
    id: "stress",
    name: "Stress Level",
    value: 28,
    unit: "%",
    range: { min: 0, max: 100 },
    status: "good" as const,
    icon: "zap" as const,
    trend: "down" as const,
    lastUpdated: "1 min ago",
  },
  {
    id: "sleep",
    name: "Sleep Score",
    value: 82,
    unit: "%",
    range: { min: 0, max: 100 },
    status: "good" as const,
    icon: "moon" as const,
    trend: "up" as const,
    lastUpdated: "6h ago",
  },
  {
    id: "hydration",
    name: "Hydration Level",
    value: 75,
    unit: "%",
    range: { min: 0, max: 100 },
    status: "moderate" as const,
    icon: "droplets" as const,
    trend: "down" as const,
    lastUpdated: "30 min ago",
  },
  {
    id: "temp",
    name: "Body Temperature",
    value: 98.6,
    unit: "°F",
    range: { min: 97, max: 100 },
    status: "excellent" as const,
    icon: "thermometer" as const,
    trend: "stable" as const,
    lastUpdated: "5 min ago",
  },
];

const heartRateData = [
  { time: "00:00", value: 65 },
  { time: "04:00", value: 60 },
  { time: "08:00", value: 75 },
  { time: "12:00", value: 85 },
  { time: "16:00", value: 78 },
  { time: "20:00", value: 72 },
];

const stressData = [
  { time: "Mon", value: 25 },
  { time: "Tue", value: 30 },
  { time: "Wed", value: 20 },
  { time: "Thu", value: 35 },
  { time: "Fri", value: 28 },
  { time: "Sat", value: 22 },
  { time: "Sun", value: 18 },
];

const sleepData = [
  { time: "Mon", value: 7.2 },
  { time: "Tue", value: 6.8 },
  { time: "Wed", value: 8.1 },
  { time: "Thu", value: 7.5 },
  { time: "Fri", value: 6.5 },
  { time: "Sat", value: 7.8 },
  { time: "Sun", value: 8.2 },
];

const deviceStatus = [
  { name: "Oura Ring", status: "connected", battery: 85, signal: 95 },
  { name: "Apple Watch", status: "connected", battery: 62, signal: 88 },
  { name: "Chest Strap", status: "disconnected", battery: 0, signal: 0 },
  { name: "Sleep Sensor", status: "connected", battery: 45, signal: 92 },
];

export default function BiometricsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-stellar bg-clip-text text-transparent">
            Biometric Monitor
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time physiological data and wellness insights
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Calibrate
          </Button>
          <Badge
            variant="outline"
            className="bg-success/10 text-success border-success/30"
          >
            <Wifi className="h-3 w-3 mr-1" />
            Live Data
          </Badge>
        </div>
      </div>

      {/* Device Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-accent" />
            <span>Connected Devices</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deviceStatus.map((device) => (
              <div
                key={device.name}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="space-y-1">
                  <div className="font-medium text-sm">{device.name}</div>
                  <div className="flex items-center space-x-2">
                    {device.status === "connected" ? (
                      <CheckCircle className="h-3 w-3 text-success" />
                    ) : (
                      <AlertTriangle className="h-3 w-3 text-destructive" />
                    )}
                    <span
                      className={`text-xs ${
                        device.status === "connected"
                          ? "text-success"
                          : "text-destructive"
                      }`}
                    >
                      {device.status}
                    </span>
                  </div>
                </div>
                {device.status === "connected" && (
                  <div className="text-right space-y-1">
                    <div className="text-xs text-muted-foreground">
                      {device.battery}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {device.signal}%
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Biometric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {biometricData.map((data) => (
          <BiometricDisplay key={data.id} data={data} />
        ))}
      </div>

      {/* Detailed Charts */}
      <Tabs defaultValue="heart-rate" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="heart-rate">Heart Rate</TabsTrigger>
          <TabsTrigger value="stress">Stress Levels</TabsTrigger>
          <TabsTrigger value="sleep">Sleep Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="heart-rate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WellnessChart
                title="Heart Rate Trend (24 Hours)"
                data={heartRateData}
                type="area"
                color="hsl(var(--wellness-good))"
                height={400}
              />
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Heart Rate Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Resting HR</span>
                    <span className="text-sm font-medium">62 BPM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Max HR (24h)</span>
                    <span className="text-sm font-medium">105 BPM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg HR</span>
                    <span className="text-sm font-medium">74 BPM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Time in Zone</span>
                    <span className="text-sm font-medium">3.2h</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <Badge
                    variant="outline"
                    className="w-full justify-center bg-success/10 text-success border-success/30"
                  >
                    Cardiovascular Health: Excellent
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stress" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WellnessChart
                title="Stress Levels (7 Days)"
                data={stressData}
                type="line"
                color="hsl(var(--warning))"
                height={400}
              />
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Stress Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Current Level</span>
                    <span className="text-sm font-medium text-success">Low</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Weekly Avg</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Peak Today</span>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Recovery Time</span>
                    <span className="text-sm font-medium">12 min</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    className="w-full bg-gradient-aurora/10 border-accent/30"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Stress Relief Protocol
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sleep" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WellnessChart
                title="Sleep Quality (7 Days)"
                data={sleepData}
                type="area"
                color="hsl(var(--primary))"
                height={400}
              />
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Sleep Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Sleep Efficiency</span>
                    <span className="text-sm font-medium">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Deep Sleep</span>
                    <span className="text-sm font-medium">1.8h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">REM Sleep</span>
                    <span className="text-sm font-medium">1.5h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Awakenings</span>
                    <span className="text-sm font-medium">2</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <Badge
                    variant="outline"
                    className="w-full justify-center bg-primary/10 text-primary border-primary/30"
                  >
                    Sleep Quality: Good
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}