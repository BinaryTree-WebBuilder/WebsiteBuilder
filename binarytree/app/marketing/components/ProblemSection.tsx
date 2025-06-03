import { Card, CardContent } from "@/components/ui/card";

export const ProblemSection = () => {
  const problems = [
    {
      icon: "⏰",
      title: "Wasting Time on Boilerplate",
      description: "Spending valuable engineering hours on repetitive portfolio setup, design principles, and UI/UX issues instead of coding."
    },
    {
      icon: "📋",
      title: "Static Resumes Don't Showcase Code",
      description: "Generic templates don't let your unique projects, backend logic, or problem-solving skills truly shine."
    },
    {
      icon: "🔗",
      title: "Scattered Links Hurt Your Story",
      description: "Your work is everywhere. Recruiters need one clean, central hub to see your complete professional story quickly."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tired of the Usual Portfolio Headaches?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We know the struggle. You're a developer, not a designer. 
            Let's fix these common frustrations once and for all.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
              <CardContent className="p-8 text-center">
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