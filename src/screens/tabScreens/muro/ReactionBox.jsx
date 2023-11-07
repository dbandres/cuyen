import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";

export function ReactionBox({ emojis, sortEmoji }) {

  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const toggleBox = () => {
    setIsBoxOpen(!isBoxOpen);
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
    toggleBox()
  };

  console.log("top 3: ", sortEmoji);

  return (
    <View>
      <View style={{ justifyContent: "center", alignItems: "center", display:"flex", flexDirection:"row" }}>
        {sortEmoji !== undefined ?
          sortEmoji.map(emoji => (
            <TouchableOpacity key={emoji?.id} onPress={toggleBox} style={styles.reactionBoxAbsolute}>
              <Image
                source={{ uri: emoji?.url }}
                style={{ width: 35, height: 35 }}
              />
            </TouchableOpacity>
          ))
          :
          <View style={{ justifyContent: "center", alignItems: "center", }}>
            <TouchableOpacity onPress={toggleBox} style={styles.reactionBoxAbsolute}>
              <Image
                source={require("../../../assets/R_Emoji.png")}
                style={{ width: 45, height: 45 }}
              />
            </TouchableOpacity>
          </View>
        }
      </View>
      {isBoxOpen && (
        <View style={styles.expandedBox}>
          {/* Contenido de la caja expandida */}
          <View style={{ display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
            {
              emojis ?
                emojis.map(emoji => (
                  <TouchableOpacity onPress={() => handleEmojiClick(emoji)}>
                    <Image
                      source={{ uri: emoji.url }}
                      style={{ width: 32, height: 30 }}
                    />
                  </TouchableOpacity>
                ))
                :
                <Text>Cargando Emojis</Text>
            }
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
    position: "absolute",
    bottom:55,
    right:0,
    width: Dimensions.get('window').width - 45, // Ancho de la pantalla
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white', // Estilo de la caja expandida
    borderRadius: 20,
    shadowColor: "#000", // Color de la sombra
    shadowOffset: {
      width: 0,
      height: 4, // Altura del desenfoque
    },
    shadowOpacity: 0.25, // Opacidad de la sombra
    shadowRadius: 4, // Radio del desenfoque
    elevation: 5, // Para Android
  },
  reactionBoxAbsolute: {
    display:"flex",
    flexDirection:"row",
    borderRadius: 50,
    backgroundColor: "white",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000", // Color de la sombra
    shadowOffset: {
      width: 0,
      height: 4, // Altura del desenfoque
    },
    shadowOpacity: 0.25, // Opacidad de la sombra
    shadowRadius: 4, // Radio del desenfoque
    elevation: 5, // Para Android
  },
})