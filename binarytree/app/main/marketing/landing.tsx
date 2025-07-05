import { HeroSection } from "./components/HeroSection";
import { ProblemSection } from "./components/ProblemSection";
import { SolutionSection } from "./components/SolutionSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { CTASection } from "./components/CTASection";
import { FeatureSection } from "./components/FeatureSection";


const Index = () => {
  return (
    <div className="min-h-screen bg-white">
       <HeroSection />
      <ProblemSection />
      <FeatureSection />
      <SolutionSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
};

export default Index;