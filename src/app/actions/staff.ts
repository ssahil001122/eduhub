"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getStaff() {
  try {
    const staff = await prisma.teacher.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return staff;
  } catch (error) {
    console.error("Error fetching staff:", error);
    return [];
  }
}

export async function createStaff(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const employeeId = formData.get("employeeId") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const specialization = formData.get("specialization") as string;

    const staffMember = await prisma.teacher.create({
      data: {
        name,
        employeeId,
        email,
        phone: phone || undefined,
        specialization: specialization || undefined,
        designation: "Teacher"
      }
    });

    revalidatePath("/dashboard/staff");
    return { success: true, staffMember };
  } catch (error: any) {
    console.error("Error creating staff:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteStaff(id: string) {
  try {
    await prisma.teacher.delete({
      where: { id }
    });
    revalidatePath("/dashboard/staff");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
