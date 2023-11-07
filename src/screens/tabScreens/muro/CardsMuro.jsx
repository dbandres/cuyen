import { Text, View, StyleSheet, Dimensions, Image, Platform } from "react-native";
import Swiper from 'react-native-swiper';
import { ReactionBox } from "./ReactionBox";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmojis } from "../../../redux/actions";

const Height = Dimensions.get("screen").height
export function CardsMuro({ data }) {

  //console.log(data)
  const [uriImg, setUri] = useState("")
  const [emojiPubli, setEmojiPubli] = useState([])
  const dispatch = useDispatch()
  const allEmojis = useSelector((state) => state.allEmojis)

  const transformUriImag = (dataImage) => {
    const cadenaModificada = dataImage.slice(1, dataImage.length - 1).toString();
    const separarCadena = cadenaModificada.split(", ")
    setUri(separarCadena);
  }

  useEffect(() => {
    transformUriImag(data.image)
    if (allEmojis.length === 0) {
      dispatch(getAllEmojis())
    }
    setEmojiPubli(JSON.parse(data.emoji))
  }, [])

  // funcion para ordenar los emojis de mayor a menor y filtrar los 3 primeros
  function obtenerTresEmojisConMayorValor(arrayDeObjetosEmojis) {
    if (!Array.isArray(arrayDeObjetosEmojis) || arrayDeObjetosEmojis.length === 0) {
      return [];
    }
    // Ordena el array en función del valor (de mayor a menor)
    const emojisOrdenados = arrayDeObjetosEmojis.sort((a, b) => {
      const valorA = Object.values(a)[0];
      const valorB = Object.values(b)[0];
      return valorB - valorA;
    });

    // Filtra los emojis con los valores más altos (hasta 3)
    const emojisTop3 = emojisOrdenados.slice(0, 3);
    const emojisUrls = [];
    //buscamos la url de los tres primeros emojis
    emojisTop3.forEach(emojibusc => {
      const clave = Object.keys(emojibusc)[0];
      const emojiFinal = allEmojis.find(emoji => emoji.id === clave)

      emojisUrls.push(emojiFinal)
    })

    return emojisTop3, emojisUrls;
  }
  const emojisTop3 = obtenerTresEmojisConMayorValor(emojiPubli);
  console.log(uriImg.length)

  return (
    <>
      {
        uriImg?.length ?
          <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
              <Swiper
              >
                {
                  uriImg?.map((img, index) => (
                    <View key={index} style={styles.swiperSlide}>
                      <Image
                        source={{ uri: img }}
                        style={styles.image}
                        resizeMode="cover"
                      />
                    </View>
                  ))
                }
              </Swiper>
            </View>
            <View style={{ width: "100%", alignItems: "center" }}>
              <View style={{ width: "90%", height: "18%", justifyContent: "center", }}>
                <Text style={{ fontSize: 12, fontWeight: "bold", color: "#000000" }}>
                  35 Reacciones
                </Text>
              </View>
              <View style={{justifyContent:"center", alignItems:"center", display:"flex", flexDirection:"row",  position:"absolute", top:-25, right: 10}}>
                {
                  emojisTop3.length !== 0 ?
                      <View >
                        <ReactionBox emojis={allEmojis} sortEmoji={emojisTop3} />
                      </View>
                    :
                    <View >
                      <ReactionBox emojis={allEmojis} />
                    </View>
                }
              </View>
              <View style={{ width: "90%", height: "30%" }}>
                <Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
                  {data.texto}
                </Text>
              </View>
              <View style={{ width: "90%", alignItems: "flex-end", justifyContent: "center" }}>
                <Text style={{ color: "#949AAF" }}>
                  Fecha de publicacion
                </Text>
              </View>
            </View>
          </View>
          :
          <View style={styles.containerSupre}>
            <View style={styles.cardContainerSinImg}>
              <View style={{ width: "100%", alignItems: "center" }}>
                <View style={{ width: "90%", height: "38%", justifyContent: "center", }}>
                  <Text style={{ fontSize: 12, fontWeight: "bold", color: "#000000" }}>
                    35 Reacciones
                  </Text>
                </View>
                <View style={styles.reactionBoxAbsoluteSinImg}>
                  <ReactionBox />
                </View>
                <View style={{ width: "90%", height: "40%" }}>
                  <Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
                    {data.texto}
                  </Text>
                </View>
                <View style={{ width: "90%", alignItems: "flex-end", justifyContent: "center" }}>
                  <Text style={{ color: "#949AAF" }}>
                    Fecha de publicacion
                  </Text>
                </View>
              </View>
            </View>
          </View>

      }
    </>

  )
}

const styles = StyleSheet.create({
  cardContainer: {
    height: Height * 66 / 100,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
  },
  cardContainerSinImg: {
    height: Height * 20 / 100,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  containerSupre: {
    width: "100%",
    height: Height * 30 / 100,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  imageContainer: {
    height: '70%',
    width: '100%',
  },
  swiperSlide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactionBoxAbsoluteSinImg: {
    position: 'absolute',
    top: -30,
    right: 20,
  },
})