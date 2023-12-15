import { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, FlatList } from 'react-native';
import camara from "../../../assets/camera.png"

const windowHeight = Dimensions.get('window').height;

const ModalMuro = ({ visible, onClose, data, addImageUri }) => {

  const [cameraGranted, setCameraGranted] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);


  const toggleSelection = (item) => {

    const imageURI = item.node.image.uri;

    if (selectedItems.includes(imageURI)) {
      setSelectedItems(selectedItems.filter((uri) => uri !== imageURI));
    } else {
      // Verificar si se han seleccionado menos de 5 elementos antes de agregar uno nuevo
      if (selectedItems.length < 5) {
        // addImageUri(imageURI)
        setSelectedItems([...selectedItems, imageURI]);
      } else {
        // Aquí puedes mostrar un mensaje o realizar alguna acción cuando se excede el límite de selección
        console.log('Se ha alcanzado el límite de selección (5 elementos).');
      }
    }
  };

  const confirmBtn = () => {
    addImageUri(selectedItems)
    onClose()
  }

  const renderItem = ({ item }) => {
    const isSelected = selectedItems.includes(item.node.image.uri);

    return (
      <TouchableOpacity
        style={{
          width: Dimensions.get("window").width / 3 - 8,
          height: 200,
          margin: 2,
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: isSelected ? 'lightblue' : 'white',
        }}
        onPress={() => {
          toggleSelection(item);
        }}
      >
        <Image
          source={{ uri: item.node.image.uri }}
          style={{ width: "95%", height: "95%", borderRadius: 10 }}
        />
        {isSelected && (
          <View
            style={{
              position: 'absolute',
              top: 5,
              right: 5,
              backgroundColor: 'green',
              width: 20,
              height: 20,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white' }}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: "8%", alignItems: "center" }}>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>X</Text>
          </TouchableOpacity>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            Agregar a Publicación
          </Text>
          {
            selectedItems.length != 0 ?
              <TouchableOpacity onPress={confirmBtn}><Text style={{ color: "#7CFC00", fontWeight: "bold", fontSize: 12, textDecorationLine: "underline" }}>Confirmar</Text></TouchableOpacity>
              :
              <Text></Text>
          }
        </View>
        <View style={styles.headerContent}>
          <View style={{ backgroundColor: "#5a5a5a", width: "60%", height: "80%", borderRadius: 10 }}>
            <TouchableOpacity
              onPress={handleCameraPermission}
              style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
              <Image
                source={camara}
                style={{ width: 40, height: 40, marginBottom: "4%" }}
              />
              <Text style={{ color: "white" }}>Cámara</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: "white" }}>Biblioteca</Text>
          {
            data !== null ?
              <FlatList
                data={data}
                numColumns={3}
                renderItem={renderItem}
              //keyExtractor={(item) => item.id.toString()}
              />
              :
              <Text style={{ color: "white" }}>
                Cargando Biblioteca...
              </Text>
          }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .94)', // Fondo oscuro semitransparente
  },
  modalContent: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 5,
  },
  headerContent: {
    height: windowHeight * 20 / 100,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default ModalMuro;