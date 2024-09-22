'use server'

import { sql } from '@vercel/postgres'

export async function CompletedGoal({
  idGoal,
  dateCompleted,
}: {
  idGoal: number
  dateCompleted: string
}) {
  try {
    console.log('Enviando dados para o banco de dados...')
    console.log(idGoal, dateCompleted)
    await sql`INSERT INTO inorbit_completed (id_goal, date_completed) VALUES (${idGoal}, ${dateCompleted})`
    console.log('Enviado com sucesso!')
  } catch (error) {
    console.log(error)
  }
}
