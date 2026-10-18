'use server';

import { currentUser } from '@clerk/nextjs/server';
import sql, { ensureTables } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { put } from '@vercel/blob';

export async function createProject(formData: FormData) {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new Error('User not authenticated');
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const file = formData.get('file') as File | null;

  let fileUrl: string | null = null;

  if (file && file.size > 0) {
    const blob = await put(file.name, file, {
      access: 'public',
    });
    fileUrl = blob.url;
  }

  // Ensure tables exist
  await ensureTables();

  // Insert project
  await sql`
    INSERT INTO projects (title, description, user_email, file_url)
    VALUES (${title}, ${description}, ${email}, ${fileUrl})
  `;

  revalidatePath('/dashboard');
}

export async function sendMessage(formData: FormData) {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new Error('User not authenticated');
  }

  const projectId = formData.get('projectId');
  const message = formData.get('message') as string;

  if (!projectId || !message || !message.trim()) {
    throw new Error('Missing projectId or message');
  }

  // Ensure tables exist
  await ensureTables();

  await sql`
    INSERT INTO messages (project_id, sender_email, message)
    VALUES (${Number(projectId)}, ${email}, ${message.trim()})
  `;

  revalidatePath(`/dashboard/project/${projectId}`);
  revalidatePath(`/admin/project/${projectId}`);
  revalidatePath('/dashboard');
  revalidatePath('/admin');
}
