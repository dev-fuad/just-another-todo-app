import { createClient } from '@supabase/supabase-js'
import { Database } from 'types/schems'

if (!process.env.SUPABASE_URL) {
  console.log('constants.ts', 'Make sure you have a `.env` file to populate your variables.')
}

export const SUPABASE_URL = process.env.SUPABASE_URL || ''
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || ''

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
