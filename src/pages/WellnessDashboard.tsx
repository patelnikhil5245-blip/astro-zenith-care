import { WellnessCard } from "@/components/wellness/WellnessCard";
import { WellnessChart } from "@/components/charts/WellnessChart";
import { AICompanion } from "@/components/companion/AICompanion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  Brain,
  Activity,
  Moon,
  Zap,
  Shield,
  Award,
  TrendingUp,
  Waves,
  Eye,
} from "lucide-react";

const wellnessData = [
  { time: "00:00", value: 85, status: "good" },
  { time: "04:00", value: 78, status: "moderate" },
  { time: "08:00", value: 92, status: "excellent" },
  { time: "12:00", value: 88, status: "good" },
  { time: "16:00", value: 82, status: "good" },
  { time: "20:00", value: 75, status: "moderate" },
];

const stressData = [
  { time: "00:00", value: 20 },
  { time: "04:00", value: 35 },
  { time: "08:00", value: 15 },
  { time: "12:00", value: 25 },
  { time: "16:00", value: 40 },
  { time: "20:00", value: 45 },
];

const sleepData = [
  { time: "Day 1", value: 7.2 },
  { time: "Day 2", value: 6.8 },
  { time: "Day 3", value: 8.1 },
  { time: "Day 4", value: 7.5 },
  { time: "Day 5", value: 6.5 },
  { time: "Day 6", value: 7.8 },
  { time: "Day 7", value: 8.2 },
];

export default function WellnessDashboard() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-stellar bg-clip-text text-transparent">
            Wellness Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Your comprehensive mental health overview
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge
            variant="outline"
            className="bg-success/10 text-success border-success/30"
          >
            Mission Day 142
          </Badge>
          <Badge
            variant="outline"
            className="bg-accent/10 text-accent border-accent/30"
          >
            All Systems Nominal
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <WellnessCard
          title="Overall Wellness"
          value="85%"
          icon={<Heart className="h-5 w-5" />}
          status="good"
          trend="up"
          description="Above average for mission parameters"
        />
        <WellnessCard
          title="Mental Clarity"
          value="92%"
          icon={<Brain className="h-5 w-5" />}
          status="excellent"
          trend="stable"
          description="Cognitive performance optimal"
        />
        <WellnessCard
          title="Stress Level"
          value="32%"
          icon={<Activity className="h-5 w-5" />}
          status="moderate"
          trend="down"
          description="Within acceptable range"
        />
        <WellnessCard
          title="Sleep Quality"
          value="7.8h"
          icon={<Moon className="h-5 w-5" />}
          status="good"
          trend="up"
          description="Approaching optimal range"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WellnessChart
          title="Wellness Trend (24 Hours)"
          data={wellnessData}
          type="area"
          color="hsl(var(--accent))"
        />
        <WellnessChart
          title="Stress Levels"
          data={stressData}
          type="line"
          color="hsl(var(--warning))"
        />
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sleep Analysis */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Moon className="h-5 w-5 text-accent" />
              <span>Sleep Analysis (7 Days)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WellnessChart
              title=""
              data={sleepData}
              type="area"
              color="hsl(var(--primary))"
              height={300}
            />
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">7.4h</div>
                <div className="text-sm text-muted-foreground">Average</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">8.2h</div>
                <div className="text-sm text-muted-foreground">Best</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">6.5h</div>
                <div className="text-sm text-muted-foreground">Lowest</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wellness Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-accent" />
              <span>Recommended Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start bg-gradient-aurora/10 border-accent/30 hover:bg-gradient-aurora/20"
              >
                <Waves className="h-4 w-4 mr-2" />
                VR Ocean Meditation
                <Badge variant="secondary" className="ml-auto">
                  15 min
                </Badge>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-gradient-nebula/10 border-primary/30 hover:bg-gradient-nebula/20"
              >
                <Eye className="h-4 w-4 mr-2" />
                Focus Breathing
                <Badge variant="secondary" className="ml-auto">
                  5 min
                </Badge>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-gradient-solar/10 border-warning/30 hover:bg-gradient-solar/20"
              >
                <Activity className="h-4 w-4 mr-2" />
                Gentle Stretching
                <Badge variant="secondary" className="ml-auto">
                  10 min
                </Badge>
              </Button>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Wellness Points</span>
                <span className="text-sm text-muted-foreground">2,847 / 3,000</span>
              </div>
              <Progress value={94.9} className="h-2" />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">
                  153 points to next level
                </span>
                <Award className="h-4 w-4 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Companion */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AICompanion />
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <span>Progress Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Weekly Improvement</span>
                  <span className="text-sm font-medium text-success">+12%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Meditation Streak</span>
                  <span className="text-sm font-medium text-accent">14 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Stress Reduction</span>
                  <span className="text-sm font-medium text-success">-8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Sleep Consistency</span>
                  <span className="text-sm font-medium text-accent">87%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-accent" />
                <span>Mission Readiness</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-accent">94%</div>
                <div className="text-sm text-muted-foreground">
                  Optimal for critical operations
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-cosmic h-2 rounded-full transition-all duration-300"
                    style={{ width: "94%" }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}