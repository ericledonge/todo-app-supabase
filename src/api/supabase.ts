import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://duewffvwiyfyjnafrfim.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1ZXdmZnZ3aXlmeWpuYWZyZmltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxODgzMjEsImV4cCI6MjAwODc2NDMyMX0.WIzW1Yij8Zha8a9uzYk8h539WuYxiriuVSomnOlEuUo",
);
