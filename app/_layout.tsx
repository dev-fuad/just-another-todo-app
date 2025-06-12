import { Slot } from 'expo-router';
import { Text } from 'react-native';

export default function Layout() {
  return (
    <>
      <Slot />
      <Text style={{ textAlign: 'center', padding: 20 }}>
        Created by Fuad
      </Text>
    </>
  );
}
