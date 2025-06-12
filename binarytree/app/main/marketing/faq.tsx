
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


const FAQ = () => {
  const faqs = [
    {
      question: "Is Binarytree really free?",
      answer: "Yes! Our free plan includes everything you need to get started: a premium binarytree.me domain, customer support, high-performance pages, and up to 5 projects for your portfolio, Nuild your Free Portfolio Today!"
    },
    {
      question: "How is this different from other portfolio builders?",
      answer: "Binarytree is purpose-built for developers. We understand your need to showcase technical projects, link GitHub repos, and display development skills in a way that impresses recruiters and hiring managers."
    },
    {
      question: "Can I use my own domain?",
      answer: "Yes! With our Pro plan coming soon, you can connect your own custom domain. Free users get a premium binarytree.me subdomain that looks professional and is perfect for getting started."
    },
    {
      question: "What's included in the Pro plan?",
      answer: "Pro includes custom domain connection, AI Rewrite tools, premium templates, contact form integration, removal of the 'Made with Binarytree' badge, +25 projects, and many more, coming soon."
    },
    {
      question: "How quickly can I set up my portfolio?",
      answer: "You can have your portfolio live in minutes! Simply sign up, add your projects and information, and publish. No coding or design skills required."
    },
    {
      question: "Is there customer support?",
      answer: "Yes! Both free and Pro users get access to our customer support team. We're here to help you create the best possible portfolio and get hired faster!"
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "You can upgrade to Pro at any time. Since our free plan is always available, you can also downgrade if needed, though some Pro features will no longer be accessible."
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
              Got questions? We've got answers.
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
              Can't find the answer you're looking for? Our support team is here to help.
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