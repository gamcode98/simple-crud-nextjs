"use client"

import { Task } from "@prisma/client"
import { useRouter } from "next/navigation"

interface Props {
  task: Task
}
export default function TaskCard({ task }: Props) {

  const router = useRouter()

  return (
    <div 
      onClick={() => router.push(`/tasks/edit/${task.id}`)}
      className="bg-gray-800 p-4 hover:bg-gray-700 hover:cursor-pointer">
      <h2 className="text-xl font-bold">{task.title}</h2>
      <p className="text-slate-400">{task.description}</p>
    </div>
  )
}