export type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
};

export type TodoList = TodoItem[];

export enum FormState { view, add, edit, saving }
