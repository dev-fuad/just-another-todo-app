import Item from "components/item";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TodoList } from "types";

const TODO_LIST: TodoList = [
  { id: "1", title: "Buy groceries", completed: true },
  { id: "2", title: "Walk the dog", completed: false },
  { id: "3", title: "Read a book", completed: false },
  { id: "4", title: "Write some code", completed: false },
];

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>

        <Text style={styles.sectionHeader}>
          TODO List
        </Text>
        <FlatList
          data={TODO_LIST}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item item={item} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  sectionHeader: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
});
