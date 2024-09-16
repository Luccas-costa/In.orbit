import { CreateGoal } from '@/components/create-goal'
// import { EmptyGoals } from '@/components/empty-goals'
import { Summary } from '@/components/summary'
import { Dialog } from '@/components/ui/dialog'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Dialog>
        {/* <EmptyGoals /> */}
        <Summary />

        <CreateGoal />
      </Dialog>
    </div>
  )
}
