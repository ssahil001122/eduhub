import { getStudents } from "@/app/actions/students"
import StudentsClient from "./StudentsClient"

export const metadata = {
  title: "Students | Eduhub",
  description: "Manage students in Eduhub",
}

export default async function StudentsPage() {
  const students = await getStudents()
  return <StudentsClient initialStudents={students} />
}
