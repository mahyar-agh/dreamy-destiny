import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://pparjurftfhiohknpgmj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwYXJqdXJmdGZoaW9oa25wZ21qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA1MjY0OTQsImV4cCI6MjAzNjEwMjQ5NH0.10GG-f7QGbvJviZvBHQbCOKBk16HYlL0eQgtzTLjU8I";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
