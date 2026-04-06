'use server'

import { getSession } from '@/lib/auth'
import { toggleProgress } from '@/lib/progress'

export async function toggleExerciseAction(
  workshopId: number,
  exerciseId: string
): Promise<boolean> {
  const user = await getSession()
  if (!user) return false
  return toggleProgress(user.id, workshopId, exerciseId)
}
