"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getStudents() {
  try {
    const students = await prisma.student.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return students;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
}

export async function createStudent(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const rollNumber = formData.get("rollNumber") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const gender = formData.get("gender") as string;
    const parentName = formData.get("parentName") as string;

    const student = await prisma.student.create({
      data: {
        name,
        rollNumber,
        email: email || undefined,
        phone: phone || undefined,
        gender: gender || undefined,
        parentName: parentName || undefined
      }
    });

    revalidatePath("/dashboard/students");
    return { success: true, student };
  } catch (error: any) {
    console.error("Error creating student:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteStudent(id: string) {
  try {
    await prisma.student.delete({
      where: { id }
    });
    revalidatePath("/dashboard/students");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
