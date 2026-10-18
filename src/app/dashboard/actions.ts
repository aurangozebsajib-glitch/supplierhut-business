'use server';

import { currentUser } from '@clerk/nextjs/server';
import sql from '@/lib/db';
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
      access: 'private',
    });
    fileUrl = blob.url;
  }

  // Create table if not exists
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

  // Add column if it doesn't exist on existing table
  await sql`
    ALTER TABLE projects ADD COLUMN IF NOT EXISTS file_url TEXT
  `;

  // Insert project
  await sql`
    INSERT INTO projects (title, description, user_email, file_url)
    VALUES (${title}, ${description}, ${email}, ${fileUrl})
  `;

  revalidatePath('/dashboard');
}
