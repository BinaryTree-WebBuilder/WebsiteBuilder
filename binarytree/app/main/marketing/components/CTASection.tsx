import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from 'next/link';


export const CTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-primary">
      <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Your Next Opportunity is Waiting
        </h2>
        <p className="text-base lg:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          {/* Join thousands of developers who've already transformed their careers with Binarytree. 
          Start building your standout portfolio today. */}

          Join thousands of developers who is ready to transformed their careers with Binarytree. 
          Start building your standout portfolio today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/auth/register">
          <Button 
                size="lg" 
                variant="ghost" 
                className="hover:text-gray-800 text-base px-10 py-10 cursor-pointer bg-white"
              >
                <span className="text-gradient lg:text-xl">Start Building Your Portfolio Now!</span>
              </Button>
          </Link>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-blue-100">
          <span className="flex items-center">
            <Check className="mr-2 h-5 w-5" />
            No credit card required
          </span>
          <span className="flex items-center">
            <Check className="mr-2 h-5 w-5" />
            Premium domains included
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