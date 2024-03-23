import { createTaskList, updateTaskList } from "../tasklList.ts";
import { prismaMock } from "../singleton.ts";

test("should create new task list", async () => {
  const taskList = {
    id: 1,
    title: "Task List 1",
    content: "Content for Task List 1",
    Completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted_at: null,
  };

  prismaMock.tasklist.create.mockResolvedValue(taskList);

  await expect(createTaskList(taskList)).resolves.toEqual({
    id: 1,
    title: "Task List 1",
    content: "Content for Task List 1",
    Completed: false,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
    deleted_at: null,
  });
});

test("should update a task list", async () => {
  const taskList = {
    id: 1,
    title: "Updated Task List",
    content: "Updated content",
    Completed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted_at: null,
  };

  prismaMock.tasklist.update.mockResolvedValue(taskList);

  await expect(updateTaskList(taskList)).resolves.toEqual({
    id: 1,
    title: "Updated Task List",
    content: "Updated content",
    Completed: true,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
    deleted_at: null,
  });
});

test("should fail if task list update fails", async () => {
  const taskList = {
    id: 1,
    title: "Updated Task List",
    content: "Updated content",
    Completed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted_at: null,
  };

  prismaMock.tasklist.update.mockImplementation(() => {
    throw new Error("Failed to update task list");
  });

  await expect(updateTaskList(taskList)).rejects.toThrowError(
    "Failed to update task list"
  );
});
