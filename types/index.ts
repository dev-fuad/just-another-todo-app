export type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
};

export type TodoList = TodoItem[];

export enum FormState { view, add, edit, saving }

export type FormStateProps = {
  formState: [FormState, React.Dispatch<React.SetStateAction<FormState>>],
};
