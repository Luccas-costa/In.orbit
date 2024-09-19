import { DialogTrigger } from './ui/dialog'
import { CheckCircle2, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { InOrbitIcon } from './in-orbit-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { OutlineButton } from './ui/outline-button'

interface SummaryProps {
  goals: { title: string; id: number }[]
  handlerCompletedGoal: (id: number) => void
}

export function Summary({ goals, handlerCompletedGoal }: SummaryProps) {
  return (
    <div className="mx-auto flex max-w-[480px] flex-col gap-6 px-5 py-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold">5 a 10 de agosto</span>
        </div>

        <DialogTrigger asChild>
          <Button className="size-sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: '50%' }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou <span className="text-zinc-100">0</span> de{' '}
            <span className="text-zinc-100">{goals.length}</span> metas nessa
            semana.
          </span>
          <span>50%</span>
        </div>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-3">
        {goals.map((goal) => (
          <OutlineButton
            key={goal.id}
            onClick={() => handlerCompletedGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        <div className="flex flex-col gap-4">
          <h3 className="font-medium">
            Domingo{' '}
            <span className="text-xs text-zinc-400">(10 de Agosto)</span>
          </h3>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">
                Você completou{' '}
                <span className="text-zinc-100">Acordar cedo</span> às{' '}
                <span className="text-zinc-100">08:13</span>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">
                Você completou{' '}
                <span className="text-zinc-100">Acordar cedo</span> às{' '}
                <span className="text-zinc-100">08:13</span>
              </span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-medium">
            Segunda-feira{' '}
            <span className="text-xs text-zinc-400">(11 de Agosto)</span>
          </h3>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">
                Você completou{' '}
                <span className="text-zinc-100">Acordar cedo</span> às{' '}
                <span className="text-zinc-100">08:13</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
