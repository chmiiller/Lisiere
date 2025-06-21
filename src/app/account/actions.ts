'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function logout() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut({scope: 'local'});

  if (error) {
    console.log(`---------------------> error on logout: ${JSON.stringify(error, null, '    ')}`);
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
