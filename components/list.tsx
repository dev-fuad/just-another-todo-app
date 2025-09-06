/**
 * just-another-todo-app
 * list.tsx
 * created: 06/09/2025
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React, { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { FormState, TodoList } from "types";
import AddNewButton from "./add-new-button";
import CancelButton from "./cancel-button";
import InputField from "./input-field";
import Item from "./item";

const TODO_LIST: TodoList = [
  { id: "1", title: "Buy groceries", completed: true },
  { id: "2", title: "Walk the dog", completed: false },
  { id: "3", title: "Read a book", completed: false },
  { id: "4", title: "Write some code", completed: false },
];

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
  const [formState, setFormState] = useState<FormState>(FormState.view);
  const [list, setList] = useState<TodoList>(TODO_LIST);

  const onSubmitAction = useCallback((text: string) => {
    setList((curr) => [...curr, { id: (curr.length + 1).toString(), title: text, completed: false }]);

    setFormState(FormState.view);
  }, []);

  const onItemPress = useCallback((index: number) => {
    setList((curr) => {
      curr[index].completed = !curr[index].completed;
      return [...curr];
    });
  }, []);

  return (
    <FlatList
      data={list}
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
