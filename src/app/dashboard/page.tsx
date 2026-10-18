import { currentUser } from '@clerk/nextjs/server';
import sql from '@/lib/db';
import { createProject } from './actions';

export const instant = false;

export default async function DashboardPage() {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  // Create table if not exists (also done in action, but good to have here too)
  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT DEFAULT 'Pending Review',
      user_email TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Fetch projects for the logged-in user
  const projects = email ? await sql`
    SELECT * FROM projects WHERE user_email = ${email} ORDER BY created_at DESC
  ` : [];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Customer Dashboard</h1>
      <p className="text-lg mb-8 text-slate-600">Welcome, {email}!</p>

      {/* New Project Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-12">
        <h2 className="text-xl font-bold mb-4">Order a New Project</h2>
        <form action={createProject} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-1">
              Project Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="e.g., My Portfolio Website"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Tell us what you need..."
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            Submit Project
          </button>
        </form>
      </div>

      {/* Project List */}
      <div>
        <h2 className="text-xl font-bold mb-6">Your Projects</h2>
        {projects.length === 0 ? (
          <p className="text-slate-500 italic">No projects yet. Start by ordering one above!</p>
        ) : (
          <div className="space-y-4">
            {projects.map((project: any) => (
              <div key={project.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
                  <p className="text-slate-600 text-sm">{project.description}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    project.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-700' :
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {project.status}
                  </span>
                  <span className="text-slate-400 text-xs mt-2">
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
