"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import axios from "axios"

export default function NewPage({ params }: { params: { id: string } }) {

  const { register, handleSubmit, setValue } = useForm()

  useEffect(() => {
    if(params.id) {
      axios.get(`/api/tasks/${params.id}`)
      .then((res) => {
        const { title, description } = res.data
        setValue("title", title)
        setValue("description", description)
      })
    }
  },[])

  const router = useRouter()

  const onSubmit = handleSubmit(async (data: any) => {
    if(params.id) {
      await axios.put(`/api/tasks/${params.id}`, data)
    }else {
      await axios.post("/api/tasks", data)
    }
    router.push("/")
    router.refresh()
  })

  return (
    <section className="h-[calc(100vh-80px)] flex items-center justify-center">
      <form onSubmit={onSubmit}>
        <h1 className="text-2xl font-bold mb-4">
          {params.id ? "Update" : "Create"} Task
        </h1>

        <label 
          htmlFor="title"
          className="block text-sm font-medium text-zinc-50 mb-2"
          > Write a title:</label>
        <input 
          type="text"
          placeholder="Write a title"
          id="title"
          className="px-3 py-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 text-black block mb-2"
          {...register("title")}
          />
        <label 
          htmlFor="description"
          className="block text-sm font-medium text-zinc-50 mb-2"
          > Write a description:</label>
        <textarea 
          id="description"
          className="px-3 py-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 text-black block w-full mb-4"
          placeholder="Write a description"
          {...register("description")}
          ></textarea>

        <div className="flex justify-between">
          <button className="bg-sky-500 text-white px-3 py-1 rounded-md"
            type="submit"
            >
            {params.id ? "Update" : "Create"}
          </button>

          <button
            type="button"
            className="bg-red-500 text-white px-3 py-1 rounded-md"
            onClick={async () => {
              await axios.delete(`/api/tasks/${params.id}`)
              router.push("/")
              router.refresh()
            }}
          >Delete
          </button>
        </div>

      </form>
    </section>
  )
}