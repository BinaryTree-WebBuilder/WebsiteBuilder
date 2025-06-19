'use client';

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram } from "lucide-react";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 pt-30">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-primary rounded-full opacity-10 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-secondary rounded-full opacity-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-2xl w-full">
        <Card className="shadow-lg animate-fade-in-up border border-gray-200">
          <CardContent className="py-12 px-8 text-center">
            <img
              src="/binarytree-logo.png"
              alt="BinaryTree Logo"
              className="h-10 mb-6 object-contain mx-auto"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Coming <span className="text-gradient">Soon!</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Explore a showcase of standout developer portfolios — and maybe feature yours too.
            </p>


            <div className="mt-10 text-center flex flex-col items-center">
              <p className="text-md text-gray-600 mb-2 font-medium">Follow us on Instagram for sneak peeks:</p>
              <a
                href="https://instagram.com/binarytree.me"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 text-lg font-semibold"
              >
                <Instagram className="w-5 h-5" />
                @binarytree.me
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
