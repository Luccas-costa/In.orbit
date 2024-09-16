import { Plus } from 'lucide-react'

import logo from '@/assets/in-orbit-logo.svg'
import letsStart from '@/assets/rocket-launch-illustration.svg'

import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import Image from 'next/image'

export function EmptyGoals() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <Image src={logo} alt="in.orbit" />
      <Image src={letsStart} alt="in.orbit" />
      <p className="max-w-80 text-center leading-relaxed text-zinc-300">
        Você ainda não cadasatrou nenhuma meta, que tal cadastrar um agora
        mesmo?
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </div>
  )
}
