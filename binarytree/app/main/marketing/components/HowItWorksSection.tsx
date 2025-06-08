
import { Card, CardContent } from "@/components/ui/card";

export const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Sign Up Free",
      description: "Create your BinaryTree account in seconds. No credit card required, no hidden fees.",
      icon: "🚀"
    },
    {
      number: "02", 
      title: "Add Your Content",
      description: "Easily drop in your projects, resume details, and skills using our intuitive editor with rich visuals.",
      icon: "✨"
    },
    {
      number: "03",
      title: "Publish & Share",
      description: "Get your unique username.binarytree.com link and share it everywhere – resume, LinkedIn, job applications!",
      icon: "🎯"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Get Started in <span className="text-gradient">3 Simple Steps</span> 
          </h2>
          <p className="text-base lg:text-xl text-gray-600">
            From zero to hero portfolio in under 5 minutes
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-1/2 left-1/4 w-1/3 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 transform -translate-y-1/2"></div>
          <div className="hidden md:block absolute top-1/2 left-2/4 w-1/3 h-0.5 bg-gradient-to-r from-purple-300 to-pink-300 transform -translate-y-1/2"></div>
          
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up relative z-10 bg-white"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <CardContent className="p-4 lg:p-8 text-center">
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="text-sm font-bold text-blue-600 mb-2">STEP {step.number}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};