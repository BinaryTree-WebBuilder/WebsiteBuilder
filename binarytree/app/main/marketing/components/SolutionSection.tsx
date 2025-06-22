import { Card, CardContent } from "@/components/ui/card";
import { Users, Check, PanelsTopLeft, Github, FileText } from "lucide-react";

export const SolutionSection = () => {
  const features = [
    {
      icon: <PanelsTopLeft className="h-8 w-8 text-blue-600" />,
      title: "Your Own Personal Portfolio Website",
      subtitle: "Seamless & Simple",
      description: "Get a professional, unique online presence at yourusername.binarytree.com. We handle hosting, security, and tech-heavy lifting.",
      benefit: "Focus on building awesome projects, not battling website builders. Launch in minutes, not days."
    },
    {
      icon: <Github className="h-8 w-8 text-purple-600" />,
      title: "Showcase Technical Depth",
      subtitle: "Tailored for Tech",
      description: "Dedicated components for detailed project descriptions, code snippets, diagrams, screenshots, and direct links to GitHub or live demos.",
      benefit: "Impress hiring managers with tangible proof of your skills, coding style, and system understanding."
    },
    {
      icon: <FileText className="h-8 w-8 text-green-600" />,
      title: "Recruiter-Ready Layouts",
      subtitle: "Designed to Get You Hired",
      description: "Meticulously designed template ensures a professional look optimized for busy recruiters. Organize Education, Experience, and Projects and more perfectly.",
      benefit: "Stand out with a polished portfolio and download it instantly as an ATS-friendly resume."
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: "Connect & Get Discovered",
      subtitle: "Beyond Just a Website",
      description: "Consolidate all professional links into one shareable hub. Built to help you connect with your network and get discovered by recruiters.",
      benefit: "Expand your reach, find collaborators, and open doors by making your profile instantly accessible."
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl lg:text-4xl  font-bold mb-4">
            <span className="text-gradient">Binarytree</span>: Your Professional Edge, Built in Minutes
          </h2>
          <p className="text-base lg:text-xl  max-w-8xl mx-auto">
          Turn your projects into job offers. Build a powerful online portfolio designed for recruiters, in minutes.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up group" 
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <CardContent className="p-4 lg:p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <div className="mb-3">
                      <h3 className="text-xl font-semibold main-text-color mb-1">
                        {feature.title}
                      </h3>
                      <span className="text-sm font-medium text-blue-600">
                        {feature.subtitle}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-start space-x-2 p-3 bg-green-50 rounded-lg">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-green-800 text-sm font-medium">
                        {feature.benefit}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};