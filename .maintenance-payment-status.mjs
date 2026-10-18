// One-time maintenance: normalize payment_status to lowercase in the projects table.
// Safe operations only — no data deletion.
import { neon } from '@neondatabase/serverless';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const env = await readFile(path.join(__dirname, '.env.local'), 'utf8');
const dbUrl = env.match(/^DATABASE_URL=(.+)$/m)?.[1].trim().replace(/^"|"$/g, '');
if (!dbUrl) {
  console.error('DATABASE_URL not found in .env.local');
  process.exit(1);
}

const sql = neon(dbUrl);

// 1. Ensure the payment_status column exists (Phase 7 schema change not yet applied)
await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'unpaid'`;
console.log('payment_status column ensured.');

// 2. Normalize existing rows: 'Unpaid' -> 'unpaid'
const updated = await sql`UPDATE projects SET payment_status = 'unpaid' WHERE payment_status = 'Unpaid'`;
console.log('Rows updated from "Unpaid" to "unpaid":', updated.count);

// 3. Align the column default for any pre-existing column that got 'Unpaid' as its default
await sql`ALTER TABLE projects ALTER COLUMN payment_status SET DEFAULT 'unpaid'`;
console.log('Column default set to "unpaid".');

// 4. Report final state (verification only)
const rows = await sql`SELECT payment_status, COUNT(*)::int AS count FROM projects GROUP BY payment_status`;
console.log('Current payment_status distribution:', rows);