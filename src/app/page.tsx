'use client'
import { useEffect, useState } from 'react'
import { Eraser } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { InOrbitIcon } from '@/components/in-orbit-icon'
import { Progress, ProgressIndicator } from '@/components/ui/progress-bar'
import ExercicioPt from '@/components/exercicio-pt'
import ExercicioCb from '@/components/exercicio-cb'
import Expanded from '@/components/expanded'

import { allExercises } from '@/utils/series'
import { CompletedExercise } from '@/lib/completed-exercise'
import { DeleteCompletedExercise } from '@/lib/delete-completed-exercise'
import { CompletedExerciseType } from '@/types/completeded-exercise'
import { SearchCompletedExercise } from '@/lib/search-completed-exercise'
import Loader from '@/assets/loading'
import { DeleteAllCompletedGoals } from '@/lib/delete-all-completed-exercise'

export default function Academia() {
  const [expanded, setExpanded] = useState(false)
  const [infoExercise, setInfoExercise] = useState({
    sigle: '',
    name: '',
    link: '',
    serie: '',
    reps: '',
    completed: false,
  })
  // eslint-disable-next-line prettier/prettier
  const [completeExercise, setCompleteExercise] = useState<CompletedExerciseType[]>([])
  const [loading, setLoading] = useState(true)

  const handlerExpanded = (sigle: string, completed: boolean) => {
    const foundExercise = allExercises.find(
      (exercise) => exercise.sigle === sigle,
    )
    if (foundExercise) {
      setInfoExercise({
        sigle: foundExercise.sigle,
        name: foundExercise.name,
        link: foundExercise.link,
        serie: foundExercise.series.toString(), // Convertendo `series` para string
        reps: foundExercise.reps.toString(), // Convertendo `reps` para string
        completed,
      })
    }
    setExpanded(!expanded)
  }

  const handlerUnexpand = () => {
    setExpanded(false)
  }

  const handlerCompletedExercise = async (sigla: string) => {
    await CompletedExercise({ sigla, completo: true })
  }

  const handlerDeleteExercise = async (sigla: string) => {
    await DeleteCompletedExercise({ sigla })
  }
  const handlerAllDeleteExercise = async () => {
    await DeleteAllCompletedGoals()
  }

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true)
      try {
        const data = await SearchCompletedExercise()
        setCompleteExercise(data)
      } catch (err) {
        console.error('Erro ao buscar exercícios:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchExercises()
  }, [])
  return (
    <div className="mx-auto flex min-h-screen max-w-[480px] flex-col gap-6 px-5 py-10 transition-all">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <InOrbitIcon />
              <span className="text-lg font-semibold">in.orbit</span>
            </div>

            <Button
              className="size-sm h-[40px] w-[130px] px-2 text-xs"
              onClick={handlerAllDeleteExercise}
            >
              <Eraser className="size-4" />
              Limpar semana
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            <Progress value={8} max={15}>
              <ProgressIndicator
                style={{
                  width: `${Math.round((completeExercise.length / allExercises.length) * 100)}%`,
                }}
              />
            </Progress>

            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>
                Você realizou{' '}
                <span className="text-zinc-100">
                  {completeExercise.length.toString()}
                </span>{' '}
                dos{' '}
                <span className="text-zinc-100">
                  {allExercises.length.toString()}
                </span>{' '}
                exercicios dessa semana.
              </span>
              <span>
                {Math.round(
                  (completeExercise.length / allExercises.length) * 100,
                ).toFixed(0)}
                %
              </span>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-6">
            {expanded ? (
              <Expanded
                handlerUnexpand={handlerUnexpand}
                sigle={infoExercise.sigle}
                name={infoExercise.name}
                link={infoExercise.link}
                serie={infoExercise.serie}
                reps={infoExercise.reps}
                completed={infoExercise.completed}
              />
            ) : (
              <>
                <h2 className="text-xl font-medium">Sua semana</h2>
                <ExercicioPt
                  handlerExpanded={handlerExpanded}
                  handlerCompletedExercise={handlerCompletedExercise}
                  handlerDeleteExercise={handlerDeleteExercise}
                  completedExercises={completeExercise}
                />
                <ExercicioCb
                  handlerExpanded={handlerExpanded}
                  handlerCompletedExercise={handlerCompletedExercise}
                  handlerDeleteExercise={handlerDeleteExercise}
                  completedExercises={completeExercise}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
