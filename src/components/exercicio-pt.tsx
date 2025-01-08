'use client'
import { useState } from 'react'
import { CaretDown, CheckCircle } from '@phosphor-icons/react/dist/ssr'
import { PT } from '@/utils/series'

interface ExercicioPtProps {
  handlerExpanded: (sigle: string) => void
}

export default function ExercicioPt({ handlerExpanded }: ExercicioPtProps) {
  const [isopen, setIsopen] = useState(false)
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([])

  const toggleDia = (dia: string) => {
    setDiasSelecionados(
      (prevDias) =>
        prevDias.includes(dia)
          ? prevDias.filter((d) => d !== dia) // Remove o dia se já estiver no array
          : [...prevDias, dia], // Adiciona o dia se não estiver no array
    )
  }

  return (
    <div className="flex max-h-[600px] select-none flex-col gap-2 overflow-y-auto">
      <div className="mb-2 flex items-center space-x-2">
        <span
          className={`cursor-pointer ${isopen ? 'rotate-180' : ''} transition-all duration-200`}
          onClick={() => setIsopen(!isopen)}
        >
          <CaretDown size={16} color="#ec4899" weight="bold" />
        </span>
        {diasSelecionados.length === 5 && (
          <CheckCircle size={20} color="#ec4899" weight={'bold'} />
        )}
        <span>Segunda-feira</span>
        <span className="text-xs text-zinc-400">
          {'('}
          Peito e Tríceps
          {')'}
        </span>
      </div>
      {isopen && (
        <ul className="ml-2 flex flex-col gap-3">
          {PT.map(({ sigle, name, series, reps }) => (
            <li key={sigle} className="flex items-center gap-2">
              <CheckCircle
                size={20}
                color="#ec4899"
                weight={diasSelecionados.includes(sigle) ? 'fill' : 'bold'}
                onClick={() => toggleDia(sigle)}
              />
              <span className="text-sm text-zinc-400">
                {diasSelecionados.includes(sigle) ? 'Feito' : 'A fazer'}{' '}
                <span className="text-zinc-100">{name}</span> com{' '}
                <span className="text-zinc-100">
                  {series} <span className="text-zinc-400">de</span> {reps}{' '}
                </span>
                <span
                  className="cursor-pointer text-[11px] text-zinc-600 underline"
                  onClick={() => handlerExpanded(sigle)}
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
