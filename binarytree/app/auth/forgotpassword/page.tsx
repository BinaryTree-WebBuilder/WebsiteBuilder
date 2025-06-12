'use client'

import { useState } from 'react'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Github } from "lucide-react";
import Link from "next/link";



export default function ForgotPasswordPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  // Check if User is Login. else redirect to dashboard
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // ✅ User is already logged in, redirect away
        router.push('/builder/test'); // or wherever
      }
    };

    checkSession();
  }, [router]);

const handleForgetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const redirectToUrl = `${window.location.origin}/main/auth/updatepassword`; // Your callback route


        try {
      const { error } = await supabase.auth.resetPasswordForEmail(email,{
          redirectTo: redirectToUrl
        });

      if (error) {
        throw error;
      }

      // ✅ Redirect to your desired page after successful login
      router.push('/main/auth/resetemailnotify');
    } catch (err: any) {
      setError(err.message || 'Reset Password failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-primary rounded-full opacity-10 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-secondary rounded-full opacity-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3">
              <img
                src="/binarytree-logo.png"
                alt="BinaryTree Logo"
                className="h-16 object-contain px-3 cursor-pointer"
              />
          </Link>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">Forgot Password</CardTitle>
            <CardDescription className="text-gray-600">
              Enter email and we'll send you instructions to reset password
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" className="animate-fade-in">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}


            <form onSubmit={handleForgetPassword} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-slate-700 hover:bg-slate-800 hover:opacity-90 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Reset Password'
                )}
              </Button>
            </form>


            {/* Sign Up Link */}
            <div className="text-center">
              <Link 
                href="/auth/login" 
                className="text-gradient hover:text-blue-800 font-medium transition-colors"
              >
                Return to Login
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
