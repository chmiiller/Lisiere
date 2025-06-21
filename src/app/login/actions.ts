'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(email: string, password: string) {
  const supabase = await createClient()

  const data = {
    email,
    password,
  }

  const { error, data: sbData } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  if (sbData) {
    console.log(`---------------------> sbData: ${JSON.stringify(sbData, null, '    ')}`);
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // Type-casting here for convenience
  // In practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}