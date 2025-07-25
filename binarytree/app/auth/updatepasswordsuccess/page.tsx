'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import  AuthLogo from '../components/authlogo';



export default function UpdatePasswordSuccessPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

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
  }, [router, supabase]);




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
          <AuthLogo/>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">Password Changed</CardTitle>
            <CardDescription className="text-gray-600">
                Your Password has been changed.
            </CardDescription>
          </CardHeader>
          
        </Card>

      </div>
    </div>
  );
}
