import { StyleSheet, Text, View } from "react-native";
import { TodoItem } from "types";

// Define the type for the item prop
type ItemProps = {
  item: TodoItem;
};

const colors = ['#FF6347', '#4682B4', '#8A2BE2', '#2E8B57', '#D2691E', '#FF4500', '#1E90FF'];

let lastUsedColor: string | null = null;

// Generate a random color for the bullet that does not repeat the last used color
const getRandomColor = () => {
  let sampleSpace = colors.filter(color => color !== lastUsedColor);
  const randomIndex = Math.floor(Math.random() * sampleSpace.length);

  lastUsedColor = sampleSpace[randomIndex];
  lastUsedColor = sampleSpace[randomIndex];
  return lastUsedColor;
};

const Item = ({ item }: ItemProps) => {
  const color = getRandomColor();
  return (
    <View style={styles.item}>
      <View style={[styles.bullet, { borderColor: color }, item.completed && { backgroundColor: color }]} />
      <Text style={[styles.title, { color }, item.completed && { textDecorationLine: 'line-through' }]}>
        {item.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  title: {
    fontSize: 18,
  },
  bullet: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    marginRight: 8,
  },
});

export default Item;
