import { Modal, Text, TouchableOpacity, View } from "react-native"
import { ButtonCustom } from "../../../components/ButtomCustom"




export function ModalAlert({ visible, onClose, texto, error }) {


  const transparent = "rgba(0,0,0,0.5)"
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: transparent }}>
        <View style={{ borderRadius: 10, width: error === true ? 200 : 373, height: "auto", backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: error === true ? 180 : 275, height: "auto", alignItems: "center", justifyContent: "center" }}>
            <View style={{width: error === true ? 180 : 331, margin:20}}>
              <Text style={{textAlign:"center", fontSize:16, fontWeight:"500", lineHeight:19}}>
                {texto}
              </Text>
            </View>
            <View style={{ height: 47, width: error === true ? 180 : 331, borderRadius: 10, marginBottom: 5 }}>
              <ButtonCustom
                text="Confirmar"
                color= "#FF3D00"
                register={false}
                onPress={onClose}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}