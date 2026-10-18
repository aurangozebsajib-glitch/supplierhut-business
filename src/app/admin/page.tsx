import { currentUser } from '@clerk/nextjs/server';
import sql from '@/lib/db';
import { updateProjectStatus } from './actions';
import Link from 'next/link';

export const instant = false;

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  user_email: string;
  created_at: string;
}

export default async function AdminPage() {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  if (!email || email !== process.env.ADMIN_EMAIL) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-8 rounded-xl max-w-md w-full shadow-sm">
          <h1 className="text-2xl font-bold mb-2">403 Unauthorized</h1>
          <p className="text-slate-600 mb-6">
            You do not have administrative permission to view this page.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-slate-900 text-white font-medium px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Ensure projects table exists
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

  // Fetch all projects
  const projects = (await sql`
    SELECT * FROM projects ORDER BY created_at DESC
  `) as Project[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Admin Panel</h1>
          <p className="text-slate-600 mt-1">
            Manage all client project submissions and update progress.
          </p>
        </div>
        <div className="bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-2 rounded-lg border border-blue-100">
          Logged in as: {email}
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 text-center text-slate-500">
          No projects found in the system yet.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-6">Customer Email</th>
                  <th className="py-4 px-6">Title</th>
                  <th className="py-4 px-6">Description</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Created At</th>
                  <th className="py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-mono font-medium text-slate-500">
                      #{project.id}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-900">
                      {project.user_email}
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      {project.title}
                    </td>
                    <td className="py-4 px-6 text-slate-600 max-w-xs break-words">
                      {project.description}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          project.status === 'Pending Review'
                            ? 'bg-yellow-100 text-yellow-800'
                            : project.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : project.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-xs whitespace-nowrap">
                      {new Date(project.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <form action={updateProjectStatus} className="flex items-center gap-2">
                        <input type="hidden" name="projectId" value={project.id} />
                        <select
                          name="newStatus"
                          defaultValue={project.status}
                          className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          <option value="Pending Review">Pending Review</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          type="submit"
                          className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                        >
                          Update
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
