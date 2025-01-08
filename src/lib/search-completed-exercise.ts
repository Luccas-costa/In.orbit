'use server'

import { sql } from '@vercel/postgres'
import { CompletedExerciseType } from '@/types/completeded-exercise'

export async function SearchCompletedExercise(): Promise<
  CompletedExerciseType[]
> {
  try {
    const result = await sql`SELECT * FROM inorbit_academia` // Consulta SQL
    console.log('Resultado da consulta:', result.rows) // Verificando os dados retornados

    const goals: CompletedExerciseType[] = result.rows.map((row) => ({
      sigla: row.sigla || 'err', // Se 'sigle' for null ou undefined, será 'err'
      completo: row.completo || false, // Se 'completed' for null ou undefined, será false
    }))

    return goals
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao buscar dados do banco de dados')
  }
}
