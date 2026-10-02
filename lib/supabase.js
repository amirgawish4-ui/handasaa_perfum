import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://uyoesniewxnwzurlxmqd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_yb9uAQ9vn2As9HkIQy0cQQ_Lbjul...';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);