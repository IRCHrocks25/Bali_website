import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xoukchowbaningtncnpz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvdWtjaG93YmFuaW5ndG5jbnB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MzIxNjcsImV4cCI6MjA3ODEwODE2N30.3gQhoHxHXQY5p-ClnFyH3v4DuoLbXuurQjgLS_G-vbU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);