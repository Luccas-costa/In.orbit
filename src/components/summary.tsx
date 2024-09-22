import { useState } from 'react'

import 'dayjs/locale/pt' // Importa o locale em português
import dayjs from 'dayjs'
import {
  CheckCircle2,
  ChevronRight,
  Plus,
  Trash2,
  CircleDotDashed,
  BotOff,
  Component,
} from 'lucide-react'

import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { DialogTrigger } from './ui/dialog'
import { InOrbitIcon } from './in-orbit-icon'
import { OutlineButton } from './ui/outline-button'
import { Progress, ProgressIndicator } from './ui/progress-bar'

import type { GoalType } from '@/types/goal'
import type { ManuelType, Manuel2Type } from '@/types/manuel'
import type { SummaryResult2 } from '@/types/summary-result'

import { SearchByIdGoal } from '@/lib/search-byid-goal'
import { SearchBytitleGoal } from '@/lib/search-bytitle-goal'

import { CompletedGoal } from '@/lib/completed-goal'

import { CreateGoal } from '@/lib/create-goal'

import { updateGoalTitleAndFrequency } from '@/lib/update-goal'

import { DeleteGoal } from '@/lib/delete-goal'
import { DeleteCompletedGoal } from '@/lib/delete-completed-goal'
import { DeleteByIdCompletedGoal } from '@/lib/delete-byId-completed-goal'

// Configura o locale para português
dayjs.locale('pt')

interface SummaryProps {
  goals: { title: string; id: number }[]
  handlerCompletedGoal: (id: number) => void
  completedGoals: { title: string; id: number }[]
  completedGoalsFormated: SummaryResult2[]
  handlerrefresh: (value: boolean) => void
}

export function Summary({
  goals,
  handlerCompletedGoal,
  completedGoals,
  completedGoalsFormated,
  handlerrefresh,
}: SummaryProps) {
  const [isDeleteGoalBtnOpen, setIsDeleteGoalBtnOpen] = useState(false)
  const [UpdateGoal, setUpdateGoal] = useState(false)
  const [ManuelGoal, setManuelGoal] = useState(false)
  const [ManuelGoal3, setManuelGoal3] = useState(false)
  const [ManuelGoal2, setManuelGoal2] = useState(false)
  const [UpdateChosen, setUpdateChosen] = useState(false)
  const [isChosen, setIsChosen] = useState(false)
  const [Manueldata, setManueldata] = useState<ManuelType>({
    title: '',
    date: '',
    frequency: 0,
  })
  const [Manueldata2, setManueldata2] = useState<Manuel2Type>({
    title: '',
    date: '',
  })
  const [DataGoalManuel2, setDataGoalManuel2] = useState<GoalType>({
    id: 0,
    title: '',
    date: '',
    frequency: 0,
  })
  const [UpdateData, setUpdateData] = useState<GoalType>({
    id: 0,
    title: '',
    date: '',
    frequency: 0,
  })

  const handlerUpdateReset = () => {
    setIsChosen(false)
    setUpdateGoal(true)
    setUpdateChosen(false)
  }

  const handlerChosenReset = () => {
    setIsChosen(!isChosen)
    setIsDeleteGoalBtnOpen(false)
    setUpdateGoal(false)
    setManuelGoal2(false)
    setManuelGoal3(false)
    setManuelGoal2(false)
    setUpdateChosen(false)
  }

  const handlerDeletarReset = () => {
    setIsChosen(false)
    setUpdateGoal(false)
    setManuelGoal(false)
    setManuelGoal2(false)
    setUpdateChosen(false)
    setIsDeleteGoalBtnOpen(true)
  }

  const handlerManuelReset = () => {
    setIsChosen(false)
    setUpdateGoal(false)
    setManuelGoal(true)
    setManuelGoal2(false)
    setUpdateChosen(false)
    setIsDeleteGoalBtnOpen(false)
  }

  const completedGoalsIds = completedGoals.map((goal) => goal.id)

  const goalsCompleted = goals.filter((goal) =>
    completedGoalsIds.includes(goal.id),
  )

  const goalsNotCompleted = goals.filter(
    (goal) => !completedGoalsIds.includes(goal.id),
  )

  const completedByDay = completedGoalsFormated
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .reduce(
      (acc, goal) => {
        const day = dayjs(goal.date)
          .format('dddd, D [de] MMMM')
          .replace(/^\w/, (c) => c.toUpperCase())
        if (!acc[day]) {
          acc[day] = []
        }
        acc[day].push(goal)
        return acc
      },
      {} as { [day: string]: SummaryResult2[] },
    )

  const handlerDeleteGoal = async (id: number, date: string) => {
    await DeleteCompletedGoal({
      idGoal: id,
      dateCompleted: date,
    })
    console.log('Meta excluída com sucesso!')
    handlerrefresh(true)
  }

  const handlerDeleteGoalById = async (idGoal: number) => {
    const id = idGoal
    await DeleteByIdCompletedGoal({ idGoal })
    await DeleteGoal({ id })
    console.log('Metas excluída com sucesso!')
    setIsDeleteGoalBtnOpen(false)
    handlerrefresh(true)
  }

  const handlerUpdate = async (goalid: number) => {
    const id = Number(goalid)
    setUpdateGoal(false)
    setUpdateChosen(true)
    try {
      const goal = await SearchByIdGoal(id) // Chamada da função

      if (goal) {
        setUpdateData(goal) // Armazena o objetivo no estado
        console.log('Goal encontrado:', goal)
      } else {
        console.log('Nenhum objetivo encontrado com esse ID.')
      }
    } catch (error) {
      console.error('Erro ao buscar o objetivo:', error)
    }
  }

  const handlerUpdateGoalResult = async (
    id: number,
    title: string,
    frequency: number,
  ) => {
    await updateGoalTitleAndFrequency(id, title, frequency)
    setUpdateChosen(false)
    setUpdateGoal(false)
    setManuelGoal(false)
    setManuelGoal2(false)
    setUpdateData({
      id: 0,
      title: '',
      date: '',
      frequency: 0,
    })
    handlerrefresh(true)
  }

  const handlerManuel = async (
    title: string,
    date: string,
    frequency: number,
  ) => {
    const randomId = Math.floor(10000 + Math.random() * 90000)
    await CreateGoal({
      id: randomId,
      title,
      date,
      frequency,
    })
    setManuelGoal(false)
    setManuelGoal2(false)
    handlerrefresh(true)
  }

  const handlerManuel2 = async (title: string, date: string) => {
    console.log(Manueldata2)
    console.log(title)
    console.log(date)
    try {
      const goal = await SearchBytitleGoal(title) // Chamada da função

      if (goal) {
        setDataGoalManuel2(goal) // Armazena o objetivo no estado
        console.log('Goal encontrado:', goal)
      } else {
        console.log('Nenhum objetivo encontrado com esse ID.')
      }
    } catch (error) {
      console.error('Erro ao buscar o objetivo:', error)
    }
    console.log(DataGoalManuel2)
    console.log({
      idGoal: DataGoalManuel2.id,
      dateCompleted: Manueldata2.date,
      dateCompleted2: date,
    })
    await CompletedGoal({
      idGoal: DataGoalManuel2.id,
      dateCompleted: date,
    })

    setManuelGoal(false)
    setManuelGoal2(false)
    setManuelGoal3(false)
    handlerrefresh(true)
  }

  const handlerManuelOption1 = () => {
    setManuelGoal(false)
    setManuelGoal2(true)
    setManuelGoal3(false)
  }
  const handlerManuelOption2 = () => {
    setManuelGoal(false)
    setManuelGoal2(false)
    setManuelGoal3(true)
  }

  return (
    <div className="mx-auto flex max-w-[480px] flex-col gap-6 px-5 py-10 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold">5 a 10 de agosto</span>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`cursor-pointer transition-all duration-200 ${isChosen ? 'rotate-90' : ''}`}
            onClick={handlerChosenReset}
          >
            <ChevronRight className="size-6 text-zinc-600" />
          </div>
          {isChosen ? (
            <div className="flex flex-col gap-2">
              <div>
                <Button
                  className="size-sm w-[130px]"
                  onClick={handlerChosenReset}
                >
                  <Component className="size-4" />
                  Opções
                </Button>
              </div>
              <div className="absolute top-[90px] flex flex-col gap-2 bg-zinc-950">
                <div>
                  <DialogTrigger asChild onClick={handlerChosenReset}>
                    <Button className="size-sm h-[40px] w-[130px] px-2 text-xs">
                      <Plus className="size-4" />
                      Cadastrar meta
                    </Button>
                  </DialogTrigger>
                </div>
                <div onClick={handlerUpdateReset}>
                  <Button className="size-sm h-[40px] w-[130px] text-xs">
                    <CircleDotDashed className="size-4" />
                    Alterar uma meta
                  </Button>
                </div>
                <div onClick={handlerManuelReset}>
                  <Button className="size-sm h-[40px] w-[130px] text-xs">
                    <BotOff className="size-4" />
                    Controle manual
                  </Button>
                </div>
                <div onClick={handlerDeletarReset}>
                  <Button className="size-sm h-[40px] w-[130px] text-xs">
                    <Trash2 className="size-4" />
                    Deletar meta
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Button
              className="size-sm h-[40px] w-[130px]"
              onClick={handlerChosenReset}
            >
              <Component className="size-4" />
              Opções
            </Button>
          )}

          {ManuelGoal && (
            <div className="absolute top-[90px] max-h-screen w-[130px] translate-x-[32px] overflow-y-auto rounded-lg bg-zinc-900">
              <div className="flex flex-col gap-3 p-1">
                <div
                  onClick={handlerManuelOption1}
                  className="w-full cursor-pointer rounded-lg border-none bg-zinc-800/70 p-2 text-center text-white hover:bg-zinc-700/80 focus:outline-none"
                >
                  Goals
                </div>
                <div
                  onClick={handlerManuelOption2}
                  className="w-full cursor-pointer rounded-lg border-none bg-zinc-800/70 p-2 text-center text-white hover:bg-zinc-700/80 focus:outline-none"
                >
                  Completed
                </div>
              </div>
            </div>
          )}

          {ManuelGoal2 && (
            <div className="absolute top-[90px] max-h-screen w-[130px] translate-x-[32px] overflow-y-auto rounded-lg bg-zinc-900">
              <div className="flex flex-col gap-3 p-1">
                <input
                  type="text"
                  className="w-full rounded-lg border-none bg-zinc-800/70 p-2 text-white focus:outline-none"
                  placeholder="title"
                  onChange={(e) =>
                    setManueldata({ ...Manueldata, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="w-full rounded-lg border-none bg-zinc-800/70 p-2 text-white placeholder:text-xs focus:outline-none"
                  placeholder="2024/09/19-14:42:16"
                  onChange={(e) =>
                    setManueldata({ ...Manueldata, date: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="w-full rounded-lg border-none bg-zinc-800/70 p-2 text-white focus:outline-none"
                  placeholder="frequency"
                  onChange={(e) =>
                    setManueldata({
                      ...Manueldata,
                      frequency: parseInt(e.target.value), // Converte a string para número
                    })
                  }
                />
                <button
                  onClick={() =>
                    handlerManuel(
                      Manueldata.title,
                      Manueldata.date,
                      Manueldata.frequency,
                    )
                  }
                  className="w-full rounded-lg border-none bg-purple-500/70 p-2 text-white focus:outline-none"
                >
                  Alterar
                </button>
              </div>
            </div>
          )}
          {ManuelGoal3 && (
            <div className="absolute top-[90px] max-h-screen w-[130px] translate-x-[32px] overflow-y-auto rounded-lg bg-zinc-900">
              <div className="flex flex-col gap-3 p-1">
                <input
                  type="text"
                  className="w-full rounded-lg border-none bg-zinc-800/70 p-2 text-white focus:outline-none"
                  placeholder="title"
                  onChange={(e) =>
                    setManueldata2({ ...Manueldata2, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="w-full rounded-lg border-none bg-zinc-800/70 p-2 text-white placeholder:text-xs focus:outline-none"
                  placeholder="2024/09/19-14:42:16"
                  onChange={(e) =>
                    setManueldata2({ ...Manueldata2, date: e.target.value })
                  }
                />
                <button
                  onClick={() =>
                    handlerManuel2(Manueldata2.title, Manueldata2.date)
                  }
                  className="w-full rounded-lg border-none bg-purple-500/70 p-2 text-white focus:outline-none"
                >
                  Alterar
                </button>
              </div>
            </div>
          )}

          {UpdateGoal && (
            <div className="absolute top-[95px] max-h-screen w-[130px] translate-x-[32px] overflow-y-auto rounded-lg bg-zinc-900">
              <div className="flex flex-col">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`justfy-center w-[calc(100% /${goal.title.length})] flex h-full cursor-pointer items-center p-2 hover:bg-zinc-800`}
                    onClick={() => handlerUpdate(goal.id)}
                  >
                    {'-| '}
                    {goal.title}
                  </div>
                ))}
              </div>
            </div>
          )}
          {UpdateChosen && (
            <div className="absolute top-[90px] max-h-screen w-[130px] translate-x-[32px] overflow-y-auto rounded-lg bg-zinc-900">
              <div className="flex flex-col gap-3 p-1">
                <input
                  type="text"
                  className="w-full rounded-lg border-none bg-zinc-800/70 p-2 text-white focus:outline-none"
                  value={UpdateData.title || ''}
                  onChange={(e) =>
                    setUpdateData({ ...UpdateData, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="w-full rounded-lg border-none bg-zinc-800/70 p-2 text-white focus:outline-none"
                  value={UpdateData.frequency || ''}
                  onChange={(e) =>
                    setUpdateData({
                      ...UpdateData,
                      frequency: parseInt(e.target.value), // Converte a string para número
                    })
                  }
                />
                <button
                  onClick={() =>
                    handlerUpdateGoalResult(
                      UpdateData.id,
                      UpdateData.title,
                      UpdateData.frequency,
                    )
                  }
                  className="w-full rounded-lg border-none bg-purple-500/70 p-2 text-white focus:outline-none"
                >
                  Alterar
                </button>
              </div>
            </div>
          )}

          {isDeleteGoalBtnOpen && (
            <div className="absolute top-[90px] max-h-screen w-[132px] translate-x-[32px] overflow-y-auto rounded-lg bg-zinc-900">
              <div className="flex flex-col">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`justfy-center w-[calc(100% /${goal.title.length})] flex h-full cursor-pointer items-center p-2 hover:bg-zinc-800`}
                    onClick={() => handlerDeleteGoalById(goal.id)}
                  >
                    {'-| '}
                    {goal.title}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator
            style={{
              width: `${Math.round((goalsCompleted.length / goals.length) * 100)}%`,
            }}
          />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{goalsCompleted.length}</span> de{' '}
            <span className="text-zinc-100">{goals.length}</span> metas nessa
            semana.
          </span>
          <span>
            {Math.round((goalsCompleted.length / goals.length) * 100)}%
          </span>
        </div>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-3">
        {goalsNotCompleted.map((goal) => (
          <OutlineButton
            key={goal.id}
            variant="default"
            onClick={() => handlerCompletedGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        ))}

        {goalsCompleted.map((goal) => (
          <OutlineButton
            key={goal.id}
            variant="disabled"
            onClick={() => handlerCompletedGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600/40" />
            {goal.title}
          </OutlineButton>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>
        <div className="flex max-h-[600px] flex-col gap-6 overflow-y-auto">
          {Object.keys(completedByDay).map((day) => (
            <div key={day}>
              <div className="mb-2 flex items-center space-x-2">
                <h3 className="font-medium">{day.split(', ')[0]}</h3>
                <div className="text-xs text-zinc-400">
                  {'('}
                  {day.split(', ')[1]}
                  {')'}
                </div>
              </div>
              <ul className="flex flex-col gap-3">
                {completedByDay[day].map((goal) => (
                  <li key={goal.id} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-pink-500" />
                    <span className="text-sm text-zinc-400">
                      Você completou{' '}
                      <span className="text-zinc-100">{goal.title}</span> às{' '}
                      <span className="text-zinc-100">
                        {dayjs(goal.date).format('HH:mm')}
                      </span>
                    </span>
                    <span
                      className="cursor-pointer text-[11px] text-zinc-600 underline"
                      onClick={() => handlerDeleteGoal(goal.id, goal.date)}
                    >
                      Desfazer
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
