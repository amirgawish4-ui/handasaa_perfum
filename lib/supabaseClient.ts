import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uyoesniewxnwzurlxmqd.supabase.co';
const supabaseAnonKey = 'sb_publishable_yb9uAQ9vn2As9HkIQY0cqQ_LbjU1';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);