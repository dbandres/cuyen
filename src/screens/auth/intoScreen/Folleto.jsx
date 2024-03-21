import { View, ScrollView, Text, Image } from "react-native"
import { HeaderFolleto } from "./HeaderFolleto"
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";


export function Folleto({ navigation, route }) {

  // Obtén los datos de la ruta
  const { post } = route.params;
  const [uriImg, setUri] = useState([])


  const transformUriImag = (dataImage) => {
    const urls = JSON.parse(dataImage)
    setUri(urls)
  }

  useEffect(() => {
    if (post.folleto === "[]") {
      setUri([post.image])
    } else {
      transformUriImag(post.folleto)
    }
  }, [])

  console.log(post)

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView>
        <HeaderFolleto children="Folleto" navigation={navigation} />
        <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center", paddingBottom: 10 }}>
          {
            uriImg.length !== 0 ?
              uriImg.map((uri, index) => (
                <Image
                  key={index}
                  source={
                    {
                      uri: uri
                    }
                  }
                  style={{ width: 350, height: 500, objectFit: "contain" }}
                />
              ))
              :
              <View>
                <Text>
                  Cargando Folleto
                </Text>
              </View>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}