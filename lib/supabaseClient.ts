import { createClient } from '@supabase/supabase-js'

// [السطر 4]: حط رابط مشروعك في Supabase هنا بين العلامتين
const supabaseUrl = 'https://YOUR_SUPABASE_URL.supabase.co'

// [السطر 6]: حط الـ Anon Key الخاص بيك هنا بين العلامتين
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)