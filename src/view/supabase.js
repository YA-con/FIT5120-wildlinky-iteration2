// src/utils/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tchwwnlazebhayosesvf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjaHd3bmxhemViaGF5b3Nlc3ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MDEwMTIsImV4cCI6MjA1ODk3NzAxMn0.wztsNJdzWyK6wOte077OP-bSrx_89Bq0a4-UsjDuxf0';

export const supabase = createClient(supabaseUrl, supabaseKey);
