import { Text, View, StyleSheet, Dimensions, Image, Platform } from "react-native";
import Swiper from 'react-native-swiper';
import { ReactionBox } from "./ReactionBox";

const Height = Dimensions.get("screen").height
export function CardsMuro({ data }) {

  console.log(Height)
  return (
    <>
      {
        data.img[0] ?
          <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
              <Swiper
                loop={false}
                style={{ width: "100%" }}
              >
                {
                  data.img[0].map((img, index) => (
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
              <View style={styles.reactionBoxAbsolute}>
                <ReactionBox />
              </View>
              <View style={{ width: "90%", height: "30%" }}>
                <Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
                  {data.comentario}
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
                    {data.comentario}
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
  containerSupre:{
    width:"100%",
    height: Height * 30 / 100,
    alignItems:"center",
    justifyContent:"flex-end"
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactionBoxAbsolute: {
    position: 'absolute',
    top: -20,
    right: 20,
  },
  reactionBoxAbsoluteSinImg: {
    position: 'absolute',
    top: -30,
    right: 20,
  },
})