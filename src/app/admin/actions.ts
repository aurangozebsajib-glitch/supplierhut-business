'use server';

import { currentUser } from '@clerk/nextjs/server';
import sql from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateProjectStatus(formData: FormData) {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  if (!email || email !== process.env.ADMIN_EMAIL) {
    throw new Error('Unauthorized');
  }

  const projectId = formData.get('projectId');
  const newStatus = formData.get('newStatus') as string;

  if (!projectId || !newStatus) {
    throw new Error('Missing projectId or newStatus');
  }

  await sql`
    UPDATE projects
    SET status = ${newStatus}
    WHERE id = ${Number(projectId)}
  `;

  revalidatePath('/admin');
  revalidatePath('/dashboard');
}
