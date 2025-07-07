"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Code } from "lucide-react";
import Link from 'next/link';


export const HeroSection = () => {
  return (
    <section className="pt-26 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-left">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Now live in MVP
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Your <span className="text-gradient">Tech Portfolio,</span> Simplified.{" "}
              Land More <span className="text-gradient">Opportunities.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              <span className="text-gradient font-bold">BinaryTree</span> intelligently crafts your portfolio and tailors your resume from a simple document upload, matching you to roles with precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="w-full bg-gradient-primary hover:opacity-90 text-white px-8 py-8 text-lg font-semibold cursor-pointer"
                >
                  Build Your Free Portfolio Now
                </Button>
              </Link>

              <Link href="/main/portfolio">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-gradient hover:opacity-90 px-8 py-8 text-lg border-gray-300 hover:bg-gray-50 cursor-pointer"
                >
                  View Other Portfolios
                </Button>
              </Link>

              {/* <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-8 text-lg border-gray-300 hover:bg-gray-50 cursor-pointer"
              >
                <span className="text-gradient">View Examples</span>
              </Button> */}
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <span className="flex items-center mr-6">
                ✨ No credit card required
              </span>
              <span className="flex items-center mr-6">
                🚀 Free premium domain
              </span>
              <span className="flex items-center">
                ⚡  Ready in Minutes
              </span>
            </div>
          </div>

          <div className="animate-fade-in-right">
            <div className="relative">
              {/* Portfolio Mockup */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-float">
                <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="ml-4 bg-white px-3 py-1 rounded text-xs text-gray-600">
                    john.binarytree.com
                  </div>
                </div>

                <div className="p-6 pb-0">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-secondary rounded-full flex items-center justify-center">
                      <Code className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base lg:text-lg font-semibold text-gray-900">John Smith</h3>
                      <p className="text-xs lg:text-base text-gray-600">Full Stack Developer</p>
                    </div>
                  </div>

                  <div className="space-y-3">

                    <div className="flex-1 flex flex-col gap-4 justify-between p-4 pl-0">

                      <Card className="relative flex flex-row overflow-clip gap-4 border-none p-0 shadow-xs hover:!shadow-xl cursor-pointer transition-shadow duration-300">
                        <div className="w-2/5 lg:w-1/5">
                          <img
                            src="https://vlgjnvjuxgorhowvkfzt.supabase.co/storage/v1/object/public/stock-images//arpad-czapp-2t6st8T_J3k-unsplash.jpg"
                            alt="Hello World App"
                            className="object-cover w-full h-full"
                          />
                        </div>

                        <div className="flex flex-col justify-between h-full gap-40 w-4/5 p-1">
                          <div className="flex flex-col lg:!flex-row w-full justify-between items-start gap-8">
                            <div>
                              <h2 className="font-bold text-base">🌎 Hello World App</h2>
                              <p className="text-xs font-medium text-gray-600 mt-1 truncate-3-lines">A classic "Hello, World!" application written in Python. This program prints the text "Hello, World!" to the console, serving as a fundamental first step for any new programmer and a quick way to verify that your Python environment is set up correctly.</p>

                            </div>
                          </div>
                        </div>


                      </Card>

                      <Card className="relative  flex flex-row overflow-clip gap-4 border-none p-0 shadow-xs hover:!shadow-xl cursor-pointer transition-shadow duration-300">
                        <div className="w-2/5 lg:w-1/5">
                          <img
                            src="https://vlgjnvjuxgorhowvkfzt.supabase.co/storage/v1/object/public/stock-images//christopher-gower-m_HRfLhgABo-unsplash.jpg"
                            alt="Hello World App"
                            className="object-cover w-full h-full"
                          />
                        </div>

                        <div className="flex flex-col justify-between h-full gap-40 w-4/5 p-1">
                          <div className="flex flex-col lg:!flex-row w-full justify-between items-start gap-8">
                            <div>
                              <h2 className="font-bold text-base">🤖 AI Chat Bot</h2>
                              <p className="text-xs font-medium text-gray-600 mt-1 truncate-3-lines">A conversational AI chatbot built using Python. This project leverages a deep learning model created with TensorFlow for Natural Language Understanding (NLU) and exposes its functionality through a flexible REST API for easy integration with other applications.</p>

                            </div>
                          </div>
                        </div>


                      </Card>


                    </div>

                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-tertiary rounded-full flex items-center justify-center animate-pulse-slow">
                <Github className="h-6 w-6 text-white" />
              </div>

              <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center animate-pulse-slow">
                <Code className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};