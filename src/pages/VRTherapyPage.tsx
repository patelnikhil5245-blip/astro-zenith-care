import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  Headphones,
  Mountain,
  Waves,
  Trees,
  Sun,
  Moon,
  Zap,
  Clock,
  Award,
  Volume2,
} from "lucide-react";

const vrSessions = [
  {
    id: "ocean",
    title: "Ocean Meditation",
    description: "Calming waves and underwater exploration",
    duration: "15 min",
    category: "Relaxation",
    icon: Waves,
    color: "text-blue-400",
    gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
    completions: 24,
    rating: 4.8,
  },
  {
    id: "forest",
    title: "Forest Sanctuary",
    description: "Peaceful woodland with guided breathing",
    duration: "20 min",
    category: "Mindfulness",
    icon: Trees,
    color: "text-green-400",
    gradient: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
    completions: 18,
    rating: 4.9,
  },
  {
    id: "mountain",
    title: "Mountain Peak",
    description: "Sunrise views and achievement visualization",
    duration: "25 min",
    category: "Motivation",
    icon: Mountain,
    color: "text-orange-400",
    gradient: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
    completions: 12,
    rating: 4.7,
  },
  {
    id: "space",
    title: "Cosmic Journey",
    description: "Nebula exploration and deep space meditation",
    duration: "30 min",
    category: "Deep Focus",
    icon: Sun,
    color: "text-purple-400",
    gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
    completions: 8,
    rating: 5.0,
  },
  {
    id: "earth",
    title: "Earth From Space",
    description: "View Earth from ISS perspective",
    duration: "10 min",
    category: "Perspective",
    icon: Sun,
    color: "text-blue-300",
    gradient: "bg-gradient-to-br from-blue-400/20 to-indigo-500/20",
    completions: 31,
    rating: 4.9,
  },
  {
    id: "lunar",
    title: "Lunar Surface",
    description: "Walking on the moon's tranquil landscape",
    duration: "18 min",
    category: "Exploration",
    icon: Moon,
    color: "text-gray-300",
    gradient: "bg-gradient-to-br from-gray-400/20 to-slate-500/20",
    completions: 15,
    rating: 4.6,
  },
];

const breathingExercises = [
  {
    name: "4-7-8 Breathing",
    description: "Inhale 4, hold 7, exhale 8",
    duration: "5 min",
    difficulty: "Beginner",
  },
  {
    name: "Box Breathing",
    description: "Equal counts for all phases",
    duration: "8 min",
    difficulty: "Intermediate",
  },
  {
    name: "Coherent Breathing",
    description: "Balanced inhale and exhale",
    duration: "10 min",
    difficulty: "Advanced",
  },
];

export default function VRTherapyPage() {
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const startSession = (sessionId: string) => {
    setActiveSession(sessionId);
    setIsPlaying(true);
    setSessionProgress(0);
    
    // Simulate session progress
    const interval = setInterval(() => {
      setSessionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          return 100;
        }
        return prev + 1;
      });
    }, 300);
  };

  const pauseSession = () => {
    setIsPlaying(!isPlaying);
  };

  const resetSession = () => {
    setActiveSession(null);
    setIsPlaying(false);
    setSessionProgress(0);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-stellar bg-clip-text text-transparent">
            VR Therapy Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Immersive relaxation and mental wellness experiences
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge
            variant="outline"
            className="bg-accent/10 text-accent border-accent/30"
          >
            <Headphones className="h-3 w-3 mr-1" />
            VR Ready
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Preferences
          </Button>
        </div>
      </div>

      {/* Active Session */}
      {activeSession && (
        <Card className="border-accent/30 bg-gradient-cosmic/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-accent" />
                <span>Active Session</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={pauseSession}
                  className="bg-background/50"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetSession}
                  className="bg-background/50"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">
                {vrSessions.find((s) => s.id === activeSession)?.title}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.floor(sessionProgress / 100 * 15)} / 15 min
              </span>
            </div>
            <Progress value={sessionProgress} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-accent">{sessionProgress}%</div>
                <div className="text-xs text-muted-foreground">Progress</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">72</div>
                <div className="text-xs text-muted-foreground">BPM</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">85%</div>
                <div className="text-xs text-muted-foreground">Relaxation</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="vr-sessions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vr-sessions">VR Sessions</TabsTrigger>
          <TabsTrigger value="breathing">Breathing Exercises</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="vr-sessions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vrSessions.map((session) => {
              const Icon = session.icon;
              return (
                <Card
                  key={session.id}
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-glow group cursor-pointer ${session.gradient}`}
                  onClick={() => !activeSession && startSession(session.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Icon className={`h-8 w-8 ${session.color}`} />
                      <Badge variant="outline" className="text-xs">
                        {session.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{session.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {session.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{session.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="h-4 w-4" />
                        <span>{session.completions}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm">Rating:</span>
                        <span className="text-sm font-medium text-accent">
                          {session.rating}/5
                        </span>
                      </div>
                      <Button
                        size="sm"
                        disabled={!!activeSession}
                        className="bg-gradient-cosmic"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="breathing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {breathingExercises.map((exercise, index) => (
              <Card
                key={index}
                className="transition-all duration-300 hover:shadow-cosmic"
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-accent" />
                    <span>{exercise.name}</span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {exercise.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={`${
                        exercise.difficulty === "Beginner"
                          ? "text-success border-success/30"
                          : exercise.difficulty === "Intermediate"
                          ? "text-warning border-warning/30"
                          : "text-destructive border-destructive/30"
                      }`}
                    >
                      {exercise.difficulty}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {exercise.duration}
                    </span>
                  </div>
                  <Button
                    className="w-full bg-gradient-aurora"
                    disabled={!!activeSession}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Begin Exercise
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Sessions Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">142</div>
                <div className="text-sm text-muted-foreground">
                  +8 this week
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">47.5h</div>
                <div className="text-sm text-muted-foreground">
                  +3.2h this week
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Stress Reduction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">24%</div>
                <div className="text-sm text-muted-foreground">
                  Average per session
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Favorite Session
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">Ocean</div>
                <div className="text-sm text-muted-foreground">
                  24 completions
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Award className="h-8 w-8 text-accent" />
                <div>
                  <div className="font-medium">Meditation Master</div>
                  <div className="text-sm text-muted-foreground">
                    Completed 100 VR sessions
                  </div>
                </div>
                <Badge className="ml-auto bg-accent/20 text-accent">New</Badge>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Trees className="h-8 w-8 text-success" />
                <div>
                  <div className="font-medium">Forest Guardian</div>
                  <div className="text-sm text-muted-foreground">
                    Spent 10 hours in forest meditation
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Waves className="h-8 w-8 text-blue-400" />
                <div>
                  <div className="font-medium">Ocean Explorer</div>
                  <div className="text-sm text-muted-foreground">
                    Mastered ocean breathing techniques
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}