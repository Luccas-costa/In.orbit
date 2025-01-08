'use server'

import { sql } from '@vercel/postgres'

export async function DeleteAllCompletedGoals() {
  try {
    console.log('Removendo todos os dados da tabela...')
    await sql`DELETE FROM inorbit_completed`
    console.log('Todos os dados foram removidos com sucesso!')
  } catch (error) {
    console.log('Erro ao remover dados:', error)
  }
}
