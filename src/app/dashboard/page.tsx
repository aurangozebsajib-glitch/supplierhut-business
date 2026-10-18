import { currentUser } from '@clerk/nextjs/server';
import sql from '@/lib/db';

export const instant = false;

export default async function DashboardPage() {
  const user = await currentUser();
  let dbTime = "Failed to connect";
  let isConnected = false;
  
  try {
    const result = await sql`SELECT NOW() as now`;
    dbTime = result[0].now.toString();
    isConnected = true;
  } catch (error) {
    console.error("Database connection error:", error);
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Customer Dashboard</h1>
      <p className="text-lg">Welcome, {user?.emailAddresses[0]?.emailAddress}!</p>
      
      <div className={`mt-6 p-4 rounded-lg shadow-sm border ${isConnected ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
        <strong>Database Status:</strong> {isConnected ? `Connected successfully. Server time is ${dbTime}` : 'Connection failed. Please check your .env.local DATABASE_URL.'}
      </div>
    </div>
  );
}
