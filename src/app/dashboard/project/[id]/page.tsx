import { currentUser } from '@clerk/nextjs/server';
import sql, { ensureTables } from '@/lib/db';
import { sendMessage } from '../../actions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const instant = false;

interface Message {
  id: number;
  project_id: number;
  sender_email: string;
  message: string;
  created_at: string;
}

export default async function ProjectChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  if (!email) return <div>Unauthorized</div>;

  // Ensure tables exist before querying
  await ensureTables();

  const projects = await sql`SELECT * FROM projects WHERE id = ${Number(id)}`;
  const project = projects[0];

  if (!project || project.user_email !== email) {
    return (
      <div className="p-8 text-center text-red-600">
        <h1 className="text-2xl font-bold">404 Unauthorized</h1>
        <p>Project not found or you do not have permission to view it.</p>
        <Link href="/dashboard" className="text-blue-600 underline">Back to Dashboard</Link>
      </div>
    );
  }

  const messages = (await sql`
    SELECT * FROM messages WHERE project_id = ${Number(id)} ORDER BY created_at ASC
  `) as Message[];

  return (
    <div className="p-8 max-w-3xl mx-auto min-h-screen flex flex-col">
      <div className="mb-6">
        <Link href="/dashboard" className="text-slate-500 hover:text-slate-900 mb-4 inline-block">&larr; Back to Dashboard</Link>
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <p className="text-slate-600">Chat with support about your project.</p>
      </div>

      <div className="flex-grow bg-white border border-slate-200 rounded-xl p-6 mb-6 h-[400px] overflow-y-auto space-y-4 shadow-inner">
        {messages.length === 0 ? (
          <p className="text-slate-400 italic text-center">No messages yet. Send one to start!</p>
        ) : (
          messages.map((m) => {
            const isUser = m.sender_email === email;
            return (
              <div key={m.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-xl ${isUser ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-800'}`}>
                  <p className="text-sm">{m.message}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <form action={sendMessage} className="flex gap-2">
        <input type="hidden" name="projectId" value={id} />
        <input
          type="text"
          name="message"
          placeholder="Type your message..."
          className="flex-grow px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-sm"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm"
        >
          Send
        </button>
      </form>
    </div>
  );
}
