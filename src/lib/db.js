import { createClient } from "@supabase/supabase-js";

let db = null;

if (import.meta.env.VITE_API) {
    db = createClient(import.meta.env.VITE_API, import.meta.env.VITE_API_KEY);
}

export default db;
