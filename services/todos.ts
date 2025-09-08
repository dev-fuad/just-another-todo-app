import { TodoList } from "types";

export const BASE_URL = process.env.BASE_URL || ''

export function getTodos(): Promise<{ data: TodoList }> {
  return fetch(`${BASE_URL}/todos`).then(res => res.json()).then(data => ({
    data: data.data.map((item: any) => ({
      id: item.id.toString(),
      title: item.task || '',
      completed: item.is_complete || false,
    })),
  }));
}

export function addTodo(task: string): Promise<{ data: TodoList[0] }> {
  return fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task }),
  }).then(res => res.json()).then(data => ({
    data: {
      id: data.data.id.toString(),
      title: data.data.task || '',
      completed: data.data.is_complete || false,
    },
  }));
}

export function updateTodo(id: string, task: string, is_complete: boolean): Promise<{ data: TodoList[0] }> {
  return fetch(`${BASE_URL}/todos`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: Number(id), task, is_complete }),
  }).then(res => res.json()).then(data => ({
    data: {
      id: data.data.id.toString(),
      title: data.data.task || '',
      completed: data.data.is_complete || false,
    },
  }));
}
