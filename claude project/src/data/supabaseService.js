import { getSupabaseClient } from '../lib/supabaseClient';

// Lightweight wrapper for common queries used by the app.
// Assumes tables: company, workers, testimonials, terms, stats, custom_requirements

function client() {
  return getSupabaseClient();
}

export async function fetchTable(table) {
  const sb = client();
  if (!sb) return { data: null, error: new Error('Supabase not configured') };
  const { data, error } = await sb.from(table).select('*');
  return { data, error };
}

export async function upsertRow(table, row) {
  const sb = client();
  if (!sb) return { data: null, error: new Error('Supabase not configured') };
  const { data, error } = await sb.from(table).upsert(row).select();
  return { data, error };
}

export async function insertRow(table, row) {
  const sb = client();
  if (!sb) return { data: null, error: new Error('Supabase not configured') };
  const { data, error } = await sb.from(table).insert(row).select();
  return { data, error };
}

export async function deleteRow(table, match) {
  const sb = client();
  if (!sb) return { data: null, error: new Error('Supabase not configured') };
  const { data, error } = await sb.from(table).delete().match(match);
  return { data, error };
}
