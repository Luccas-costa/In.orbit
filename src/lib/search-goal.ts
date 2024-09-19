'use server'

import { sql } from '@vercel/postgres'
import { GoalType } from '@/types/goal'

export async function SearchGoals(): Promise<GoalType[]> {
  try {
    const result = await sql`SELECT * FROM inorbit_goals`
    const Goals: GoalType[] = result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      date: row.date,
      frequency: row.numero_pedidos,
    }))
    return Goals
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao buscar dados do banco de dados')
  }
}
