import { View, Text, StyleSheet } from "react-native";
import { Header } from "../muro/Header";


export function Contrato({ navigation }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#D2DCEB" }}>
      <View style={styles.container}>
        <Header children="Contrato" navigation={navigation} />
        <Text>
          Contrato
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D2DCEB",
    flex: 1,
    display: "flex",
  }
})