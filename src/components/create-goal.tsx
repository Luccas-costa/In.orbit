import { X } from 'lucide-react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from './ui/radio-group'
import { DataCreateType } from '@/types/dataCreate'

interface CreateGoalProps {
  dataCreate: DataCreateType
  handlerUpdateData: (key: string, value: string | number) => void
  handlerCreateGoal: () => void
}

export function CreateGoal({
  dataCreate,
  handlerUpdateData,
  handlerCreateGoal,
}: CreateGoalProps) {
  const handlerUpdateFrequency = (value: string) => {
    handlerUpdateData('frequency', parseInt(value, 10)) // Convertendo para número
  }

  return (
    <DialogContent>
      <div className="flex h-full flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>
        <form action="" className="flex flex-1 flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade</Label>
              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, meditar, etc..,"
                value={dataCreate.title || ''}
                onChange={(e) => handlerUpdateData('title', e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="frequency">Quantas vezes na semana?</Label>
              <RadioGroup>
                <RadioGroupItem
                  value="1"
                  onClick={() => handlerUpdateFrequency('1')}
                >
                  <RadioGroupIndicator />
                  <span className="text-sm font-medium leading-none text-zinc-300">
                    1x na semana
                  </span>
                  <span className="text-lg leading-none">🥱</span>
                </RadioGroupItem>

                <RadioGroupItem
                  value="2"
                  onClick={() => handlerUpdateFrequency('2')}
                >
                  <RadioGroupIndicator />
                  <span className="text-sm font-medium leading-none text-zinc-300">
                    2x na semana
                  </span>
                  <span className="text-lg leading-none">🙂</span>
                </RadioGroupItem>

                <RadioGroupItem
                  value="3"
                  onClick={() => handlerUpdateFrequency('3')}
                >
                  <RadioGroupIndicator />
                  <span className="text-sm font-medium leading-none text-zinc-300">
                    3x na semana
                  </span>
                  <span className="text-lg leading-none">😎</span>
                </RadioGroupItem>

                <RadioGroupItem
                  value="4"
                  onClick={() => handlerUpdateFrequency('4')} // Corrigido valor repetido
                >
                  <RadioGroupIndicator />
                  <span className="text-sm font-medium leading-none text-zinc-300">
                    4x na semana
                  </span>
                  <span className="text-lg leading-none">😜</span>
                </RadioGroupItem>

                <RadioGroupItem
                  value="5"
                  onClick={() => handlerUpdateFrequency('5')} // Corrigido valor repetido
                >
                  <RadioGroupIndicator />
                  <span className="text-sm font-medium leading-none text-zinc-300">
                    5x na semana
                  </span>
                  <span className="text-lg leading-none">🤨</span>
                </RadioGroupItem>

                <RadioGroupItem
                  value="6"
                  onClick={() => handlerUpdateFrequency('6')}
                >
                  <RadioGroupIndicator />
                  <span className="text-sm font-medium leading-none text-zinc-300">
                    6x na semana
                  </span>
                  <span className="text-lg leading-none">🤯</span>
                </RadioGroupItem>

                <RadioGroupItem
                  value="7"
                  onClick={() => handlerUpdateFrequency('7')}
                >
                  <RadioGroupIndicator />
                  <span className="text-sm font-medium leading-none text-zinc-300">
                    Todos dias da semana
                  </span>
                  <span className="text-lg leading-none">🔥</span>
                </RadioGroupItem>
              </RadioGroup>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button className="flex-1" variant="secondary">
                Fechar
              </Button>
            </DialogClose>
            <Button className="flex-1" onClick={handlerCreateGoal}>Salvar</Button>
            <div onClick={handlerCreateGoal}>tes</div>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}
