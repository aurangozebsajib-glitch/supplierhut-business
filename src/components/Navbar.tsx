'use client';
import Link from 'next/link';
import { SignInButton, SignUpButton, UserButton, Show } from '@clerk/nextjs';

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0 font-bold text-2xl text-blue-600">
          SupplierHut<span className="text-slate-800">.business</span>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Home</Link>
          <Link href="/services" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Services</Link>
          <Link href="/pricing" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Pricing</Link>
          <Link href="/contact" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-slate-600 hover:text-blue-600 font-medium">Log In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">Sign Up</button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard" className="text-slate-600 hover:text-blue-600 font-medium">Dashboard</Link>
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
}
