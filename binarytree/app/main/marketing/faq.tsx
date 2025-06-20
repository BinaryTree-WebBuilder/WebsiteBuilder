
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


const FAQ = () => {
  const faqs = [
  {
    "question": "Is Binarytree really free?",
    "answer": "Yes! Our free plan includes everything you need to get started: a premium binarytree.me domain, customer support, high-performance pages, and up to 4 projects for your portfolio. Build your Free Portfolio Today!"
  },
  {
    "question": "How is this different from other portfolio builders?",
    "answer": "Binarytree is purpose-built for developers. We understand your need to showcase technical projects, link GitHub repos, and display development skills in a way that impresses recruiters and hiring managers."
  },
  {
    "question": "Can I use my own domain?",
    "answer": "Currently, all users receive a premium binarytree.me subdomain that looks professional and is perfect for getting started. We are exploring options for custom domains in the future based on user feedback."
  },
  {
    "question": "What premium features does Binarytree offer?",
    "answer": "Our free plan provides a robust set of features to build a stunning portfolio. We are continuously working on new enhancements and will introduce more advanced features based on user demand and feedback."
  },
  {
    "question": "How quickly can I set up my portfolio?",
    "answer": "You can have your portfolio live in minutes! Simply sign up, add your projects and information, and publish. No coding or design skills required."
  },
  {
    "question": "Is there customer support?",
    "answer": "Yes! All Binarytree users get access to our customer support team. We're here to help you create the best possible portfolio and get hired faster!"
  },
  {
    "question": "Are there different plans available?",
    "answer": "Currently, we offer a comprehensive free plan designed to help you create a professional online presence. We are gathering user feedback to determine future plan offerings that best meet the needs of our community."
  }
];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Main Content */}
      <div className="pt-36 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-gradient"> Questions</span>
            </h1>
            <p className="lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Got questions? We&apos;ve got answers.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="animate-fade-in-up">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-gray-200 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-lg cursor-pointer text-left font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* CTA Section */}
          {/* <div className="text-center mt-16 animate-fade-in-up">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-primary hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-opacity">
                Contact Support
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors">
                Get Started Free
              </button>
            </div>
          </div> */}
        </div>
      </div>      
    </div>
  );
};

export default FAQ;