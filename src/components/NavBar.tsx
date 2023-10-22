import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center py-4 ">
      <Link href="/">
        <h3 className="text-2xl font-bold">Next CRUD</h3>
      </Link>
      <ul>
        <li>
          <Link href="/new" className="bg-slate-500 px-4 py-2 rounded hover:text-slate-200">New</Link>
        </li>
      </ul>
    </nav>
  )
}