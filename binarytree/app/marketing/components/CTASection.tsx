import { Button } from "@/components/ui/button";
import { ArrowUp, Check } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-primary">
      <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Your Next Opportunity is Waiting
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of developers who've already transformed their careers with BinaryTree. 
          Start building your standout portfolio today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
          >
            Build Your Free Portfolio Today
            <ArrowUp className="ml-2 h-5 w-5 rotate-45" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
          >
            View Live Examples
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-blue-100">
          <span className="flex items-center">
            <Check className="mr-2 h-5 w-5" />
            No credit card required
          </span>
          <span className="flex items-center">
            <Check className="mr-2 h-5 w-5" />
            Custom domains included
          </span>
          <span className="flex items-center">
            <Check className="mr-2 h-5 w-5" />
            Upgrade anytime
          </span>
        </div>
      </div>
    </section>
  );
};