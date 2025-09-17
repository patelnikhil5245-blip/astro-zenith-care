import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WellnessChart } from "@/components/charts/WellnessChart";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  Users,
  AlertTriangle,
  CheckCircle,
  Activity,
  Brain,
  Heart,
  Zap,
} from "lucide-react";

const crewMembers = [
  {
    id: "1",
    name: "Commander Sarah Chen",
    role: "Mission Commander",
    wellness: 92,
    status: "excellent",
    lastCheck: "2 min ago",
    alerts: 0,
  },
  {
    id: "2", 
    name: "Dr. Marcus Rodriguez",
    role: "Flight Engineer",
    wellness: 78,
    status: "moderate",
    lastCheck: "5 min ago",
    alerts: 1,
  },
  {
    id: "3",
    name: "Yuki Tanaka",
    role: "Mission Specialist", 
    wellness: 85,
    status: "good",
    lastCheck: "1 min ago",
    alerts: 0,
  },
];

const teamData = [
  { time: "Mon", value: 85 },
  { time: "Tue", value: 82 },
  { time: "Wed", value: 88 },
  { time: "Thu", value: 79 },
  { time: "Fri", value: 83 },
  { time: "Sat", value: 87 },
  { time: "Sun", value: 85 },
];

export default function MissionControlPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-stellar bg-clip-text text-transparent">
            Mission Control Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time crew wellness monitoring and alerts
          </p>
        </div>
        <Badge className="bg-gradient-cosmic">
          <Shield className="h-3 w-3 mr-1" />
          Authorized Personnel Only
        </Badge>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {crewMembers.map((member) => (
          <Card key={member.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{member.name}</CardTitle>
                {member.alerts > 0 ? (
                  <AlertTriangle className="h-5 w-5 text-warning" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-success" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Wellness Score</span>
                  <span className="text-sm font-medium">{member.wellness}%</span>
                </div>
                <Progress value={member.wellness} className="h-2" />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Check:</span>
                <span>{member.lastCheck}</span>
              </div>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Wellness Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WellnessChart
          title="Team Wellness Trend (7 Days)"
          data={teamData}
          type="area"
          color="hsl(var(--accent))"
          height={300}
        />
        <Card>
          <CardHeader>
            <CardTitle>Critical Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg border border-warning/30">
              <div className="flex items-center space-x-3">
                <Brain className="h-5 w-5 text-warning" />
                <div>
                  <div className="font-medium">Elevated Stress</div>
                  <div className="text-sm text-muted-foreground">Dr. Rodriguez</div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Respond
              </Button>
            </div>
            <div className="text-center text-muted-foreground py-8">
              All other systems nominal
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}