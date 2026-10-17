import Link from 'next/link';

export default function PricingPage() {
  const tiers = [
    {
      name: "Starter",
      description: "Ideal for small businesses and startups looking for a fast, beautiful landing page.",
      features: [
        "Single Page Website",
        "Mobile Responsive",
        "SEO Optimization",
        "Contact Form",
        "1 Week Turnaround"
      ],
      highlight: false
    },
    {
      name: "Business",
      description: "Perfect for growing companies needing a multi-page site with rich content and CMS integration.",
      features: [
        "Up to 5 Pages",
        "CMS Integration",
        "Custom UI/UX Design",
        "Speed & Performance Tuning",
        "Priority Support"
      ],
      highlight: true
    },
    {
      name: "E-Commerce",
      description: "Comprehensive online store setup complete with payment processing and product management.",
      features: [
        "Full E-Commerce Store",
        "Local & Global Gateways",
        "Product Management",
        "Order Notifications",
        "Custom Checkout Flow"
      ],
      highlight: false
    }
  ];

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-slate-600">
            Choose the package that fits your goals. Custom requirements are priced individually via tailored quotes.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 items-stretch">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all ${
                tier.highlight
                  ? 'bg-slate-900 text-white shadow-xl scale-105 border-2 border-blue-500'
                  : 'bg-white text-slate-900 shadow-sm border border-slate-100'
              }`}
            >
              <div>
                {tier.highlight && (
                  <span className="inline-block bg-blue-600 text-white text-xs uppercase font-bold tracking-wider py-1 px-3 rounded-full mb-4">
                    Most Popular
                  </span>
                )}
                <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
                <p className={`text-sm mb-6 ${tier.highlight ? 'text-slate-300' : 'text-slate-600'}`}>
                  {tier.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">Quote Only</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <svg
                        className={`w-4 h-4 mr-2 flex-shrink-0 ${
                          tier.highlight ? 'text-blue-400' : 'text-blue-600'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/contact"
                className={`block w-full text-center font-semibold py-3 rounded-lg transition-colors ${
                  tier.highlight
                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                Request Quote
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
