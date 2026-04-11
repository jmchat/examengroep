import { getDb } from './db'

export interface HomeworkEntry {
  entryNumber: number
  promptUsed: string
  result: string
  adjusted: string
  usable: string
  nextTime: string
}

export async function getHomeworkEntries(
  userId: number,
  workshopId: number
): Promise<HomeworkEntry[]> {
  const sql = getDb()
  const rows = await sql`
    SELECT entry_number, prompt_used, result, adjusted, usable, next_time
    FROM homework_entries
    WHERE user_id = ${userId} AND workshop_id = ${workshopId}
    ORDER BY entry_number
  `
  return rows.map((r) => ({
    entryNumber: r.entry_number as number,
    promptUsed: (r.prompt_used as string) || '',
    result: (r.result as string) || '',
    adjusted: (r.adjusted as string) || '',
    usable: (r.usable as string) || '',
    nextTime: (r.next_time as string) || '',
  }))
}

export interface ParticipantHomework {
  userId: number
  name: string
  email: string
  title: string | null
  entries: HomeworkEntry[]
  lastUpdated: Date | null
}

export async function getAllHomeworkForWorkshop(
  workshopId: number
): Promise<ParticipantHomework[]> {
  const sql = getDb()
  const rows = await sql`
    SELECT
      u.id AS user_id,
      u.name,
      u.email,
      h.entry_number,
      h.prompt_used,
      h.result,
      h.adjusted,
      h.usable,
      h.next_time,
      h.updated_at
    FROM users u
    LEFT JOIN homework_entries h
      ON h.user_id = u.id AND h.workshop_id = ${workshopId}
    WHERE u.role = 'participant'
    ORDER BY u.name, h.entry_number
  `

  const byUser = new Map<number, ParticipantHomework>()
  for (const r of rows) {
    const userId = r.user_id as number
    let participant = byUser.get(userId)
    if (!participant) {
      participant = {
        userId,
        name: r.name as string,
        email: r.email as string,
        title: null,
        entries: [],
        lastUpdated: null,
      }
      byUser.set(userId, participant)
    }
    if (r.entry_number != null) {
      participant.entries.push({
        entryNumber: r.entry_number as number,
        promptUsed: (r.prompt_used as string) || '',
        result: (r.result as string) || '',
        adjusted: (r.adjusted as string) || '',
        usable: (r.usable as string) || '',
        nextTime: (r.next_time as string) || '',
      })
      const updated = r.updated_at as Date | null
      if (updated && (!participant.lastUpdated || updated > participant.lastUpdated)) {
        participant.lastUpdated = updated
      }
    }
  }
  return Array.from(byUser.values())
}

export async function getParticipantHomework(
  userId: number,
  workshopId: number
): Promise<{ name: string; email: string; entries: HomeworkEntry[] } | null> {
  const sql = getDb()
  const userRows = await sql`
    SELECT id, name, email FROM users WHERE id = ${userId} AND role = 'participant'
  `
  if (userRows.length === 0) return null
  const entries = await getHomeworkEntries(userId, workshopId)
  return {
    name: userRows[0].name as string,
    email: userRows[0].email as string,
    entries,
  }
}

export async function saveHomeworkEntry(
  userId: number,
  workshopId: number,
  entry: HomeworkEntry
): Promise<void> {
  const sql = getDb()
  await sql`
    INSERT INTO homework_entries (user_id, workshop_id, entry_number, prompt_used, result, adjusted, usable, next_time, updated_at)
    VALUES (${userId}, ${workshopId}, ${entry.entryNumber}, ${entry.promptUsed}, ${entry.result}, ${entry.adjusted}, ${entry.usable}, ${entry.nextTime}, NOW())
    ON CONFLICT (user_id, workshop_id, entry_number)
    DO UPDATE SET
      prompt_used = ${entry.promptUsed},
      result = ${entry.result},
      adjusted = ${entry.adjusted},
      usable = ${entry.usable},
      next_time = ${entry.nextTime},
      updated_at = NOW()
  `
}
