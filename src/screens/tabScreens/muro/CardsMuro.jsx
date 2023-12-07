import { Text, View, StyleSheet, Dimensions, Image, Platform } from "react-native";
import Swiper from 'react-native-swiper';
import { ReactionBox } from "./ReactionBox";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmojis } from "../../../redux/actions";
import axios from "axios";
import { API_URL, token } from "../../../api";

const Height = Dimensions.get("screen").height

export function CardsMuro({ data, controlDispatch }) {

  // console.log(JSON.stringify(data))
  const [emojiPubli, setEmojiPubli] = useState([])
  const [totalReacciones, setTotalReacciones] = useState("")
  const dispatch = useDispatch()
  const allEmojis = useSelector((state) => state.allEmojis)


  useEffect(() => {
    calcularTotalEmojisPorPost(data.emoji)
    if (allEmojis.length === 0) {
      dispatch(getAllEmojis())
    }
    setEmojiPubli(JSON.parse(data.emoji))
  }, [data])

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

  // funcion para sumar las reacciones totales por post
  function calcularTotalEmojisPorPost(objJON) {
    // Parsea el valor "emoji" a un array de objetos
    const emojis = JSON.parse(objJON)
    // Inicializa una variable para el total
    let totalEmojis = 0;

    // Itera a través de los objetos y suma los valores
    if (emojis !== null) {
      emojis.forEach(emoji => {
        for (const key in emoji) {
          if (emoji.hasOwnProperty(key)) {
            totalEmojis += emoji[key];
          }
        }
      });
    } else {
      console.log("es null", emojis)
    }
    setTotalReacciones(totalEmojis)
  }

  // funcion para capturar el emoji reaccionado
  function handleEmoji(emoji) {
    if (emoji) {
      axios.put(`${API_URL}/reaccion/${data.id}`,
        {
          "emoji": `${emoji.id}`
        },
        {
          headers: {
            'x-access-token': `${token}`,
            "Content-Type": "application/json",
          }
        }
      )
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            controlDispatch()
          }
        })
    }
  }

  console.log(data.image);

  return (
    <>
      {
        data.image !== null ?
          <View style={styles.container}>
            <View style={styles.cardContainer}>
              <View style={styles.imageContainer}>
                <Swiper
                >
                  {
                    data.image?.map((img, index) => (
                      <View key={index} style={styles.swiperSlide}>
                        <Image
                          source={{ uri: img }}
                          style={{
                            width: "100%",
                            height: 400,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20
                          }}
                          resizeMode="cover"
                        />
                      </View>
                    ))
                  }
                </Swiper>
              </View>
              <View style={{ width: "100%", alignItems: "center", height: "30%" }}>
                <View style={{ width: "90%", alignItems: "flex-start", justifyContent: "center", height: "20%" }}>
                  <Text style={{ color: "#949AAF", fontSize: 12, fontWeight: "400", lineHeight: 14 }}>
                    Fecha de publicacion
                  </Text>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "row", position: "absolute", bottom: -20, right: 10 }}>
                  {
                    emojisTop3.length !== 0 ?
                      <View >
                        <ReactionBox emojis={allEmojis} sortEmoji={emojisTop3} handleEmoji={handleEmoji} />
                      </View>
                      :
                      <View >
                        <ReactionBox emojis={allEmojis} handleEmoji={handleEmoji} />
                      </View>
                  }
                </View>
                <View style={{ width: "90%", height: "60%" }}>
                  <Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
                    {data.texto}
                  </Text>
                </View>
                <View style={{ width: "90%", height: "13%", justifyContent: "center" }}>
                  <Text style={{ fontSize: 12, fontWeight: "bold", color: "#000000" }}>
                    {totalReacciones} Reacciones
                  </Text>
                </View>
              </View>
            </View>
          </View>
          :
          <View style={styles.containerSupre}>
            <View style={styles.cardContainerSinImg}>
              <View style={{ width: "100%", alignItems: "center" }}>
                <View style={{ width: "90%", alignItems: "flex-start", justifyContent: "center", height: "25%" }}>
                  <Text style={{ color: "#949AAF", fontSize: 12, fontWeight: "400", lineHeight: 14 }}>
                    Fecha de publicacion
                  </Text>
                </View>
                <View style={{ width: "90%", height: "50%", }}>
                  <Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
                    {data.texto}
                  </Text>
                </View>
                <View style={{ width: "90%", height: "20%", justifyContent: "center", }}>
                  <Text style={{ fontSize: 12, fontWeight: "bold", color: "#000000" }}>
                    {totalReacciones} Reacciones
                  </Text>
                </View>
                <View style={styles.reactionBoxAbsoluteSinImg}>
                  {
                    emojisTop3.length !== 0 ?
                      <View >
                        <ReactionBox emojis={allEmojis} sortEmoji={emojisTop3} handleEmoji={handleEmoji} />
                      </View>
                      :
                      <View >
                        <ReactionBox emojis={allEmojis} handleEmoji={handleEmoji} />
                      </View>
                  }
                </View>
              </View>
            </View>
          </View>

      }

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: Height * 69 / 100,
    width: 380,
  },
  cardContainer: {
    height: Height * 66 / 100,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
  },
  cardContainerSinImg: {
    height: Height * 20 / 100,
    width: 370,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  containerSupre: {
    width: 380,
    height: Height * 22 / 100,
    alignItems: "center",
    justifyContent: "flex-start",
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
    height:"100%",
  },
  reactionBoxAbsoluteSinImg: {
    position: 'absolute',
    bottom: -20,
    right: 10,
  },
})