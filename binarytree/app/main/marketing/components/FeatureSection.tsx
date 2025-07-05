
"use client";

import { Button } from "@/components/ui/button";
import { Github, Code, FileText, Monitor, Brain } from "lucide-react";

export const FeatureSection = () => {
  return (
    <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* <div className="text-center mb-20">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-8 animate-fade-in">
              Your <span className="text-gradient">AI Co-Pilot</span> for <br/>Tech Internships and Jobs.{" "}<br/>
              <span className="text-gradient">Get Hired Faster.</span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              <span className="text-gradient font-bold">BinaryTree</span> intelligently crafts your portfolio and tailors your resume from a simple document upload, matching you to roles with precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 animate-fade-in">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Building for Free
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-300 px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              View Live Examples
            </Button>
          </div>
        </div> */}

        {/* Three Feature Showcase */}
        <div className="flex flex-col-1 lg:!flex-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto items-center">
          
          {/* Portfolio Website Feature */}
          <div className="text-center group lg:w-2/3">
            <div className="relative mb-6">
              <div className="h-[450px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform group-hover:scale-105 transition-all duration-300">
                {/* Browser Header */}
                <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="ml-4 bg-white px-3 py-1 rounded text-xs text-gray-600">
                    john.binarytree.me
                  </div>
                </div>

                {/* Portfolio Content */}
                <div className="p-6 h-48 bg-gradient-to-br from-blue-50 to-purple-50">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Code className="h-8 w-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="h-12 bg-blue-100 rounded"></div>
                      <div className="h-12 bg-purple-100 rounded"></div>
                      <div className="h-12 bg-indigo-100 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-2">Portfolio Website</h3>
            <p className="text-gray-600">Create stunning, responsive portfolios that showcase your projects and skills professionally.</p>
          </div>

          {/* Resume Builder Feature */}
<div className="text-center group w-full max-w-[300px]">
  <div className="relative mb-6">
    <div className="bg-white rounded-sm shadow-2xl border border-gray-200 overflow-hidden transform scale-[0.8] transition-all duration-300 w-[300px] h-[420px] mx-auto text-left">
      {/* Resume Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 px-4 py-3 text-white">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-xs font-bold">JOHN DOE</div>
            <div className="text-xs opacity-90">Software Engineer</div>
          </div>
        </div>
      </div>

      {/* Resume Body */}
      <div className="p-4 space-y-2">
        {/* Summary */}
        <div>
          <h4 className="text-xs font-semibold text-gray-800">Professional Summary</h4>
          <p className="text-xs text-gray-700 leading-relaxed">
            Detail-oriented software engineer with 5+ years of experience in full-stack development, cloud systems, and agile workflows.
          </p>
        </div>

        {/* Experience */}
        <div>
          <h4 className="text-xs font-semibold text-gray-800">Experience</h4>
          <div className="space-y-2">
            <div>
              <p className="text-xs font-bold text-gray-700">Senior Developer @ TechCorp</p>
              <p className="text-xs text-gray-600 italic">Jan 2020 – Present</p>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                <li>Led a team of 6 developers to build a microservices-based web application.</li>
                <li>Improved system performance by 30% through caching and query optimization.</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700">Software Engineer @ CodeWorks</p>
              <p className="text-xs text-gray-600 italic">Jun 2017 – Dec 2019</p>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                <li>Developed internal tooling with React and Node.js to automate operations tasks.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Education</h4>
          <p className="text-sm text-gray-700">
            BSc in Computer Science – University of Example (2013 – 2017)
          </p>
        </div>

        {/* Skills */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2 text-sm">
            {["React", "Node.js", "Python", "TypeScript", "AWS", "Docker"].map((skill) => (
              <span key={skill} className="px-2 py-1 bg-teal-100 text-teal-700 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>

  <h3 className="text-xl font-bold mb-2">Smart Resume Builder</h3>
  <p className="text-gray-600">Generate ATS-optimized resumes tailored for tech roles with intelligent formatting.</p>
</div>

          {/* Interview Quiz Feature */}
          {/* <div className="text-center group">
            <div className="relative mb-6">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform group-hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 text-white">
                  <div className="text-sm font-semibold">Technical Interview Quiz</div>
                  <div className="text-xs opacity-90">Question 3 of 10</div>
                </div>
                
                <div className="p-6 h-48">
                  <div className="text-sm font-medium text-gray-900 mb-4">
                    What is the time complexity of searching in a balanced BST?
                  </div>

                  <div className="space-y-2">
                    <button className="w-full text-left text-sm px-4 py-2 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors border">
                      A. O(n)
                    </button>
                    <button className="w-full text-left text-sm px-4 py-2 bg-purple-50 rounded-lg border-2 border-purple-200">
                      B. O(log n) ✓
                    </button>
                    <button className="w-full text-left text-sm px-4 py-2 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors border">
                      C. O(n²)
                    </button>
                    <button className="w-full text-left text-sm px-4 py-2 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors border">
                      D. O(1)
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Icon */}
              {/* <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Brain className="h-5 w-5 text-white" />
              </div> */}
            {/* </div> */}

            {/* <h3 className="text-xl font-bold mb-2">Interview Prep</h3>
            <p className="text-gray-600">Master technical interviews with curated questions and detailed explanations.</p>
          </div>  */}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-lg text-gray-600 mb-6">
            Join thousands of developers who landed their dream jobs
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>✨ Free to start</span>
            <span>•</span>
            <span>🚀 No credit card required</span>
            <span>•</span>
            <span>⚡ Ready in minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
};
