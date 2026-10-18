'use server';

import { currentUser } from '@clerk/nextjs/server';
import sql from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createProject(formData: FormData) {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new Error('User not authenticated');
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  // Create table if not exists
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

  // Insert project
  await sql`
    INSERT INTO projects (title, description, user_email)
    VALUES (${title}, ${description}, ${email})
  `;

  revalidatePath('/dashboard');
}
