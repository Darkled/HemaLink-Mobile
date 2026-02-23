import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import DonationsScreen from './screens/DonationsScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <DonationsScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
