import { Card, CardContent } from "@/components/ui/card";

export const ProblemSection = () => {
  const problems = [
    {
      icon: "⏰",
      title: "Wasting Time",
      description: "Stop wasting valuable engineering hours building your portfolio website, fussing over design, UI/UX issues, or struggling with every new project update"
    },
    {
      icon: "📋",
      title: "Static Resumes",
      description: "Static resumes don't capture your full potential. They hide your actual code, dynamic projects, and technical problem-solving."
    },
    {
      icon: "🔗",
      title: "Scattered Links",
      description: "No more sending multiple links to recruiters. Consolidate your project websites, GitHub repositories, and live demos into one central, easy-to-navigate portfolio they'll love."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Tired of the Usual Portfolio Headaches?
          </h2>
          <p className="text-base lg:text-xl text-gray-600 max-w-8xl mx-auto">
            We know the struggle. You're a developer, not a designer. 
            Let's fix these common frustrations once and for all.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
              <CardContent className="p-4 lg:p-8 text-center">
                <div className="text-4xl mb-4">{problem.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
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