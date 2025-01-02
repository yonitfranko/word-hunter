import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// פונקציות עזר לעבודה עם Supabase
export const getUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// פונקציות לעבודה עם המילים
export const getActiveWord = async () => {
  const { data, error } = await supabase
    .from('words')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  
  return { word: data, error };
};

export const submitChallenge = async (userId, wordId, challengeType, answer) => {
  const { data, error } = await supabase
    .from('completed_challenges')
    .insert([
      {
        user_id: userId,
        word_id: wordId,
        challenge_type: challengeType,
        answer: answer,
        auto_check: false, // יוגדר על ידי המורה
        teacher_approved: false
      }
