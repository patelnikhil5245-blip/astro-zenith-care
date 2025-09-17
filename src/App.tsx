import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import WellnessDashboard from "./pages/WellnessDashboard";
import BiometricsPage from "./pages/BiometricsPage";
import VRTherapyPage from "./pages/VRTherapyPage";
import MissionControlPage from "./pages/MissionControlPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <Routes>
            <Route path="/" element={<WellnessDashboard />} />
            <Route path="/biometrics" element={<BiometricsPage />} />
            <Route path="/therapy" element={<VRTherapyPage />} />
            <Route path="/mission-control" element={<MissionControlPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
