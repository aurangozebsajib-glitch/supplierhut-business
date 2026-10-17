import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            About SupplierHut Business
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Empowering businesses through cutting-edge, high-speed, AI-driven web development.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12 mb-12 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Story</h2>
          <p className="text-slate-600 leading-relaxed">
            SupplierHut Business was founded with a singular purpose: to close the digital divide for ambitious businesses in Bangladesh and worldwide. We noticed that traditional agencies were too slow, prohibitively expensive, and relied on outdated workflows.
          </p>
          <p className="text-slate-600 leading-relaxed">
            By harnessing the latest AI tooling, modern web frameworks like Next.js, and an agile workflow, we transformed how websites are delivered. What used to take months now takes days — without sacrificing performance, beauty, or security.
          </p>
        </div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">
              To deliver world-class digital experiences that empower businesses to scale their operations, build trust with their customers, and drive online growth.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Our Promise</h3>
            <p className="text-slate-600 leading-relaxed">
              We focus on measurable business impact. Every website we launch is built to convert, optimized for modern search engines, and engineered to load in the blink of an eye.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-600 rounded-2xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Want to Work Together?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Let's discuss how we can create a powerful digital presence for your brand.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
