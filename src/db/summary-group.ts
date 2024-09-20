import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { SearchGoals } from '@/lib/search-goal'
import { SearchCompleted } from '@/lib/search-completed'

dayjs.extend(weekOfYear)

export const SummaryGroup = async () => {
  // Pega a semana atual
  const currentWeek = dayjs().week()

  // Busca as metas
  const goals = await SearchGoals()

  // Busca as metas completadas
  const completions = await SearchCompleted()

  // Filtra as metas completadas nesta semana
  const completedThisWeek = completions.filter(
    (completion) => dayjs(completion.date).week() === currentWeek,
  )

  // Mapeia metas concluídas e combina com suas respectivas metas do array de goals
  const completedGoalsWithDates = completedThisWeek
    .map((completion) => {
      const goal = goals.find((g) => g.id === Number(completion.id)) // Converte completion.id para número
      if (goal) {
        return {
          id: goal.id,
          title: goal.title,
          date: completion.date, // Incluímos a data da conclusão
        }
      }
      return null
    })
    .filter(Boolean) // Remove valores nulos

  return completedGoalsWithDates
}
