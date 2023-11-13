import { Text, View, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, findNodeHandle } from "react-native";
import {HeaderSection} from "./HeaderSection"
import { FormContact } from "./FormContact";
import { useRef } from "react";
import { ButtomTabs } from "./ButtomTabs";
import { Footer } from "./Footer";
import { PromosVigentes } from "./PromosVigentes";
import { InfoImportante } from "./InfoImportante";


const Width = Dimensions.get("screen").width
const Height = Dimensions.get("window").height

export function Intro({navigation}) {

  const contactoRef = useRef();
  const scrollViewRef = useRef();

  const scrollToContacto = () => {
    if (contactoRef.current) {
      contactoRef.current.measureLayout(
        findNodeHandle(scrollViewRef.current),
        (x, y) => {
          scrollViewRef.current.scrollTo({ y, animated: true });
        }
      );
    }
  }

  return (
    <View style={styles.constainer}>
      <ScrollView ref={scrollViewRef}>
        <HeaderSection scrollToContacto={scrollToContacto}/>
        <View style={{ alignItems: "center" }}>
          <View style={{ width: "82%", justifyContent: "flex-start", display: "flex", flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14, marginRight: 4, color: "#564C71" }}>Promos</Text>
            <Text style={{ fontSize: 14, color: "#564C71" }}>vigentes</Text>
          </View>
        </View>
        <View style={{ height: Height * 0.52, justifyContent:"center", alignItems:"center" }}>
          <PromosVigentes/>
        </View>
        <View style={{ alignItems: "center", paddingTop: 10 }}>
          <View style={{ width: "82%", justifyContent: "flex-start", display: "flex", flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14, marginRight: 4, color: "#564C71" }}>Info</Text>
            <Text style={{ fontSize: 14, color: "#564C71" }}>importante</Text>
          </View>
        </View>
        <View style={{ height: Height * 0.45 }}>
          <InfoImportante/>
        </View>
        <FormContact ref={contactoRef}/>
        <Footer/>
      </ScrollView>
      <ButtomTabs navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: "#CDD1DF",
    justifyContent:"center",
    alignItems:"center"
  },
})