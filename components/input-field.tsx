/**
 * just-another-todo-app
 * input-field.tsx
 * created: 06/09/2025
 * Fuad Mohd. Firoz
 *
 * @format
 */

import { memo, useCallback, useRef } from "react";
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

export type InputFieldProps = TextInputProps & {
  submitAction?: (text: string) => void;
};

function InputField({ submitAction, ...props }: InputFieldProps) {
  const inputValue = useRef<string>("");

  const handleTextChange = useCallback((text: string) => {
    inputValue.current = text;
    props.onChangeText?.(text);
  }, [props]);

  return (
    <View style={styles.container}>
      <TextInput
        autoFocus
        style={styles.input}
        placeholder="Add a new todo"
        onSubmitEditing={({ nativeEvent }) => submitAction?.(nativeEvent.text)}
        {...props}
        onChangeText={handleTextChange}
      />
      {!!submitAction && (
        <Pressable onPress={() => submitAction?.(inputValue.current)}>
          <Text>➤</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",

    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default memo(InputField);
