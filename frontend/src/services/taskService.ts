import api from "@/lib/api";
import {  Task } from "@/types/task";

export async function getTasks(organizationId: number) {

  const response = await api.get<Task[]>(`/organizations/${organizationId}/tasks/`);

  return response.data;
}

export async function createTask(organizationId: number,
  data: {
    title: string;
    description?: string;
    status?: "todo" | "in_progress" | "done";
    assigned_to?: number | null;
  }
) {

  const response = await api.post<Task>(`/organizations/${organizationId}/tasks/`, data);

  return response.data;
}


export async function getTaskDetails(  organizationId: number,  taskId: number) {

  const response = await api.get<Task>(`/organizations/${organizationId}/tasks/${taskId}/`);
    

  return response.data;
}

export async function updateTask(organizationId: number, taskId: number,
  data: {
    title?: string;
    description?: string;
    status?: "todo" | "in_progress" | "done";
    assigned_to?: number | null;
  }
) {

  const response = await api.patch<Task>(`/organizations/${organizationId}/tasks/${taskId}/`, data);

  return response.data;
}

export async function deleteTask(organizationId: number, taskId: number) {

  await api.delete(`/organizations/${organizationId}/tasks/${taskId}/`);
}