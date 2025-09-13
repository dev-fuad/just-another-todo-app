/**
 * just-another-todo-app
 * list.tsx
 * created: 06/09/2025
 * Fuad Mohd. Firoz
 *
 * @format
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { getTodos, updateTodo } from "services/todos";
import { FormState, FormStateProps, TodoItem } from "types";
import AddNewButton from "./add-new-button";
import CancelButton from "./cancel-button";
import Footer from './footer';
import Item from "./item";

const ActionButton = ({ formState: [state, setState] }: FormStateProps) => {
  if (state === FormState.view) {
    const addNewTodo = () => {
      setState(FormState.add);
    }

    return <AddNewButton onPress={addNewTodo} />;
  }

  if (state === FormState.add) {
    const cancelAction = () => {
      setState(FormState.view);
    }

    return <CancelButton onPress={cancelAction} />;
  }
};

export default function List() {
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ['todos'], queryFn: getTodos });
  const formState = useState<FormState>(FormState.view);

  const updateTodoMutation = useMutation({
    mutationFn: (todo: TodoItem) => updateTodo(todo.id, todo.title, todo.completed),
    // Optimistic Update
    // Updating on cache as mutation and text to update is on different components
    onMutate: async (updatingTodo) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // Get the previous value
      const previousTodos = queryClient.getQueryData<{ data: TodoItem[] }>(['todos', updatingTodo.id]);

      // Optimistically update to the new value
      queryClient.setQueryData<{ data: TodoItem[] }>(['todos'], old => ({
        data: old?.data.map(todo =>
          todo.id === updatingTodo.id ? { ...todo, ...updatingTodo } : todo
        ) ?? [],
      }));

      // Return a context object with the updated value
      return { previousTodos };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const onItemPress = useCallback((index: number) => {
    updateTodoMutation.mutate({
      id: data?.data[index].id ?? '',
      title: data?.data[index].title ?? '',
      completed: !(data?.data[index].completed ?? false),
    });
  }, [data, updateTodoMutation]);

  return (
    <FlatList
      data={data?.data ?? []}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<ActionButton formState={formState} />}
      ListFooterComponent={<Footer formState={formState} />}
      renderItem={({ item, index }) => (
        <Item item={item} onPress={() => onItemPress(index)} />
      )}
    />
  );
}
