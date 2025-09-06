/**
 * just-another-todo-app
 * cancel-button.tsx
 * created: 06/09/2025
 * Fuad Mohd. Firoz
 *
 * @format
 */

import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

const ACTION_COLOR = "#FF4500";

export default function CancelButton(props: PressableProps) {
  return (
    <Pressable style={styles.container} {...props}>
      <Text style={styles.title}>Cancel</Text>
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
