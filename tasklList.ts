import prisma from "./client.ts";

interface CreateTaskList {
  title: string;
  content?: string;
  completed?: boolean;
}

export async function createTaskList(tasklist: CreateTaskList) {
  return await prisma.tasklist.create({
    data: tasklist,
  });
}

interface UpdateTaskList {
  id: number;
  title?: string;
  content?: string;
  completed?: boolean;
}

export async function updateTaskList(taskList: UpdateTaskList) {
  const { id, ...data } = taskList;
  return await prisma.tasklist.update({
    where: { id },
    data,
  });
}
