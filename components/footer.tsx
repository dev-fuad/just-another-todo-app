/**
 * just-another-todo-app
 * footer.tsx
 * created: 12/09/2025
 * Fuad Mohd. Firoz
 *
 * @format
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { addTodo } from "services/todos";
import { FormState, FormStateProps, TodoItem } from "types";
import InputField from "./input-field";
import Item from "./item";

export default function Footer({ formState: [state, setState] }: FormStateProps) {
  const queryClient = useQueryClient();

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    // Always refetch after error or success
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const onSubmitAction = useCallback((text: string) => {
    addTodoMutation.mutate(text);

    setState(FormState.view);
  }, [addTodoMutation, setState]);

  if (state === FormState.add) {
    return <InputField submitAction={onSubmitAction} />;
  }

  if (addTodoMutation.isPending) {
    return <Item style={styles.newItem} item={{ title: addTodoMutation.variables } as TodoItem} />;
  }

  return null;
}

const styles = StyleSheet.create({
  newItem: {
    opacity: 0.5,
  },
});
