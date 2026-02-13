const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;

export async function supabaseRequest(
  method: string,
  table: string,
  data?: Record<string, unknown>
): Promise<Record<string, unknown>[]> {
  console.log(`[Supabase] Making ${method} request to table: ${table}`);

  const url = `${SUPABASE_URL}/rest/v1/${table}`;
  const headers: Record<string, string> = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`[Supabase] Error: ${res.status} - ${errorText}`);
    throw new Error(`Database error: ${errorText}`);
  }

  const result = await res.json();
  console.log(`[Supabase] Success: ${method} to ${table} completed`);
  return result;
}
