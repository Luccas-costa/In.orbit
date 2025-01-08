'use server'

import { sql } from '@vercel/postgres'

export async function DeleteCompletedExercise({ sigla }: { sigla: string }) {
  try {
    console.log('Removendo dados do banco de dados...')
    await sql`DELETE FROM inorbit_academia WHERE sigla = ${sigla} `
    console.log('Removido com sucesso!')
  } catch (error) {
    console.log(error)
  }
}
