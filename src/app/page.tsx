'use client'
import React, { useState } from 'react'
import { CreateGoal } from '../lib/create-goal'
// import { EmptyGoals } from '@/components/empty-goals'
import { Summary } from '@/components/summary'
import { Dialog } from '@/components/ui/dialog'
import dayjs from 'dayjs'
import { DataCreateType } from '@/types/dataCreate'

export default function Home() {
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

    const frequency = data.frequency // Atribuir frequency direto de data
    const randomId = Math.floor(10000 + Math.random() * 90000)
    const date = getFormattedDate()

    await CreateGoal({
      id: randomId || 1,
      title: data.title || "n foi",
      date: date || 'nao foi',
      frequency: frequency || 1,
    })
  }

  return (
    <div className="min-h-screen">
      <Dialog>
        <Summary />
        <CreateGoal
          dataCreate={data}
          handlerUpdateData={handlerUpdateData}
          handlerCreateGoal={handlerCreateGoal}
        />
      </Dialog>
    </div>
  )
}
