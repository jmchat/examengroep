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
