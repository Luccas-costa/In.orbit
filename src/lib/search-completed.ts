'use server'

import { sql } from '@vercel/postgres'
import { CompletedType } from '@/types/completed'

export async function SearchCompleted(): Promise<CompletedType[]> {
  try {
    const result =
      await sql`SELECT id_goal, date_completed FROM inorbit_completed`
    const Completed: CompletedType[] = result.rows.map((row) => ({
      id: row.id_goal, // Certifique-se de mapear o campo correto
      date: row.date_completed, // Certifique-se de mapear o campo correto
    }))
    return Completed
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao buscar dados do banco de dados')
  }
}
