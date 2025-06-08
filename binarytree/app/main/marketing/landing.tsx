
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Github, Code, Book, FileText, ArrowUp } from "lucide-react";
import { Header } from "../Header";
import { HeroSection } from "./components/HeroSection";
import { ProblemSection } from "./components/ProblemSection";
import { SolutionSection } from "./components/SolutionSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { CTASection } from "./components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
       <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
};

export default Index;