'use client'
import React, { useState } from 'react'
import { CreateGoal } from '@/components/create-goal'
// import { EmptyGoals } from '@/components/empty-goals'
import { Summary } from '@/components/summary'
import { Dialog } from '@/components/ui/dialog'
import { DataCreateType } from '@/types/dataCreate'

export default function Home() {
  const dataCreate = {
    title: '',
    frequency: 0,
  }

  const [data, setData] = useState<DataCreateType>(dataCreate)

  const handlerUpdateData = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  const handlerCreateGoal = async () => {
    const frequency = parseInt(data.title, 10);

    await CreateGoal({
      id: 1,
      title: data.title,
      date: "teste",
      frequency: frequency,
    });
  }

  return (
    <div className="min-h-screen">
      <Dialog>
        {/* <EmptyGoals /> */}
        <Summary />

        <CreateGoal dataCreate={data} handlerUpdateData={handlerUpdateData} />
      </Dialog>
    </div>
  )
}
