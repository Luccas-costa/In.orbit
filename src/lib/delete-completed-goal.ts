'use server'

import { sql } from '@vercel/postgres'

export async function DeleteCompletedGoal({
  idGoal,
  dateCompleted,
}: {
  idGoal: number
  dateCompleted: string
}) {
  try {
    console.log('Removendo dados do banco de dados...')
    await sql`DELETE FROM inorbit_completed WHERE id_goal = ${idGoal} AND date_completed = ${dateCompleted}`
    console.log('Removido com sucesso!')
  } catch (error) {
    console.log(error)
  }
}
