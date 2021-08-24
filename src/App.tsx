import { useTask } from 'hooks'
import { TaskInput, TasksList } from 'components'

export default function App() {
  const [tasks, createTask, deleteTask] = useTask()

  return (
    <div className="container max-w-xl p-4">
      <TaskInput createTask={createTask} />
      <TasksList tasks={tasks} deleteTask={deleteTask} />
    </div>
  )
}
