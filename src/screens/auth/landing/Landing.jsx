import { useContext, useRef } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity, findNodeHandle } from "react-native";
import { UserContext } from "../../../context/UserContext";
import { FormContact } from "../intoScreen/FormContact";
import { Footer } from "../intoScreen/Footer";
import { HeaderLanding } from "./HeaderLanding";
import { PromosVigentes } from "../intoScreen/PromosVigentes";

const Width = Dimensions.get("screen").width
const Height = Dimensions.get("window").height

export function Landing({navigation}) {

  const { userdata } = useContext(UserContext)


  const contactoRef = useRef();
  const scrollViewRef = useRef();

  const scrollToContacto = () => {
    if (contactoRef.current) {
      setTimeout(() => {
        contactoRef.current.measureLayout(
          findNodeHandle(scrollViewRef.current),
          (x, y) => {
            scrollViewRef.current.scrollTo({ y, animated: true });
          }
        );
      }, 100);
    }
  }
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.constainer}>
      <ScrollView ref={scrollViewRef}>
        <HeaderLanding openDrawer={openDrawer} scrollToContacto={scrollToContacto}/>
        <View style={{ alignItems: "center", }}>
          <View style={{ width: "82%", justifyContent: "flex-start", display: "flex", flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14, marginRight: 4, color: "#564C71" }}>Promos</Text>
            <Text style={{ fontSize: 14, color: "#564C71" }}>vigentes</Text>
          </View>
        </View>
        <View style={{ height: Height * 0.52 }}>
          <PromosVigentes/>
        </View>
        <View style={{ alignItems: "center", paddingTop: 10 }}>
          <View style={{ width: "82%", justifyContent: "flex-start", display: "flex", flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14, marginRight: 4, color: "#564C71" }}>Info</Text>
            <Text style={{ fontSize: 14, color: "#564C71" }}>importante</Text>
          </View>
        </View>
        <View style={{ height: Height * 0.45 }}>
          <ScrollView
            horizontal={true}
            style>
            <View style={{ height: 286, width: 320, backgroundColor: "white", margin: 14, borderRadius: 10 }}>
              <View style={{ height: "30%", justifyContent: "center", margin: "5%" }}>
                <Text style={{ fontSize: 20, fontWeight: "400", lineHeight: 24, color:"#564C71" }}>Titulo de Informacion Importante</Text>
              </View>
              <View style={{ height: "45%", justifyContent: "center", borderTopColor: "#162962", borderTopWidth: 3 }}>
                <View style={{ margin: "5%" }}>
                  <Text style={{ fontSize: 15, fontWeight: "400", lineHeight: 24, color:"#564C71" }}>Monitoreando y controlando cada situación del viaje, cada traslado, cada comida, cada inquietud, cada movimiento, cada consulta, todo.</Text>
                </View>
              </View>
            </View>
            <View style={{ height: 286, width: 320, backgroundColor: "white", margin: 14, borderRadius: 10 }}>
              <View style={{ height: "30%", justifyContent: "center", margin: "5%" }}>
                <Text style={{ fontSize: 20, fontWeight: "400", lineHeight: 24, color:"#564C71" }}>Titulo de Informacion Importante</Text>
              </View>
              <View style={{ height: "45%", justifyContent: "center", borderTopColor: "#162962", borderTopWidth: 3 }}>
                <View style={{ margin: "5%" }}>
                  <Text style={{ fontSize: 15, fontWeight: "400", lineHeight: 24, color:"#564C71" }}>Monitoreando y controlando cada situación del viaje, cada traslado, cada comida, cada inquietud, cada movimiento, cada consulta, todo.</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <FormContact ref={contactoRef}/>
        <View style={{height:500}}>
          <Footer />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: "#CDD1DF",
  },
})