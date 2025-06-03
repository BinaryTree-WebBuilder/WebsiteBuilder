import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Header } from "../marketing/components/Header";
import { Footer } from "../marketing/components/Footer";

const Pricing = () => {
  const features = [
    "Premium binarytree.me domain",
    "Customer support", 
    "High performance pages",
    "Has 'Made with BinaryTree' badge",
    "Popup for each project",
    "7 Section Max"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Main Content */}
      <div className="pt-36 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Free Today, Pro Tomorrow!
            </h1>
            <p className="text-xl text-gray-600 max-w-6xl mx-auto">
            Start building your professional portfolio today. We're constantly evolving, and a powerful Pro version packed with even more features is just around the corner!            
            </p>
          </div>

          {/* Pricing Card */}
          <div className="flex justify-center">
            <Card className="p-0 w-full max-w-md border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
              <CardHeader className="py-6 text-center bg-gradient-primary text-white rounded-t-lg">
                <CardTitle className="text-3xl font-bold mb-2">FREE</CardTitle>
                <div className="text-5xl font-bold mb-2">$0</div>
                <p className="text-blue-100">Forever free to get started</p>
              </CardHeader>
              
              <CardContent className="p-8">
                <ul className="space-y-4 mb-8">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90 text-white py-3 text-lg font-semibold"
                  asChild
                >
                  <Button>
                    Get Started Free
                  </Button>
                </Button>
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  No credit card required
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-16 animate-fade-in-up">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready to showcase your work?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of developers who've already transformed their careers with BinaryTree.
            </p>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
              asChild
            >
              <Button>
                View Live Examples
              </Button>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Pricing;