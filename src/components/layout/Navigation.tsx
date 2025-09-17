import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Activity,
  Shield,
  Users,
  Settings,
  Menu,
  X,
  Rocket,
  Heart,
  Zap,
} from "lucide-react";

const navigationItems = [
  {
    title: "Wellness Dashboard",
    href: "/",
    icon: Heart,
    description: "Personal wellness overview",
  },
  {
    title: "Biometric Monitor",
    href: "/biometrics",
    icon: Activity,
    description: "Real-time health data",
  },
  {
    title: "AI Companion",
    href: "/companion",
    icon: Brain,
    description: "Mental health support",
  },
  {
    title: "VR Therapy",
    href: "/therapy",
    icon: Zap,
    description: "Immersive relaxation",
  },
  {
    title: "Mission Control",
    href: "/mission-control",
    icon: Shield,
    description: "Team oversight",
    badge: "Admin",
  },
  {
    title: "Crew Status",
    href: "/crew",
    icon: Users,
    description: "Team wellness",
  },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-card/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Rocket className="h-8 w-8 text-accent animate-pulse-glow" />
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-md animate-pulse-glow" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-stellar bg-clip-text text-transparent">
                AstroMind
              </span>
              <span className="text-xs text-muted-foreground">
                Mental Health Monitor
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "relative group transition-all duration-300",
                      isActive && "bg-gradient-cosmic shadow-glow"
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.title}
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="ml-2 text-xs bg-accent/20 text-accent border-accent/30"
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {isActive && (
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-stellar rounded-full" />
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border mt-4 pt-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <div
                      className={cn(
                        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-300",
                        isActive
                          ? "bg-gradient-cosmic shadow-glow"
                          : "hover:bg-muted/50"
                      )}
                    >
                      <Icon className="h-5 w-5 text-accent" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-accent/20 text-accent border-accent/30"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}