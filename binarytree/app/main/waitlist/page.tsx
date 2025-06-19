'use client';

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail, Instagram } from "lucide-react";
import { addToWaitlist } from "./action";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const lastSubmitTimeRef = useRef<number>(0);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const now = Date.now();
    if (now - lastSubmitTimeRef.current < 10000) {
      toast.error("You're submitting too fast. Please wait a moment.");
      return;
    }

    setLoading(true);
    lastSubmitTimeRef.current = now;

    const result = await addToWaitlist(email);
    if (result.success) {
      toast.success("🎉 You've been added to the waitlist!");
      setEmail("");
    } else {
      if (result.message === "already_exists") {
        toast.info("You're already on the waitlist!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }

    setLoading(false);
  };

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
              Join the <span className="text-gradient">Waitlist</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Build a portfolio that sets you apart — and be first in line to shape what’s next.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="text-md px-4 py-6 w-full sm:w-auto"
              />
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="px-8 py-6 text-lg font-semibold bg-gradient-primary"
              >
                <Mail className="w-8 h-8 mr-2" />
                {loading ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>

            <p className="text-sm text-gray-400 mt-4">
              No spam. We’ll only email you about early access.
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
