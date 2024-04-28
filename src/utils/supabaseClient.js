import { createClient } from "@supabase/supabase-js";
import { API_KEY } from "./constant";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://mfypntbsrdymcnbjtdcm.supabase.co",
  API_KEY
);
export default supabase;
