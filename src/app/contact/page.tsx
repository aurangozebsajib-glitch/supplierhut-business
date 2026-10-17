export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-slate-600">
            Have a project in mind or want to learn more? Send us a message and we'll get back to you.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-semibold text-slate-700 mb-2">
                Service Needed
              </label>
              <select
                id="service"
                name="service"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white"
                defaultValue=""
                required
              >
                <option value="" disabled>Select a service...</option>
                <option value="business-website">Business Website</option>
                <option value="e-commerce">E-Commerce Store</option>
                <option value="landing-page">Landing Page</option>
                <option value="other">Custom Solution / Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="details" className="block text-sm font-semibold text-slate-700 mb-2">
                Project Details
              </label>
              <textarea
                id="details"
                name="details"
                rows={5}
                placeholder="Tell us about your project or inquiry..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                required
              ></textarea>
            </div>

            <button
              type="button"
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Send Message (Prototype Only)
            </button>
          </form>
        </div>

        {/* Additional Contact Info */}
        <div className="mt-12 text-center text-slate-600">
          <p className="mb-2">Prefer direct email?</p>
          <a href="mailto:hello@supplierhut.business" className="text-blue-600 font-semibold hover:underline">
            hello@supplierhut.business
          </a>
        </div>
      </div>
    </div>
  );
}
