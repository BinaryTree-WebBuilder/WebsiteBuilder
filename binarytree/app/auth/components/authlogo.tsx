import Link from 'next/link';


export default function AuthLogo() {

  return (
          <Link href="/" className="inline-flex items-center space-x-3">
              <img
                src="/binarytree-logo.png"
                alt="BinaryTree Logo"
                className="h-12 object-contain px-3 cursor-pointer"
              />
          </Link>
  )
}
