import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      title: "Business Websites",
      description: "Professional, fast, and mobile-friendly websites designed specifically for your brand. We focus on clear messaging, SEO optimization, and intuitive navigation.",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: "E-Commerce",
      description: "Scalable, secure, and conversion-focused online stores built to grow your sales. Comprehensive payment setup, smooth checkouts, and easy product management.",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      title: "Landing Pages",
      description: "High-impact single-page experiences built specifically for marketing campaigns, ad traffic, and product launches designed to maximize leads.",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Our Services
          </h1>
          <p className="text-lg text-slate-600">
            Tailored digital solutions built to elevate your business presence.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h2>
                <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
              </div>
              <div className="mt-8 border-t border-slate-100 pt-6">
                <Link
                  href="/contact"
                  className="block w-full text-center bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
