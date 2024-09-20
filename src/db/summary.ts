import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { SearchGoals } from '@/lib/search-goal'
import { SearchCompleted } from '@/lib/search-completed'

dayjs.extend(weekOfYear)

export const Summary = async () => {
  // Pega a semana atual
  const currentWeek = dayjs().week()

  // Busca as metas
  const goals = await SearchGoals()
  console.log('Todas as metas:', goals)

  // Busca as metas completadas
  const completions = await SearchCompleted()
  console.log('Todas as metas concluídas:', completions)

  // Filtra as metas completadas nesta semana
  const completedThisWeek = completions.filter(
    (completion) => dayjs(completion.date).week() === currentWeek,
  )
  console.log('Metas concluídas nesta semana:', completedThisWeek)

  // Cria um map para contar quantas vezes cada meta foi completada nesta semana
  const completionsCountMap = completedThisWeek.reduce(
    (acc, completion) => {
      acc[completion.id] = (acc[completion.id] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )
  console.log('Contagem de completions por meta:', completionsCountMap)

  // Filtra as metas que foram batidas com base na frequência
  const completedGoals = goals.filter((goal) => {
    const completionsCount = completionsCountMap[goal.id] || 0

    // Log para verificar se a comparação está correta
    console.log(
      `Meta: ${goal.title}, Completions: ${completionsCount}, Frequency: ${goal.frequency}`,
    )

    // Comparando usando >= e garantindo que frequency é um número
    return completionsCount >= Number(goal.frequency)
  })

  console.log('Metas batidas:', completedGoals)

  // Exibir ou retornar a lista de metas batidas
  if (completedGoals.length > 0) {
    return completedGoals.map((goal) => ({
      id: goal.id,
      title: goal.title,
    }))
  } else {
    console.log('Nenhuma meta foi batida esta semana.')
    return []
  }
}
