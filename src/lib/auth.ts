import { cookies } from 'next/headers'
import { seedUsers, simpleHash, type User } from '@/db/seed-users'

const SESSION_COOKIE = 'examengroep_session'

// Simple hash-based password verification for in-memory store
// Replace with bcrypt when DB is connected
export function hashPassword(password: string): string {
  return simpleHash(password)
}

export function verifyPassword(password: string, hash: string): boolean {
  return simpleHash(password) === hash
}

export async function createSession(userId: number): Promise<void> {
  const cookieStore = await cookies()
  // Simple session token: base64 encoded userId + timestamp
  const token = Buffer.from(
    JSON.stringify({ userId, createdAt: Date.now() })
  ).toString('base64')

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value

  if (!token) return null

  try {
    const { userId } = JSON.parse(Buffer.from(token, 'base64').toString())
    const user = seedUsers.find((u) => u.id === userId)
    return user || null
  } catch {
    return null
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

// Find user by email from in-memory store
export function findUserByEmail(email: string): User | undefined {
  return seedUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())
}
