import { Card, CardContent } from "@/components/ui/card";

export const ProblemSection = () => {
  const problems = [
    {
      icon: "⏰",
      title: "Time Drain & Distraction",
      description: "Building your portfolio website or keeping it updated eats into valuable coding, LeetCode, or project time. Stop the endless fussing over design and minor tweaks."
    },
    {
      icon: "📝",
      title: "Hidden Potential",
      description: "Your static resume just can't showcase your actual code, dynamic projects, or unique problem-solving skills, leaving recruiters guessing about your true abilities."
    },
    {
      icon: "🤯", // Changed icon for emphasis on mental load/anxiety
      title: "Application Overwhelm",
      description: "Constantly rewriting and reorganizing your resume and portfolio for different roles (frontend, backend, data) is stressful and inefficient, leading to missed opportunities."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl lg:text-4xl font-bold main-text-color mb-4">
            Tired of the Usual <span className="text-gradient">Portfolio Headaches?</span>
          </h2>
          <p className="text-base lg:text-xl text-gray-600 max-w-8xl mx-auto">
            Static resumes, scattered versions, wasted hours — time for a smarter portfolio.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
              <CardContent className="p-4 lg:p-8 text-center">
                <div className="text-4xl mb-4">{problem.icon}</div>
                <h3 className="text-xl font-semibold main-text-color mb-4">
                  {problem.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};