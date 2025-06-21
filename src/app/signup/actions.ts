'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function signup(email: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signInWithOtp({email})

  if (error) {
    console.log(`---------------------> error on signup: ${JSON.stringify(error, null, '    ')}`);
    redirect('/')
  }

}

export async function verify(email: string, code : string) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: 'email'
  })

  if (error) {
    console.log(`---------------------> error on verify: ${JSON.stringify(error, null, '    ')}`);
    redirect('/')
  }

  if (data) {
    console.log(`---------------------> data: ${JSON.stringify(data, null, '    ')}`);
  }
  redirect('/');
}