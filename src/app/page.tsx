import TaskCard from "@/components/TaskCard"
import { prisma } from "@/libs/prisma"

// async function loadTasks() {
//   const res = axios.get("http://localhost:3000/api/tasks")
//   console.log(res)
// }


async function loadTasks() {
  const tasks = await prisma.task.findMany()
  return tasks
}

export default async function HomePage() {
  const tasks = await loadTasks()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task}/>
      ))}
    </div>
  )
}
