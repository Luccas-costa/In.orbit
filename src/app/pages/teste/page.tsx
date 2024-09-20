'use client'
import React, { useEffect, useState } from 'react'
import { Summary } from '@/db/summary' // Importa a função que criamos

type Goal = {
  id: number
  title: string
}

const CompletedGoalsList = () => {
  const [completedGoals, setCompletedGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Função para buscar as metas batidas
  const fetchCompletedGoals = async () => {
    try {
      setLoading(true)
      const result = await Summary()
      setCompletedGoals(result) // Define a lista de metas no estado
    } catch (err) {
      setError('Erro ao carregar as metas batidas.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Chama a função assim que o componente for montado
  useEffect(() => {
    fetchCompletedGoals()
  }, [])

  if (loading) {
    return <div>Carregando...</div> // Exibe um indicador de carregamento enquanto a função é executada
  }

  if (error) {
    return <div>{error}</div> // Exibe a mensagem de erro, se houver
  }

  return (
    <div>
      <h2>Metas Batidas Esta Semana</h2>
      {completedGoals.length === 0 ? (
        <p>Nenhuma meta foi batida esta semana.</p>
      ) : (
        <ul>
          {completedGoals.map((goal) => (
            <li key={goal.id}>{goal.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CompletedGoalsList
