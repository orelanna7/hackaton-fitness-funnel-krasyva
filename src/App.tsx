import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PhotoUpload from "./pages/funnel/PhotoUpload";
import CategoryAnalysis from "./pages/funnel/CategoryAnalysis";
import SportMatch from "./pages/funnel/SportMatch";
import Pricing from "./pages/funnel/Pricing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/funnel/photo-upload" element={<PhotoUpload />} />
          <Route
            path="/funnel/category-analysis"
            element={<CategoryAnalysis />}
          />
          <Route path="/funnel/sport-match" element={<SportMatch />} />
          <Route path="/funnel/pricing" element={<Pricing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
