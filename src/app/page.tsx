'use client'
import React, { useState, useEffect } from 'react'

import dayjs from 'dayjs'
import { GoalType } from '@/types/goal'
import { SearchGoals } from '../lib/search-goal'
import { DataCreateType } from '@/types/dataCreate'
import { CreateGoal as CreateGoaldb } from '../lib/create-goal'

import { EmptyGoals } from '@/components/empty-goals'
import { Summary } from '@/components/summary'
import { Dialog } from '@/components/ui/dialog'
import { CreateGoal } from '../components/create-goal'
import Loader from '../assets/loading'
import { CompletedGoal } from '@/lib/completed-goal'

export default function Home() {
  const [goals, setGoals] = useState<GoalType[]>([]) // Definindo o tipo conforme sua função
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const fetchGoals = async () => {
      setLoading(true)
      try {
        const data = await SearchGoals() // Chama a função SearchGoals
        setGoals(data) // Armazena os dados no estado
      } catch (err) {
        console.error('Erro ao buscar objetivos:', err)
        setError(false)
      } finally {
        setLoading(false)
      }
    }

    fetchGoals() // Chama a função ao montar o componente
  }, [])

  const dataCreate = {
    title: '',
    frequency: 0, // Garantir que frequency seja inicializado corretamente
  }

  const [data, setData] = useState<DataCreateType>(dataCreate)

  const handlerUpdateData = (key: string, value: string | number) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  const getFormattedDate = () => dayjs().format('YYYY/MM/DD-HH:mm:ss')

  const handlerCreateGoal = async () => {
    if (!data.title) {
      console.error('Title is undefined or empty')
      return
    }

    const randomId = Math.floor(10000 + Math.random() * 90000)
    const frequency = data.frequency // Atribuir frequency direto de data
    const date = getFormattedDate()

    await CreateGoaldb({
      id: randomId || 1,
      title: data.title || 'Não funcionou',
      date: date || 'Não funcionou',
      frequency: frequency || 1,
    })
  }

  const handlerCompletedGoal = async (id: number) => {
    const date = getFormattedDate()
    await CompletedGoal({
      idGoal: id,
      dateCompleted: date,
    })
    console.log('Meta concluída com sucesso!')
  }

  return (
    <div className="min-h-screen">
      <Dialog>
        {loading ? (
          <Loader />
        ) : error ? (
          <EmptyGoals />
        ) : (
          <Summary goals={goals} handlerCompletedGoal={handlerCompletedGoal} />
        )}
        <CreateGoal
          dataCreate={data}
          handlerUpdateData={handlerUpdateData}
          handlerCreateGoal={handlerCreateGoal}
        />
      </Dialog>
    </div>
  )
}
