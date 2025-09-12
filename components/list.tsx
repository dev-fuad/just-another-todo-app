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
import { addTodo, getTodos, updateTodo } from "services/todos";
import { FormState, TodoItem } from "types";
import AddNewButton from "./add-new-button";
import CancelButton from "./cancel-button";
import InputField from "./input-field";
import Item from "./item";

const ActionButton = ({ formState: [state, setState] }: { formState: [FormState, React.Dispatch<React.SetStateAction<FormState>>] }) => {
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
  const [formState, setFormState] = useState<FormState>(FormState.view);

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: (todo: TodoItem) => updateTodo(todo.id, todo.title, todo.completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const onSubmitAction = useCallback((text: string) => {
    addTodoMutation.mutate(text);

    setFormState(FormState.view);
  }, [addTodoMutation]);

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
      ListHeaderComponent={<ActionButton formState={[formState, setFormState]} />}
      ListFooterComponent={
        formState === FormState.add ? <InputField submitAction={onSubmitAction} /> : null
      }
      renderItem={({ item, index }) => (
        <Item item={item} onPress={() => onItemPress(index)} />
      )}
    />
  );
}
