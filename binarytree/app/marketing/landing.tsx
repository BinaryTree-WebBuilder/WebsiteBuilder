"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Clock, Users, Zap, Github, ExternalLink, User, BarChart3 } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';


const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GitBranch className="h-8 w-8 text-slate-600" />
              <span className="text-2xl font-bold text-slate-900 font-consolas">BinaryTree</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 cursor-pointer">
                Log In
              </Button>
              <Button className="bg-slate-700 hover:bg-slate-800 text-white pointer-events-auto cursor-pointer">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-slate-200 text-slate-700 hover:bg-slate-200">
              Your CS Portfolio, Simplified
            </Badge>
            <h1 className="h-24 text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Your Linktree, but for
              <span className="text-slate-700 block font-consolas">
                
              <Typewriter
                words={['CS portfolios']}
                loop={1}                // No loop
                cursor                  // Show the cursor
                cursorStyle=""         // Customize cursor
                typeSpeed={40}          // Typing speed
                deleteSpeed={140}         // No deletion
                delaySpeed={1000}       // Delay after typing
                />
                
                
                </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Showcase your code, projects, and resume professionally. 
              Impress recruiters and connect with your tech network—minus the template fluff.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-3 cursor-pointer">
                Create Your Portfolio
              </Button>
              <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 px-8 py-3 cursor-pointer">
                View Examples
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              The CS Student's Dilemma
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              You shouldn't have to choose between building projects and building a portfolio website
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Time-Consuming Website Building</h3>
                  <p className="text-slate-600">Students spend weeks building portfolios from scratch instead of focusing on actual projects</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <User className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Static Resume Limitations</h3>
                  <p className="text-slate-600">Traditional resumes can't showcase dynamic projects, GitHub repos, or video demos</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Scattered Work</h3>
                  <p className="text-slate-600">Projects spread across GitHub, LinkedIn, personal sites—recruiters lose the full picture</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-100 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">For Recruiters</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span>Difficulty assessing technical skills quickly</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span>Time wasted sifting through disparate links</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span>Unpolished personal sites hurt candidate assessment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Your Professional CS Hub, In Minutes
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Stop building websites. Start showcasing your work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="bg-slate-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-slate-700" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Extreme Simplicity</h3>
                <p className="text-slate-600">Portfolio ready in minutes, not days. No design skills required.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="bg-slate-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Github className="h-8 w-8 text-slate-700" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 font-consolas">CS-Specific Focus</h3>
                <p className="text-slate-600">Built for showcasing code, projects, and technical skills effectively.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="bg-slate-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="h-8 w-8 text-slate-700" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Centralized Hub</h3>
                <p className="text-slate-600">One shareable link consolidates all your professional information.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="bg-slate-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-slate-700" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Network Ready</h3>
                <p className="text-slate-600">Designed for discovery and connections within the tech community.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Built for the Next Generation of Developers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-sm bg-slate-50">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 font-consolas">CS Students</h3>
                <p className="text-slate-600 mb-4">
                  Undergraduates, Master's, and Ph.D. candidates who need to showcase their academic projects and research.
                </p>
                <ul className="text-slate-600 space-y-2">
                  <li>• Course projects and assignments</li>
                  <li>• Research publications</li>
                  <li>• Internship applications</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-sm bg-slate-50">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 font-consolas">Bootcamp Graduates</h3>
                <p className="text-slate-600 mb-4">
                  Career changers transitioning into tech who need to demonstrate their newly acquired skills.
                </p>
                <ul className="text-slate-600 space-y-2">
                  <li>• Portfolio projects</li>
                  <li>• Skill demonstrations</li>
                  <li>• Career transition stories</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-sm bg-slate-50">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 font-consolas">Entry-Level Developers</h3>
                <p className="text-slate-600 mb-4">
                  0-2 years experience looking to enhance their job applications and stand out to recruiters.
                </p>
                <ul className="text-slate-600 space-y-2">
                  <li>• Professional projects</li>
                  <li>• Open source contributions</li>
                  <li>• Technical blog posts</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-700 to-slate-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Your Professional CS Portfolio?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of CS students and developers who've already made their mark
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-slate-800 hover:bg-slate-50 px-8 py-3 cursor-pointer">
              Get Started Free
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <GitBranch className="h-6 w-6 text-slate-400" />
              <span className="text-xl font-bold font-consolas">BinaryTree</span>
            </div>
            <p className="text-slate-400">
              © 2024 BinaryTree. Your CS portfolio, simplified.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
