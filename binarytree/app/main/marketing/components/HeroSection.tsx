"use client";

import { Button } from "@/components/ui/button";
import { Github, Code } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className=" pt-36 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className=" max-w-8xl mx-auto text-center animate-fade-in-up">
        {/* <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          Now live in MVP
        </div> */}



              {/* Portfolio Mockup Centered */}
      <div className="max-w-2xl mx-auto relative mb-12 animate-fade-in-up">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-float">
          {/* Browser Header */}
          <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <div className="ml-4 bg-white px-3 py-1 rounded text-xs text-gray-600">
              john.binarytree.com
            </div>
          </div>

          {/* Portfolio Screenshot */}
          <div className="w-full h-[350px] bg-black">
            <img
              src="/portfolio-preview.png"
              alt="John's Website Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Floating Icons */}
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-tertiary rounded-full flex items-center justify-center animate-pulse-slow">
          <Github className="h-6 w-6 text-white" />
        </div>
        <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center animate-pulse-slow">
          <Code className="h-5 w-5 text-white" />
        </div>


                        {/* Resume Mockup - Left Side */}
        <div className="absolute -bottom-30 -left-4 transform -translate-y-1/2  animate-fade-in-left">
          <div className="w-[118px] h-[168px] bg-white rouded.xs shadow-xl border border-gray-200 overflow-hidden animate-float-delayed">
            {/* Resume Header */}
            <div className=" from-blue-500 to-purple-600 px-4 py-3">
              <div className="w-8 h-8 bg-white rounded-full mx-auto mb-2"></div>
              <div className="text-xs font-semibold text-center">JOHN DOE</div>
            </div>
            
            {/* Resume Content */}
            <div className="p-4 space-y-3">
              <div className="space-y-1">
                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
              </div>
              
              <div className="space-y-2">
                <div className="h-1.5 bg-blue-100 rounded w-full"></div>
                <div className="h-1.5 bg-blue-100 rounded w-4/5"></div>
                <div className="h-1.5 bg-blue-100 rounded w-3/5"></div>
              </div>
              
              <div className="space-y-2">
                <div className="h-1.5 bg-purple-100 rounded w-full"></div>
                <div className="h-1.5 bg-purple-100 rounded w-2/3"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

        <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
          Your Ultimate Toolkit for <br />
          <span className="text-gradient"> Tech Internships and Jobs</span>
        </h1>

        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          <span className="">Conquer every step of the tech job hunt – Confidently build, apply, and interview your way to success.</span>
        </p>
      </div>


      {/* CTA Buttons */}
      <div className="flex flex-col md:!flex-row gap-4 justify-center items-center text-center max-w-2xl mx-auto animate-fade-in-up">
        <Link href="/auth/register">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-gradient-primary hover:opacity-90 text-white px-8 py-8 text-lg font-semibold"
          >
            Build Your Free Portfolio Now
          </Button>
        </Link>

        <Link href="/main/portfolio">
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto text-gradient hover:opacity-90 px-8 py-8 text-lg border-gray-300 hover:bg-gray-50"
          >
            View Other Portfolios
          </Button>
        </Link>
      </div>

    </section>
  );
};
