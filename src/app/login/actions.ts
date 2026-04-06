'use server'

import { redirect } from 'next/navigation'
import { findUserByEmail, verifyPassword, createSession } from '@/lib/auth'

export interface LoginState {
  error?: string
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Vul je e-mailadres en wachtwoord in.' }
  }

  const user = findUserByEmail(email)
  if (!user) {
    return { error: 'Ongeldig e-mailadres of wachtwoord.' }
  }

  const valid = verifyPassword(password, user.passwordHash)
  if (!valid) {
    return { error: 'Ongeldig e-mailadres of wachtwoord.' }
  }

  await createSession(user.id)
  redirect('/dashboard')
}
