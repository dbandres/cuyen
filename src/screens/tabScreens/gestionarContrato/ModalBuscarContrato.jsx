import { useForm } from "react-hook-form";
import { Image, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CustomInput } from "../../auth/registerScreen/CustomInput";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllColegios } from "../../../redux/actions";
import axios from "axios";
import { token } from "../../../api";
import { ModalAlert } from "../../auth/registerScreen/ModalAlert"
import { UserContext } from "../../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function ModalBuscarContrato({ visible, onClose, setNewFetch, contratoInfo }) {

  const { control, setValue, watch, trigger } = useForm()
  const allColegios = useSelector((state) => state.allColegios)
  const { userdata, setUserData } = useContext(UserContext)
  const dispatch = useDispatch()

  let contrato = watch("contrato")

  const [inputValue, setInputValue] = useState('');
  const [colegioSeleccionado, setColegioSeleccionado] = useState("");
  const [errorInput, setErrorInput] = useState('');
  const [match, setMatch] = useState(false)
  const [contratos, setContratos] = useState(userdata.contrato)

  const [colegiosFiltrados, setColegiosFiltrados] = useState("")
  const [texto, setTexto] = useState("")
  const [showAlert1, setShowAlert1] = useState(false)
  const [showAlert4, setShowAlert4] = useState(false)
  const [error, setError] = useState(false)

  const [totalColegios, setTotalColegios] = useState(null)

  useEffect(() => {
    dispatch(getAllColegios())
    const colegiosFiltrados = contratoInfo
      .filter(info => info.colegio)
      .map(colegio => colegio.colegio);

    setTotalColegios(allColegios.filter(nombre => !colegiosFiltrados.includes(nombre.nombre)))
  }, [contratoInfo])

  useEffect(() => {
    if (inputValue !== "") {
      filterColegios()
    } else {
      filterColegios()
      setColegioSeleccionado("")
    }
  }, [inputValue])

  // Función para manejar el cambio en el valor del TextInput
  const handleInputChange = (text) => {
    setInputValue(text);
    setColegioSeleccionado("")
    if (text.trim() !== '') {
      setErrorInput(''); // Limpiar el mensaje de error cuando se ingrese texto
    }
  };

  // Filtrar el array de objetos basado en el término de búsqueda
  function filterColegios() {
    let filteredData = [];

    if (inputValue.trim() !== '') {
      filteredData = totalColegios.filter((item) =>
        item.nombre.toLowerCase().includes(inputValue.toLowerCase())
      ).slice(0, 5);
    }

    setColegiosFiltrados(filteredData);
  }

  const configAlertError = () => {
    setError(true)
  }

  // Funcion que captura el colegio seleccionado
  const handleColegioPress = (cole) => {
    setColegioSeleccionado(cole);
  };

  useEffect(() => {
    setMatch(false)
    if (contrato !== undefined && colegioSeleccionado && contrato.length === 4) {
      setTexto("")
      setShowAlert1(true)
      try {
        setShowAlert4(true)
        axios.post(`/colegios/verify/`,
          {
            contrato: contrato,
            colegio: colegioSeleccionado.nombre
          },
          {
            headers: {
              'x-access-token': `${token}`,
              "Content-Type": "application/json",
            }
          })
          .then((res) => {
            setShowAlert4(false)
            if (res.status === 202) {
              setMatch(true)
              setShowAlert1(false)
              setContratos(prevContratos => [...prevContratos, contrato])
            }

          })
          .catch((error) => {
            setShowAlert4(false)
            setTexto(error.response.data.mensaje)
            configAlertError()
            setValue("contrato", "")
            setInputValue("")
            setMatch(false)
          })
      } catch (error) {

      }
    }

  }, [contrato, colegioSeleccionado])

  const myFunction = () => {
    if (error === true) {
      setShowAlert1(false)
    } else {
      setShowAlert1(false)
      setNewFetch(true)
      setInputValue("")
      setTexto('')
      setColegioSeleccionado("")
      setValue("contrato", "")
      setMatch(false)
      setContratos(contratos)
      onClose()
    }
  }

  const cancelar = () => {
    onClose()
    setInputValue("")
    setColegioSeleccionado("")
    setValue("contrato", "")
    setMatch(false)
    setContratos(userdata.contrato)
  }

  const putContrato = async () => {
    setShowAlert1(true)
    setShowAlert4(true)
    const data = await AsyncStorage.getItem("userStorage")
    const parseado = JSON.parse(data)
    try {
      axios.put(`/usuarios/${userdata.id}`, {
        contrato: contratos
      },
        {
          headers: {
            'x-access-token': `${token}`,
            "Content-Type": "application/json",
          }
        })
        .then((res) => {
          if (res.status === 200) {
            setShowAlert4(false)
            console.log(res.data);
            setTexto('El contrato ha sido asignado correctamente')
            setNewFetch(true)
            parseado.usuario.contrato = contratos,
              AsyncStorage.setItem('userStorage', JSON.stringify(parseado))
            setUserData(prevUserData => ({
              ...prevUserData,
              contrato: contratos
            }));
          }

        })
        .catch((error) => {
          console.log(error);
        })
    } catch (error) {
      console.log("error :", error);
    }
  }

  const transparent = "rgba(0,0,0,0.5)"
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: transparent }}>
        <View style={{ borderRadius: 10, width: 373, height: 449, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 320, height: 57, alignItems: "center", justifyContent: "center" }}>
            <View style={{ height: 50 }}>
              <Text style={{ color: "#334EA2", fontWeight: "500", fontSize: 16, lineHeight: 19, textAlign: "center" }}>
                Buscar Contrato
              </Text>
            </View>
            {
              match === true ?
                <View style={{
                  width: "100%",
                  height: 70,

                }}>
                  <View style={{
                    width: "100%",
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: "#008000",
                    borderRadius: 10,
                    padding: 5,
                    height: 50,
                    marginBottom: 20
                  }}>
                    <Text>
                      {contrato}
                    </Text>
                  </View>
                </View>
                :
                <CustomInput
                  control={control}
                  placeholder="Numero de contrato"
                  name="contrato"
                  trigger={trigger}
                  numeric="numeric"
                  rules={{
                    required: true,
                  }}
                />
            }
            {
              match === true ?
                <View style={{
                  width: "100%",
                  height: 70,

                }}>
                  <View style={{
                    width: "100%",
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: "#008000",
                    borderRadius: 10,
                    padding: 5,
                    height: 50
                  }}>
                    <Text>
                      {colegioSeleccionado.nombre}
                    </Text>
                  </View>
                </View>
                :
                <View>
                  <View style={{
                    width: "100%",
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: match === true ? 2 : 1,
                    borderColor: match === true ? "#008000" : '#CDD1DF',
                    borderRadius: 10,
                    padding: 5,
                    height: 50
                  }}>
                    <TextInput
                      placeholder="Nombre de la Institución"
                      value={colegioSeleccionado ? colegioSeleccionado.nombre : inputValue} // Valor del TextInput
                      onChangeText={handleInputChange} // Se activa cuando el texto cambia
                      style={{
                        width: "100%",
                        paddingLeft: 10,
                        alignItems: "center",
                        fontWeight: "600",
                        fontSize: 14,
                        lineHeight: 16,
                        backgroundColor: "white",
                        borderRadius: 8,
                        color: "#564C71",
                      }}
                      placeholderTextColor="#CDD1DF"
                    />
                  </View>
                  <View style={{ height: 25, justifyContent: "center", marginLeft: 20 }}>
                    {errorInput !== '' && inputValue === "" ?
                      <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Image
                          source={require("../../../assets/Error.png")}
                          style={{ width: 25, height: 25 }}
                        />
                        <Text style={{ color: "#FF6363", fontSize: 10, }}>{errorInput}</Text>
                      </View>
                      : null
                    }
                  </View>
                  {
                    colegiosFiltrados.length !== 0 && colegioSeleccionado === "" ?
                      <View style={{ position: 'absolute', top: 50, backgroundColor: 'white', width: '100%', height: colegiosFiltrados.length * 30, zIndex: 1, borderRadius: 10, borderColor: "#CDD1DF", borderWidth: 1 }}>
                        {
                          colegiosFiltrados.map((cole, index) => (
                            <TouchableOpacity key={index} onPress={() => handleColegioPress(cole)}>
                              <Text style={{ paddingVertical: 5, paddingHorizontal: 15, fontSize: 12 }}>{cole.nombre}</Text>
                            </TouchableOpacity>
                          ))
                        }
                      </View>
                      :
                      null
                  }
                </View>
            }
            <TouchableOpacity onPress={putContrato} /* disabled={match === false ? true : false} */ style={{ backgroundColor: match === true ? "#FF3D00" : "#CDD1DF", height: 47, width: 320, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 15 }}>
              <Text style={{ color: "white" }}>
                Aceptar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancelar} style={{ width: 320, height: 40, borderRadius: 10, borderWidth: 1, borderColor: "#334EA2", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
              <Text style={{ color: "#334EA2", fontWeight: "600", fontSize: 12, lineHeight: 14, textAlign: "center" }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ModalAlert visible={showAlert1} onClose={myFunction} texto={texto} error={error} loading={showAlert4} />
    </Modal>
  )
}