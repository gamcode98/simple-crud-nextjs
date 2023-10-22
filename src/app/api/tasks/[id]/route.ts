import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

interface Params {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: Params) {
  const { id } = params
  const task = await prisma.task.findFirst({ where: { id: +id } })
  return NextResponse.json(task)
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = params
  const data = await request.json()
  const taskUpdated = await prisma.task.update({ where: { id: +id }, data })
  return NextResponse.json(taskUpdated)
}

export async function DELETE(request: Request, { params }: Params) {
  const { id } = params
  const task = await prisma.task.delete({ where: { id: +id } })
  return NextResponse.json(task)
}