import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Curation from "./pages/Curation";
import Legacy from "./pages/Legacy";
import Journal from "./pages/Journal";
import Concierge from "./pages/Concierge";
import NotFound from "./pages/NotFound";

import { ThemeProvider } from "next-themes";

import Atelier from "./pages/Atelier";
import Innovation from "./pages/Innovation";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/curation" element={<Curation />} />
              <Route path="/legacy" element={<Legacy />} />
              <Route path="/atelier" element={<Atelier />} />
              <Route path="/innovation" element={<Innovation />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/concierge" element={<Concierge />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;