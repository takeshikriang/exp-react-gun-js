import { useCallback, useEffect, useState } from 'react'
import type { Task } from 'models'
import Gun from 'gun'

const data = Gun().get('tasks')

export default function useTask() {
  const [tasks, setTasks] = useState<Task[] | null>(null)
  const [trigger, setTrigger] = useState<number>(0)

  const deleteTask = useCallback((id: string) => {
    data.get(id).put(null!, () => setTrigger(prevState => prevState + 1))
  }, [])

  const createTask = useCallback(title => {
    const newTask: Task = {
      title,
      createdAt: new Date().toISOString()
    }

    // @ts-ignore
    data.set(newTask, () => setTrigger(prevState => prevState + 1))
  }, [])

  useEffect(() => {
    async function init() {
      const tasksArr: Task[] = []

      data.map().once((data, id) => {
        if (!data) return
        const { createdAt, title } = data as Task
        tasksArr.push({ id, createdAt, title } as Task)
      })

      await new Promise(resolve => setTimeout(resolve, 200))
      setTasks(tasksArr)
    }

    init()
  }, [trigger])

  return [tasks, createTask, deleteTask] as const
}
