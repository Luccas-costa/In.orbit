'use server'

import { sql } from '@vercel/postgres'

export async function CompletedExercise({
  sigla,
  completo,
}: {
  sigla: string
  completo: boolean
}) {
  try {
    console.log('Enviando dados para o banco de dados...')
    console.log(sigla, completo)
    await sql`INSERT INTO inorbit_academia (sigla, completo) VALUES (${sigla}, ${completo})`
    console.log('Enviado com sucesso!')
  } catch (error) {
    console.log(error)
  }
}
