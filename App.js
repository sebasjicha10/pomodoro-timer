import { StyleSheet, View, Text } from 'react-native'
import Timer from './Timer'


const App = () => {
  return (
    <View style={styles.container}>
      <Timer />
      <Text style={styles.text}>by Sebastian Jimenez</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF0000",
    alignItems: 'center',
    paddingTop: 100,
  },
  text: {
    color: "white",
    fontSize: 10,
    paddingTop: 10
  }
 
});


export default App