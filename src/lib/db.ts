import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function ensureTables() {
  // Ensure projects table exists
  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT DEFAULT 'Pending Review',
      user_email TEXT NOT NULL,
      file_url TEXT,
      price INTEGER,
      payment_status TEXT DEFAULT 'unpaid',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Add columns if they don't exist on existing table
  await sql`
    ALTER TABLE projects ADD COLUMN IF NOT EXISTS file_url TEXT
  `;
  await sql`
    ALTER TABLE projects ADD COLUMN IF NOT EXISTS price INTEGER
  `;
  await sql`
    ALTER TABLE projects ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'unpaid'
  `;

  // Ensure messages table exists
  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
      sender_email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export default sql;
