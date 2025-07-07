import Link from "next/link";


export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
          <div className="flex items-center my-8">
            <img
              src="/binarytree-logo-white.png"
              alt="BinaryTree Logo"
              className="h-10 object-contain" // slightly larger logo & padding
            />
          </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The easiest way for developers to create stunning portfolios that get them hired. 
              Like Linktree, but built specifically for technical professionals.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/main/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/main/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/main/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/main/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              {/* <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li> */}
              <li><Link href="/main/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/main/tos" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Binarytree. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};