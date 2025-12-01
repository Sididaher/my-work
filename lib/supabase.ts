import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Debug: Log configuration status
console.log('=== Supabase Client Configuration ===')
console.log('URL:', supabaseURL || 'MISSING')
console.log('Key:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'MISSING')
console.log('Environment:', typeof window !== 'undefined' ? 'Browser' : 'Server')

if (!supabaseURL || !supabaseKey) {
  const errorMsg = 'CRITICAL: Supabase environment variables are missing! Check your .env file and restart the dev server.'
  console.error(errorMsg)
  throw new Error(errorMsg)
}

export const supabase = createClient<Database>(supabaseURL, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
})
