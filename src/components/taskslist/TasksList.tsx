import type { Task } from 'models'
interface TasksListProps {
  tasks: Task[] | null
  deleteTask: (value: string) => void
}

export default function TasksList({ tasks, deleteTask }: TasksListProps) {
  return (
    <>
      {tasks?.map(({ id, createdAt, title }) => (
        <div
          key={id}
          className="flex my-4 p-4 border border-gray-300 rounded"
          data-testid="item"
        >
          <div className="flex-1">
            <h2 className="text-xl font-bold">{title}</h2>

            <ul className="text-sm">
              <li>ID: {id}</li>
              <li>Created: {createdAt}</li>
            </ul>

            <button
              type="button"
              onClick={() => deleteTask(id!)}
              className="mt-2 hover:underline text-sm text-gray-400"
              data-testid="button"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
