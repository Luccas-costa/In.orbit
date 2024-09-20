'use server'

import { sql } from '@vercel/postgres'
import { GoalType } from '@/types/goal'

export async function SearchByIdGoal(id: number): Promise<GoalType | null> {
  try {
    const result = await sql`SELECT * FROM inorbit_goals WHERE id = ${id}`

    if (result.rows.length === 0) {
      return null // Retorna null se não encontrar nenhum item
    }

    const goal: GoalType = {
      id: result.rows[0].id,
      title: result.rows[0].title,
      date: result.rows[0].date,
      frequency: result.rows[0].frequency,
    }

    return goal
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao buscar dados do banco de dados')
  }
}
