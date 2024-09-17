'use server'

import { sql } from '@vercel/postgres'

export async function CreateGoal({
  id,
  title,
  date,
  frequency,
}: {
  id: number
  title: string
  date: string
  frequency: number
}) {
  try {
    console.log('Enviando dados para o banco de dados...')
    await sql`INSERT INTO inorbit_goals (id, title, date, frequency) VALUES (${id}, ${title}, ${date}, ${frequency})`
    console.log('Enviado com sucesso!')
  } catch (error) {
    console.log(error)
  }
}
