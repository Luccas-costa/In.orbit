'use client'
import { useEffect, useState } from 'react'
import { CaretDown, CheckCircle } from '@phosphor-icons/react/dist/ssr'
import { CB } from '@/utils/series'

interface ExercicioCbProps {
  handlerExpanded: (sigle: string, completed: boolean) => void
  handlerCompletedExercise: (sigla: string) => void
  handlerDeleteExercise: (sigla: string) => void
  completedExercises: { sigla: string; completo: boolean }[]
}

export default function ExercicioCb({
  handlerExpanded,
  handlerCompletedExercise,
  handlerDeleteExercise,
  completedExercises,
}: ExercicioCbProps) {
  const [isopen, setIsopen] = useState(false)
  const [Exercicio, setExercicio] = useState<string[]>([])

  const toggleDia = (sigle: string) => {
    setExercicio(
      (prevDias) =>
        prevDias.includes(sigle)
          ? prevDias.filter((d) => d !== sigle) // Remove o dia se já estiver no array
          : [...prevDias, sigle], // Adiciona o dia se não estiver no array
    )
    if (Exercicio.includes(sigle)) {
      handlerDeleteExercise(sigle)
    } else {
      handlerCompletedExercise(sigle)
    }
  }

  useEffect(() => {
    const completedSiglas = completedExercises
      .filter(({ completo, sigla }) => completo && sigla.startsWith('CB')) // Filtra os exercícios completos que começam com "PT"
      .map(({ sigla }) => sigla) // Pega apenas as siglas dos exercícios completos

    setExercicio(completedSiglas) // Adiciona as siglas completas ao estado
  }, [completedExercises]) // Executa toda vez que `completedExercises` mudar

  return (
    <div className="flex max-h-[600px] select-none flex-col gap-2 overflow-y-auto">
      <div className="mb-2 flex items-center space-x-2">
        <span
          className={`cursor-pointer ${isopen ? 'rotate-180' : ''} transition-all duration-200`}
          onClick={() => setIsopen(!isopen)}
        >
          <CaretDown size={16} color="#ec4899" weight="bold" />
        </span>
        {Exercicio.length === 7 && (
          <CheckCircle size={20} color="#ec4899" weight={'bold'} />
        )}
        <span>Terça-feira</span>
        <span className="text-xs text-zinc-400">
          {'('}
          Costas e Biceps
          {')'}
        </span>
      </div>
      {isopen && (
        <ul className="ml-2 flex flex-col gap-3">
          {CB.map(({ sigle, name, series, reps }) => (
            <li key={sigle} className="flex items-center gap-2">
              <CheckCircle
                size={20}
                color="#ec4899"
                weight={Exercicio.includes(sigle) ? 'fill' : 'bold'}
                onClick={() => toggleDia(sigle)}
              />
              <span className="text-sm text-zinc-400">
                {Exercicio.includes(sigle) ? 'Feito' : 'A fazer'}{' '}
                <span className="text-zinc-100">{name}</span> com{' '}
                <span className="text-zinc-100">
                  {series} <span className="text-zinc-400">de</span> {reps}{' '}
                </span>
                <span
                  className="cursor-pointer text-[11px] text-zinc-600 underline"
                  onClick={() =>
                    handlerExpanded(sigle, Exercicio.includes(sigle))
                  }
                >
                  expandir
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
