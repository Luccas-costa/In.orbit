'use client'
import { useState } from 'react'
import { Eraser } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { InOrbitIcon } from '@/components/in-orbit-icon'
import { Progress, ProgressIndicator } from '@/components/ui/progress-bar'
import ExercicioPt from '@/components/exercicio-pt'
import ExercicioCb from '@/components/exercicio-cb'
import Expanded from '@/components/expanded'

import { allExercises } from '@/utils/series'

export default function Academia() {
  const [expanded, setExpanded] = useState(true)
  const [infoExercise, setInfoExercise] = useState({
    name: 'Supino máquina',
    link: 'te',
    serie: '4',
    reps: '12',
  })

  const handlerExpanded = (sigle: string) => {
    const foundExercise = allExercises.find(
      (exercise) => exercise.sigle === sigle,
    )
    if (foundExercise) {
      setInfoExercise({
        name: foundExercise.name,
        link: foundExercise.link,
        serie: foundExercise.series.toString(), // Convertendo `series` para string
        reps: foundExercise.reps.toString(), // Convertendo `reps` para string
      })
    }
    setExpanded(!expanded)
  }

  const handlerUnexpand = () => {
    setExpanded(false)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-[480px] flex-col gap-6 px-5 py-10 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold">in.orbit</span>
        </div>

        <Button className="size-sm h-[40px] w-[130px] px-2 text-xs">
          <Eraser className="size-4" />
          Limpar semana
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator
            style={{
              width: `${Math.round((3 / 7) * 100)}%`,
            }}
          />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você realizou <span className="text-zinc-100">3</span> dos{' '}
            <span className="text-zinc-100">7</span> treinos dessa semana.
          </span>
          <span>30%</span>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-6">
        {expanded ? (
          <Expanded
            handlerUnexpand={handlerUnexpand}
            name={infoExercise.name}
            link={infoExercise.link}
            serie={infoExercise.serie}
            reps={infoExercise.reps}
          />
        ) : (
          <>
            <h2 className="text-xl font-medium">Sua semana</h2>
            <ExercicioPt handlerExpanded={handlerExpanded} />
            <ExercicioCb handlerExpanded={handlerExpanded} />
          </>
        )}
      </div>
    </div>
  )
}
