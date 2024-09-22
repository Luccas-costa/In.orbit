'use server'

import { sql } from '@vercel/postgres'
import { GoalType } from '@/types/goal'

export async function SearchBytitleGoal(
  title: string,
): Promise<GoalType | null> {
  console.log('///////////////////////////////')
  console.log(`Adasdad ${title} asdasd`)
  try {
    const result = await sql`SELECT * FROM inorbit_goals WHERE title = ${title}`

    if (result.rows.length === 0) {
      return null // Retorna null se não encontrar nenhum item
    }

    const goal: GoalType = {
      id: result.rows[0].id,
      title: result.rows[0].title,
      date: result.rows[0].date,
      frequency: result.rows[0].frequency,
    }
    console.log(goal)
    return goal
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao buscar dados do banco de dados')
  }
}
