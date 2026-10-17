import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6">
            AI-Powered Web Development Agency
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            We build websites that <span className="text-blue-600">grow your business.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Serving businesses in Bangladesh and worldwide. Let our AI-assisted developers build, test, and launch your next website at record speed.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors">
              Start Your Project
            </Link>
            <Link href="/services" className="bg-white text-slate-700 border border-slate-300 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-50 transition-colors">
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* 3-Step How It Works Section */}
      <section className="bg-slate-900 py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">How It Works</h2>
          <div className="space-y-12 text-left">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl">1</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">1. Share Requirements</h3>
                <p className="text-slate-400">Tell us what you need. Upload brand assets, reference sites, and describe your core features.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl">2</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">2. AI-Assisted Build</h3>
                <p className="text-slate-400">Our advanced workflows rapidly build your solution, maintaining pixel-perfect quality and high performance.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl">3</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">3. Review & Launch</h3>
                <p className="text-slate-400">Give feedback on a live preview environment, approve the final build, and seamlessly launch your domain.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
