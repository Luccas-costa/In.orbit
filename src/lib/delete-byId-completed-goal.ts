'use server'

import { sql } from '@vercel/postgres'

export async function DeleteByIdCompletedGoal({ idGoal }: { idGoal: number }) {
  try {
    console.log('Removendo dados do banco de dados...')
    await sql`DELETE FROM inorbit_completed WHERE id_goal = ${idGoal}`
    console.log('Removido com sucesso!')
  } catch (error) {
    console.log(error)
  }
}
