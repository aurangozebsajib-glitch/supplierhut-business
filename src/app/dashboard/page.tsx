import { currentUser } from '@clerk/nextjs/server';
import sql from '@/lib/db';
import { createProject } from './actions';
import Link from 'next/link';

export const instant = false;

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  user_email: string;
  file_url: string | null;
  created_at: string;
}

export default async function DashboardPage() {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  // Create table and column if not exists
  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT DEFAULT 'Pending Review',
      user_email TEXT NOT NULL,
      file_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    ALTER TABLE projects ADD COLUMN IF NOT EXISTS file_url TEXT
  `;

  // Fetch projects for the logged-in user
  const projects = email ? (await sql`
    SELECT * FROM projects WHERE user_email = ${email} ORDER BY created_at DESC
  `) as Project[] : [];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Customer Dashboard</h1>
      <p className="text-lg mb-8 text-slate-600">Welcome, {email}!</p>

      {/* New Project Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-12">
        <h2 className="text-xl font-bold mb-4 text-slate-900">Order a New Project</h2>
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
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 placeholder:text-slate-400"
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
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 placeholder:text-slate-400"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="file" className="block text-sm font-semibold text-slate-700 mb-1">
              Attachment (Logo or Reference Document)
            </label>
            <input
              type="file"
              id="file"
              name="file"
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
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
        <h2 className="text-xl font-bold mb-6 text-slate-900">Your Projects</h2>
        {projects.length === 0 ? (
          <p className="text-slate-500 italic">No projects yet. Start by ordering one above!</p>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
                  <p className="text-slate-600 text-sm mt-1">{project.description}</p>
                  <div className="flex items-center gap-3 mt-3">
                    {project.file_url && (
                      <a
                        href={project.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md"
                      >
                        View Attachment ↗
                      </a>
                    )}
                    <Link
                      href={`/dashboard/project/${project.id}`}
                      className="inline-flex items-center text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md transition-colors"
                    >
                      View Chat 💬
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end">
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
