/**
 * just-another-todo-app
 * add-new-button.tsx
 * created: 06/09/2025
 * Fuad Mohd. Firoz
 *
 * @format
 */

import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

const ACTION_COLOR = "#1E90FF";

export default function AddNewButton(props: PressableProps) {
  return (
    <Pressable style={styles.container} {...props}>
      <Text style={styles.title}>+ Add</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: ACTION_COLOR,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  title: {
    fontWeight: "bold",
    color: ACTION_COLOR,
  },
});
