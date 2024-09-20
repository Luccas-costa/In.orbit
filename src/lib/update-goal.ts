'use server'

import { sql } from '@vercel/postgres'

export async function updateGoalTitleAndFrequency(
  id: number,
  title: string,
  frequency: number,
): Promise<void> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await sql`
      UPDATE inorbit_goals 
      SET title = ${title}, frequency = ${frequency}
      WHERE id = ${id}
    `

    console.log(`Goal with ID ${id} updated successfully.`)
  } catch (error) {
    console.error('Error updating goal:', error)
    throw new Error('Error updating goal in the database')
  }
}
