import { getDb } from './db'

export interface ProgressEntry {
  workshopId: number
  exerciseId: string
  completed: boolean
}

export async function getProgress(userId: number): Promise<ProgressEntry[]> {
  const sql = getDb()
  const rows = await sql`
    SELECT workshop_id, exercise_id, completed
    FROM progress
    WHERE user_id = ${userId}
  `
  return rows.map((r) => ({
    workshopId: r.workshop_id as number,
    exerciseId: r.exercise_id as string,
    completed: r.completed as boolean,
  }))
}

export async function toggleProgress(
  userId: number,
  workshopId: number,
  exerciseId: string
): Promise<boolean> {
  const sql = getDb()

  const existing = await sql`
    SELECT id, completed FROM progress
    WHERE user_id = ${userId} AND workshop_id = ${workshopId} AND exercise_id = ${exerciseId}
  `

  if (existing.length > 0) {
    const newCompleted = !existing[0].completed
    await sql`
      UPDATE progress SET completed = ${newCompleted}, updated_at = NOW()
      WHERE id = ${existing[0].id}
    `
    return newCompleted
  } else {
    await sql`
      INSERT INTO progress (user_id, workshop_id, exercise_id, completed)
      VALUES (${userId}, ${workshopId}, ${exerciseId}, true)
    `
    return true
  }
}

export function getWorkshopProgress(
  progress: ProgressEntry[],
  workshopId: number,
  totalExercises: number
): { completed: number; total: number } {
  const completed = progress.filter(
    (p) => p.workshopId === workshopId && p.completed
  ).length
  return { completed, total: totalExercises }
}
