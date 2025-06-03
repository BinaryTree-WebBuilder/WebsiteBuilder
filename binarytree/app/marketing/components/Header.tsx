import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export const Header = () => {
  return (
<header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 py-4">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-20"> {/* increased from h-16 */}
      <div className="flex items-center">
        <img
          src="/binarytree-logo.png"
          alt="BinaryTree Logo"
          className="h-10 object-contain px-3" // slightly larger logo & padding
        />
      </div>

      <nav className="hidden md:flex items-center space-x-10 text-base"> {/* slightly more spacing */}
        <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
        <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
        <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
      </nav>

      <div className="flex items-center space-x-5">
        <Button variant="ghost" size="sm" className="text-base">Sign In</Button>
        <Button className="bg-gradient-primary hover:opacity-90 text-white text-base px-5 py-2" size="sm">
          Get Started Free
        </Button>
      </div>
    </div>
  </div>
</header>

  );
};