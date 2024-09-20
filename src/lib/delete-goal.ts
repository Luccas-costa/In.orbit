'use server'

import { sql } from '@vercel/postgres'

export async function DeleteGoal({ id }: { id: number }) {
  try {
    console.log('Removendo dados do banco de dados...')
    await sql`DELETE FROM inorbit_goals WHERE id = ${id}`
    console.log('Removido com sucesso!')
  } catch (error) {
    console.log(error)
  }
}
