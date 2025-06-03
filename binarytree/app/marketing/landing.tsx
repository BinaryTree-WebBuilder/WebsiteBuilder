
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Github, Code, Book, FileText, ArrowUp } from "lucide-react";
import { Header } from "../marketing/components/Header";
import { HeroSection } from "../marketing/components/HeroSection";
import { ProblemSection } from "../marketing/components/ProblemSection";
import { SolutionSection } from "../marketing/components/SolutionSection";
import { HowItWorksSection } from "../marketing/components/HowItWorksSection";
import { CTASection } from "../marketing/components/CTASection";

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