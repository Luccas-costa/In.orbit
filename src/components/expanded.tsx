import React from 'react'
import { Separator } from './ui/separator'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'

interface ExpandedProps {
  name: string
  link: string
  serie: string
  reps: string
  handlerUnexpand: () => void
}

export default function Expanded({
  name,
  link,
  serie,
  reps,
  handlerUnexpand,
}: ExpandedProps) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex cursor-pointer items-center gap-1 text-2xl font-medium"
        onClick={handlerUnexpand}
      >
        <span className="mt-1">
          <ArrowLeft size={24} color="#ec4899" weight="bold" />
        </span>{' '}
        {name}
      </div>
      <div className="mx-auto h-[700px] w-[95%] overflow-hidden rounded-md bg-red-100">
        <iframe
          src={`https://www.youtube.com/embed/${link}/?mute=1&loop=1&playlist=${link}&playsinline=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          // controlsList="nodownload"
          title="YouTube Video"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </div>
      <div>
        <div className="text-xl font-medium text-zinc-400">Repetições</div>
        <ul>
          <li>
            <div className="ml-2 flex h-full items-center gap-[5px] font-medium text-zinc-400">
              <div className="size-[6px] rounded-full bg-zinc-400"></div>
              Numero de series: <span className="text-[#ec4899]">{serie}</span>
            </div>
          </li>
          <li>
            <div className="ml-2 flex h-full items-center gap-[5px] font-medium text-zinc-400">
              <div className="size-[6px] rounded-full bg-zinc-400"></div>
              Numero de repetições:{' '}
              <span className="text-[#ec4899]">{reps}</span>
            </div>
          </li>
        </ul>
      </div>
      <Separator />
      <button className="mx-auto mt-2 w-[100%] rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 py-3 text-lg font-medium text-white">
        Marcar como completo
      </button>
    </div>
  )
}
