'use client'
import React, { useState, useEffect } from 'react'

import dayjs from 'dayjs'

import { GoalType } from '@/types/goal'
import { DataCreateType } from '@/types/dataCreate'
import { SummaryResult2, SummaryResultType } from '@/types/summary-result'

import { SearchGoals } from '../lib/search-goal'
import { CompletedGoal } from '@/lib/completed-goal'
import { CreateGoal as CreateGoaldb } from '../lib/create-goal'

import { Summary as Summarydb } from '@/db/summary'

import Loader from '../assets/loading'
import { Summary } from '@/components/summary'
import { Dialog } from '@/components/ui/dialog'
import { EmptyGoals } from '@/components/empty-goals'
import { CreateGoal } from '../components/create-goal'
import { SummaryGroup } from '@/db/summary-group'

export default function Home() {
  const [goals, setGoals] = useState<GoalType[]>([]) // Definindo o tipo conforme sua função
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  const [completedGoals, setCompletedGoals] = useState<SummaryResultType[]>([])
  const [completedGoalsFormated, setCompletedGoalsFormated] = useState<
    SummaryResult2[]
  >([])

  useEffect(() => {
    const fetchGoals = async () => {
      setLoading(true)
      try {
        const data = await SearchGoals() // Chama a função SearchGoals
        setGoals(data) // Armazena os dados no estado
      } catch (err) {
        console.error('Erro ao buscar objetivos:', err)
        setError(false)
      }
    }

    const fetchCompletedGoals = async () => {
      try {
        setLoading(true)
        const result = await Summarydb()
        setCompletedGoals(result) // Define a lista de metas no estado
      } catch (err) {
        setError(true)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    const fetchCompletedGoalsFormated = async () => {
      try {
        setLoading(true)
        const result = await SummaryGroup()

        // Filtra os resultados que não são nulos
        const filteredResult = result.filter((item) => item !== null)

        setCompletedGoalsFormated(filteredResult as SummaryResult2[]) // Define a lista de metas no estado
      } catch (err) {
        setError(true)
        console.error(err)
      }
    }

    fetchGoals() // Chama a função ao montar o componente
    fetchCompletedGoalsFormated()
    fetchCompletedGoals()
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
          <Summary
            goals={goals}
            handlerCompletedGoal={handlerCompletedGoal}
            completedGoals={completedGoals}
            completedGoalsFormated={completedGoalsFormated}
          />
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
