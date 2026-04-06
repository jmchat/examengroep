import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { getDb } from './db'

const SESSION_COOKIE = 'examengroep_session'

export interface User {
  id: number
  email: string
  name: string
  role: 'participant' | 'trainer'
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createSession(userId: number): Promise<void> {
  const cookieStore = await cookies()
  const token = Buffer.from(
    JSON.stringify({ userId, createdAt: Date.now() })
  ).toString('base64')

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value

  if (!token) return null

  try {
    const { userId } = JSON.parse(Buffer.from(token, 'base64').toString())
    const sql = getDb()
    const rows = await sql`SELECT id, email, name, role FROM users WHERE id = ${userId}`
    if (rows.length === 0) return null
    return rows[0] as User
  } catch {
    return null
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function findUserByEmail(email: string) {
  const sql = getDb()
  const rows = await sql`SELECT id, email, name, role, password_hash FROM users WHERE LOWER(email) = ${email.toLowerCase()}`
  if (rows.length === 0) return undefined
  return rows[0] as User & { password_hash: string }
}
