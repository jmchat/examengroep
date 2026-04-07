'use client'

import { useState, useCallback } from 'react'
import confetti from 'canvas-confetti'
import type { Exercise } from '@/lib/workshops'
import ExerciseCard from './exercise-card'

interface ExerciseListProps {
  exercises: Exercise[]
  workshopId: number
  initialCompletedIds: string[]
  userName?: string
}

export default function ExerciseList({
  exercises,
  workshopId,
  initialCompletedIds,
  userName,
}: ExerciseListProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    new Set(initialCompletedIds)
  )

  const handleToggle = useCallback(
    (exerciseId: string, newState: boolean) => {
      setCompletedIds((prev) => {
        const next = new Set(prev)
        if (newState) {
          next.add(exerciseId)
        } else {
          next.delete(exerciseId)
        }

        // Fire confetti when all actual exercises (not reference/homework) are completed
        const exerciseOnly = exercises.filter((e) => e.type === 'exercise')
        const allExercisesDone = exerciseOnly.every((e) => next.has(e.id))
        if (newState && allExercisesDone) {
          setTimeout(() => {
            // Center burst
            confetti({
              particleCount: 150,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#9e1357', '#e94b4c', '#054654', '#f1e8eb', '#FFD700'],
            })
            // Left side
            setTimeout(() => {
              confetti({
                particleCount: 80,
                angle: 60,
                spread: 60,
                origin: { x: 0, y: 0.65 },
                colors: ['#9e1357', '#e94b4c', '#054654'],
              })
            }, 200)
            // Right side
            setTimeout(() => {
              confetti({
                particleCount: 80,
                angle: 120,
                spread: 60,
                origin: { x: 1, y: 0.65 },
                colors: ['#9e1357', '#e94b4c', '#054654'],
              })
            }, 400)
          }, 300)
        }

        return next
      })
    },
    [exercises.length]
  )

  return (
    <div className="space-y-4">
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          workshopId={workshopId}
          initialCompleted={completedIds.has(exercise.id)}
          userName={userName}
          onToggle={handleToggle}
        />
      ))}
    </div>
  )
}
