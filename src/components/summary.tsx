import { useState } from 'react'

import 'dayjs/locale/pt' // Importa o locale em português
import dayjs from 'dayjs'
import { CheckCircle2, ChevronRight, Plus, Trash2 } from 'lucide-react'

import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { DialogTrigger } from './ui/dialog'
import { InOrbitIcon } from './in-orbit-icon'
import { OutlineButton } from './ui/outline-button'
import { Progress, ProgressIndicator } from './ui/progress-bar'

import { SummaryResult2 } from '@/types/summary-result'

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
}

export function Summary({
  goals,
  handlerCompletedGoal,
  completedGoals,
  completedGoalsFormated,
}: SummaryProps) {
  const [isDeleteGoalBtnOpen, setIsDeleteGoalBtnOpen] = useState(false)

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
  }

  const handlerDeleteGoalById = async (idGoal: number) => {
    const id = idGoal
    await DeleteByIdCompletedGoal({ idGoal })
    await DeleteGoal({ id })
    console.log('Metas excluída com sucesso!')
  }

  return (
    <div className="mx-auto flex max-w-[480px] flex-col gap-6 px-5 py-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold">5 a 10 de agosto</span>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`cursor-pointer transition-all duration-200 ${isDeleteGoalBtnOpen ? 'rotate-180' : ''}`}
            onClick={() => setIsDeleteGoalBtnOpen(!isDeleteGoalBtnOpen)}
          >
            <ChevronRight className="size-8 text-zinc-600" />
          </div>
          {isDeleteGoalBtnOpen ? (
            <div className="flex flex-col gap-1">
              <DialogTrigger asChild>
                <Button className="size-sm">
                  <Trash2 className="size-4" />
                  Deletar meta
                </Button>
              </DialogTrigger>
              <div className="h-max-screen absolute top-[90px] w-[132px] overflow-y-auto rounded-lg bg-zinc-900">
                <div className="flex flex-col">
                  {goals.map((goal) => (
                    <div
                      key={goal.id}
                      className={`justfy-center w-[calc(100% /${goal.title.length})] flex h-full cursor-pointer items-center p-2 hover:bg-zinc-800`}
                      onClick={() => handlerDeleteGoalById(goal.id)}
                    >
                      {'-> '}
                      {goal.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <DialogTrigger asChild>
              <Button className="size-sm px-2">
                <Plus className="size-4" />
                Cadastrar meta
              </Button>
            </DialogTrigger>
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
        <div className="flex max-h-[350px] flex-col gap-6 overflow-y-auto">
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
