import { getStaff } from "@/app/actions/staff"
import StaffClient from "./StaffClient"

export const metadata = {
  title: "Staff | Eduhub",
  description: "Manage staff in Eduhub",
}

export default async function StaffPage() {
  const staff = await getStaff()
  return <StaffClient initialStaff={staff} />
}
