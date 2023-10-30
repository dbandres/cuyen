import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";

export function ReactionBox() {



  const [isBoxOpen, setIsBoxOpen] = useState(false);

  const toggleBox = () => {
    setIsBoxOpen(!isBoxOpen);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleBox}>
        <Image
          source={require("../../../assets/R_Emoji.png")}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>
      {isBoxOpen && (
        <View style={styles.expandedBox}>
          {/* Contenido de la caja expandida */}
          <View style={{ display: "flex", alignItems: "center", flexDirection: "row", justifyContent:"space-between" }}>
            <TouchableOpacity>
              <Image
                source={ require("../../../assets/emoji1.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={ require("../../../assets/emoji2.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={ require("../../../assets/emoji3.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={ require("../../../assets/emoji4.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={ require("../../../assets/emoji5.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={ require("../../../assets/emoji6.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={ require("../../../assets/emoji7.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={ require("../../../assets/emoji8.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={ require("../../../assets/emoji9.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={ require("../../../assets/emoji10.png")}
              />
            </TouchableOpacity>
          </View>

        </View>
      )}
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reactionBox: {
    width: 50,
    height: 50,
    backgroundColor: 'blue', // Estilo de tu ReactionBox
  },
  expandedBox: {
    position: 'absolute',
    bottom: "120%",
    right: -10,
    width: Dimensions.get('window').width - 30, // Ancho de la pantalla
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white', // Estilo de la caja expandida
    borderRadius: 20
  },
})