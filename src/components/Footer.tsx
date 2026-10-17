import Link from 'next/link';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="font-bold text-xl text-white">
              SupplierHut<span className="text-blue-500">.business</span>
            </span>
            <p className="text-slate-400 text-sm mt-1">
              High-converting websites for businesses in Bangladesh and worldwide.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500 text-sm">
          &copy; {currentYear} SupplierHut Business. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
