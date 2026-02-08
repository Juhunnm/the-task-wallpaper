import supabase from "@/lib/supabase";

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    await supabase.auth.signOut({ scope: "local" });
  }
}

export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signInWithEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

// export async function signInWithOAuth(provider: Provider) {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider,
//   });
//   if (error) throw error;
//   return data;
// }

export async function resetPassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });
  if (error) throw error;
  return data;
}

export async function forgetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${import.meta.env.VITE_PUBLIC_URL}/reset-password`,
  });
  if (error) return error;
  return data;
}
