
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Github, 
  Zap, 
  Palette, 
  Globe, 
  BarChart3, 
  Mail, 
  Shield,
  Smartphone,
  Users
} from "lucide-react";
import Link from "next/link";

const Features = () => {
  const features = [
    {
      icon: Code,
      title: "Enhanced Showcase",
      description: "Display your project details with links to Github, videos or even live demos and impress recruiters.",
      comingSoon: false
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "High-performance pages that load instantly, ensuring your portfolio makes a great first impression.",
      comingSoon: false
    },
    {
      icon: Palette,
      title: "Developer-First Design",
      description: "Clean, professional templates designed specifically for technical portfolios and developer needs.",
      comingSoon: false
    },
    {
      icon: Shield,
      title: "Always Secure",
      description: "SSL certificates, secure hosting, and reliable uptime ensure your portfolio is always accessible.",
      comingSoon: false
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Responsive design that looks perfect on all devices, from desktop to mobile.",
      comingSoon: false
    },
    {
      icon: Users,
      title: "Recruiter Friendly",
      description: "Layouts optimized for how recruiters and hiring managers actually review developer portfolios.",
      comingSoon: false
    },    
    {
        icon: Globe,
        title: "Custom Domains",
        description: "Connect your own domain or use our premium binarytree.me subdomain for a professional presence.",
        comingSoon: true
      },
      {
        icon: BarChart3,
        title: "Analytics Integration",
        description: "Track your portfolio performance with Google Analytics integration to see who's viewing your work.",
        comingSoon: true
      },
      {
        icon: Mail,
        title: "Contact Forms",
        description: "Let potential employers reach you directly with integrated contact forms and lead capture.",
        comingSoon: true
      },
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Main Content */}
      <div className="pt-30 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Features Built for
              <span className="text-gradient block">Developers</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create a professional portfolio that showcases your skills and gets you hired. 
              Built specifically for the tech community.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`border transition-all duration-300 animate-fade-in-up relative ${
                  feature.comingSoon 
                    ? 'border-gray-200 opacity-60 hover:opacity-80' 
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {feature.comingSoon && (
                  <Badge 
                    variant="secondary" 
                    className="absolute top-4 right-4 bg-orange-100 text-orange-700 hover:bg-orange-100"
                  >
                    Coming Soon
                  </Badge>
                )}
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    feature.comingSoon 
                      ? 'bg-gray-300' 
                      : 'bg-gradient-primary'
                  }`}>
                    <feature.icon className={`h-6 w-6 ${
                      feature.comingSoon ? 'text-gray-500' : 'text-white'
                    }`} />
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${
                    feature.comingSoon ? 'text-gray-600' : 'text-gray-900'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`leading-relaxed ${
                    feature.comingSoon ? 'text-gray-500' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-primary rounded-2xl p-12 text-white animate-fade-in-up">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Build Your Portfolio?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who've already transformed their careers with Binarytree. 
              Get started in minutes, no coding required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                asChild
              >
                <Link href="/">
                  Get Started Free
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold"
                asChild
              >
                <Link href="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Features;