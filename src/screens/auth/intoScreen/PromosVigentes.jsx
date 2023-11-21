import { useEffect} from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllInicioOrder } from "../../../redux/actions";

export function PromosVigentes({navigation}) {

  const dispatch = useDispatch()
  const allInicioOrder = useSelector((state) => state.allInicioOrder)

  useEffect(() => {
      dispatch(getAllInicioOrder())
  }, [])

  return (
    <>
      {
        allInicioOrder.length !== 0 ?
          <ScrollView
            horizontal={true}
            style>
            {
              allInicioOrder?.map((post, index) => (
                <View key={index} style={{ height: 350, width: 320, margin: 14, borderRadius: 10 }}>
                  <View>
                    <Image
                      source={{
                        uri: post.image
                      }}
                      style={{ width: "100%", height: "100%", borderRadius: 10 }}
                    />
                  </View>
                  <TouchableOpacity onPress={()=>{navigation.navigate("folleto-screen", {post})}} style={{ position: "absolute", left: "10%", bottom: "10%", backgroundColor: "#3462BF", width: "60%", height: "12%", alignItems: "center", justifyContent: "center", borderRadius: 20 }}>
                    <Text style={{ color: "white", fontWeight: "600", fontSize: 20 }}>Ver más</Text>
                  </TouchableOpacity>
                </View>
              ))
            }
          </ScrollView>
          :
          <View style={{ alignItems: "center" }}>
            <View style={{ width: "82%", justifyContent: "flex-start", display: "flex", flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", fontSize: 14, marginRight: 4, color: "#564C71" }}>Cargando</Text>
              <Text style={{ fontSize: 14, color: "#564C71" }}>promociones</Text>
            </View>
          </View>
      }
    </>
  )
}