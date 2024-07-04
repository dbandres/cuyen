import { Text, TouchableOpacity, View, Animated, Image, Linking, Alert } from "react-native";
import { CustomInput } from "../../auth/registerScreen/CustomInput";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useRef, useState } from "react";
import CheckBox from "@react-native-community/checkbox";
import { ButtonCustom } from "../../../components/ButtomCustom";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import AwesomeAlert from "react-native-awesome-alerts";
import { token } from "../../../api";
import DatePicker from 'react-native-date-picker'
import { ModalComponent } from "./ModalComponent";
import { Dropdown, DropdownFDP } from "./DropdownFDP";
import { DropdownCuotas } from "./DropdownCuotas";
import ImporteText from "./ImporteText";
import { useSelector } from "react-redux";


export function Form({ agregarPasajero, setNewFetch, }) {

  const { control, handleSubmit, setValue, watch, trigger } = useForm()
  const { userdata } = useContext(UserContext)

  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [toggleCheckBoxIPC, setToggleCheckBoxIPC] = useState(true)
  const [toggleCheckBoxDolares, setToggleCheckBoxDolares] = useState(true)
  const [inputChanged, setInputChanged] = useState(false)

  const [showAlert2, setShowAlert2] = useState(false)
  const [dataPasajero, setDataPasajero] = useState("")

  let dni = watch('userdni'); // Observa el campo del DNI

  // estados para el primer dropdown
  const [heightAnim] = useState(new Animated.Value(50)); // Inicia con la altura mínima
  const contentRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // estados para el segundo dropdown
  const [heightAnim1] = useState(new Animated.Value(50)); // Inicia con la altura mínima
  const contentRef1 = useRef(null);
  const [isExpanded1, setIsExpanded1] = useState(false);

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [newDate, setNewDate] = useState("")

  //importe 
  const [importe, setImporte] = useState('')
  const [cuotaSeleccionada, setCuotaSeleccionada] = useState(null);
  const [FDPSeleccionado, setFDPSeleccionado] = useState('')
  const [FDPResponse, setFPDResponse] = useState('')

  //cuotas response
  const [cuotasResponse, setCuotasResponse] = useState('')

  //importe response
  const [importeResponse, setImporteResponse] = useState('')

  // render condicional para un statu 200 en verify
  const [showDropDowns, setShowDropDowns] = useState(true)

  const fechaMin = new Date(2000, 0, 1)

  const [modalVisible, setModalVisible] = useState(false);
  const [datosTotales, setDatosTotales] = useState({})

  const contratoActual = useSelector((state) => state.currentContrato)

  const abrirLink = (linkUrl) => {
    const url = linkUrl;
    Linking.openURL(url)
      .catch((err) => console.error('Error al abrir el enlace:', err));
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  const getAlert = () => {
    return (
      <AwesomeAlert
        show={showAlert2}
        showProgress={true}
        progressColor="black"
        progressSize={50}
      />
    )
  }


  useEffect(() => {
    setValue('FDP', FDPSeleccionado.valor);
    setValue('cuota', cuotaSeleccionada)
    setValue('fechaNac', newDate)
    setValue('importe', importe)
    setValue('valor_cuo_fija', dataPasajero.valor_cuo_fija)
  }, [FDPSeleccionado, newDate, cuotaSeleccionada, importe])

  useEffect(() => {
    if (FDPSeleccionado.valor === 'ipc') {
      setToggleCheckBoxIPC(false)
      setToggleCheckBoxDolares(true)
    }
    else if (FDPSeleccionado.valor === 'dolares') {
      setToggleCheckBoxDolares(false)
      setToggleCheckBoxIPC(true)
    }
    else if (FDPSeleccionado.valor === 'contado') {
      setToggleCheckBoxDolares(true)
      setToggleCheckBoxIPC(true)
    }
    else if (FDPSeleccionado.valor === 'sin_int') {
      setToggleCheckBoxDolares(true)
      setToggleCheckBoxIPC(true)
    }
    else {
      setToggleCheckBoxDolares(true)
      setToggleCheckBoxIPC(true)
    }
  }, [FDPSeleccionado])

  const handleSubmitcarga = (data) => {
    setDatosTotales(data)
    openModal();
  }



  useEffect(() => {
    if (dni !== undefined && dni.length === 8) {
      setShowAlert2(true)
      axios.get(`/pasajero/verify/${dni}/${contratoActual}/${userdata.id}`, {
        headers: {
          'x-access-token': `${token}`,
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        if (res.status === 200) {

          setShowAlert2(false)
          setShowDropDowns(false)
          setInputChanged(false)
          setValue('username', res.data.nombre);
          setValue('userlastname', res.data.apellido);
          setValue('useremail', res.data.email);
          setValue('idPasajero', res.data.id)
        }
        else if (res.status === 201) {
          setShowAlert2(false)
          agregarPasajero()

          Alert.alert(
            '',
            `${res.data.message}`,
            [
              {
                text: 'Aceptar',
                onPress: () => console.log('Botón 1 presionado')
              },
            ],
            { cancelable: false }
          );
        }
        else if (res.status === 202) {
          setShowAlert2(false)
          setShowDropDowns(true)
          setInputChanged(true)
          setValue('username', res.data.nombre);
          setValue('userlastname', res.data.apellido);
          setValue('useremail', res.data.correo.trim());
          setValue('idPasajero', res.data.id)
        }
      }).catch((error) => {
        if (error.response.data.financiacion) {
          setShowAlert2(false)
          setShowDropDowns(false)
          setInputChanged(false)
          setDataPasajero(error.response.data)
           setFPDResponse(error.response.data.financiacion.map((finan) => finan.medio_de_pago))
           setCuotasResponse(error.response.data.financiacion.map(finan => ({
             fdm: finan.medio_de_pago,
             cuotas: finan.cuotas
           })))
           setImporteResponse(error.response.data.financiacion.map(finan => ({
             importe: finan.importe,
             forma: finan.medio_de_pago
           })))
          setValue('montoRender', error.response.data.monto)
          setValue('login', error.response.data.login)
        }else{
          setShowAlert2(false)
          console.log('log error: ', error.response.data);
        }
      })
    }
    else {
      setValue('username', "");
      setValue('userlastname', "");
      setValue('useremail', "");
      setValue('idPasajero', "")
      setNewDate("")
      setToggleCheckBox(false)
      setFDPSeleccionado('')
    }
    /* if (dni !== undefined && dni.length === 8) {
      setShowAlert2(true)
      axios.get(`http://192.168.1.3/pasajero/verify/${dni}/${contratoActual}/${userdata.id}`, {
        headers: {
          'x-access-token': `${token}`,
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        if (res.status === 200) {
          console.log('res dataaa! :', res.data);
          setShowAlert2(false)
          setShowDropDowns(false)
          setInputChanged(false)
          setValue('username', res.data.nombre);
          setValue('userlastname', res.data.apellido);
          setValue('useremail', res.data.email);
          setValue('idPasajero', res.data.id)
          setValue('login', res.data.login)
        }
        else if(res.status === 201) {
          setShowAlert2(false)
          agregarPasajero()
          console.log(res.data);
          Alert.alert(
            '',
            `${res.data.message}`,
            [
              {
                text: 'Aceptar',
                onPress: () => console.log('Botón 1 presionado')
              },
            ],
            { cancelable: false }
          );
        }
        else if(res.status === 202){
          console.log('res dataaa! :', res.data);
          setShowAlert2(false)
          setShowDropDowns(true)
          setInputChanged(true)
          setValue('username', res.data.nombre);
          setValue('userlastname', res.data.apellido);
          setValue('useremail', res.data.correo.trim());
          setValue('idPasajero', res.data.id)
        }
        else if(res.status === 400){
          console.log('res dataaa 400! :', res.data);
        }
      }).catch((error) => {
        console.log("esto es error: ", error.response);
        setShowAlert2(false)
        setShowDropDowns(false)
        setInputChanged(false)
        setDataPasajero(error.response.data)
        setValue('montoRender', error.response.data.monto)
        setValue('login', error.response.data.login)
      })
    } */ /* else {
      console.log("es undefined");
      setValue('username', "");
      setValue('userlastname', "");
      setValue('useremail', "");
      setValue('idPasajero', "")
      setNewDate("")
      setToggleCheckBox(false)
      setFDPSeleccionado('')
    } */
  }, [dni])

  useEffect(() => {
    if (date.getFullYear() < 2024) {
      console.log(date.getFullYear());
      // Dividir la cadena por la barra "/"
      // Crear un objeto Date
      const fechaObjeto = new Date(date);

      // Obtener el nombre abreviado del mes
      const mesesAbreviados = [
        "ene", "feb", "mar", "abr", "may", "jun",
        "jul", "ago", "sep", "oct", "nov", "dic"
      ];
      const nombreMesAbreviado = mesesAbreviados[fechaObjeto.getUTCMonth()];

      // Formatear la fecha en el formato deseado
      const fechaFormateada = `${fechaObjeto.getUTCDate()}/${nombreMesAbreviado}/${fechaObjeto.getUTCFullYear()}`;
      setNewDate(fechaFormateada)
    }
  }, [date])

  useEffect(() => {
    if (isExpanded) {
      // Mide la altura del contenido cuando se expande
      contentRef.current.measure((x, y, width, height) => {
        Animated.timing(heightAnim, {
          toValue: FDPResponse.length * 3.5 + 165, // Ajusta según tus necesidades
          //toValue: height + 480,
          duration: 100,
          useNativeDriver: false,
        }).start();
      });
    } else {
      setIsExpanded(false)
      // Cuando se colapsa, simplemente usa la altura mínima
      Animated.timing(heightAnim, {
        toValue: 50, // Altura mínima
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded]);

  const [lengthCuotas, setLengthCuotas] = useState(90)

  useEffect(() => {
    if (isExpanded1) {
      // Mide la altura del contenido cuando se expande
      contentRef1.current.measure((x, y, width, height) => {
        Animated.timing(heightAnim1, {
          toValue: lengthCuotas * 10 + 150 , // Ajusta según tus necesidades
          //toValue: height + 480,
          duration: 100,
          useNativeDriver: false,
        }).start();
      });
    } else {
      setIsExpanded1(false)
      // Cuando se colapsa, simplemente usa la altura mínima
      Animated.timing(heightAnim1, {
        toValue: 50, // Altura mínima
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded1]);

  //seteo de fecha max prueba
  function obtenerFechaMaxima() {
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const anioMaximo = anioActual - 5;

    // Creamos una nueva fecha con el año máximo y el último día del último mes del año
    const fechaMaxima = new Date(anioMaximo, 11, 31);

    return fechaMaxima;
  }

  // Ejemplo de uso
  const fechaMaxima = obtenerFechaMaxima();

  return (
    <View style={{
      width: 373,
      height: showDropDowns === true ? 600 : !isExpanded && isExpanded1 || isExpanded && !isExpanded1 ? 1050 : isExpanded && isExpanded1 ? 1200 : 850,
      backgroundColor: "#FFFFFF", marginTop: 15, borderRadius: 10, justifyContent: "center", alignItems: "center"
    }}>
      <View style={{ height: 50 }}>
        <Text style={{ color: "#334EA2", fontWeight: "500", fontSize: 16 }}>
          Datos del pasajero
        </Text>
      </View>
      <View style={{ width: 330, justifyContent: "center", alignItems: "center" }}>
        <CustomInput
          control={control}
          trigger={trigger}
          placeholder="Ingresa tu DNI"
          name="userdni"
          numeric="numeric"
          rules={{
            required: true,
            pattern: { value: /^[0-9]+$/, message: "El DNI es incorrecto" },
            minLength: {
              value: 7,
              message: "El DNI ingresado no es válido."
            },
            maxLength: {
              value: 8,
              message: "El DNI ingresado no es válido."
            }
          }}
        />
        <CustomInput
          control={control}
          name="username"
          placeholder="Nombre"
          trigger={trigger}
          rules={{
            required: true,
            pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, message: "El Nombre es incorrecto" },
            minLength: {
              value: 2,
              message: "El Nombre no es válido."
            },
            maxLength: {
              value: 15,
              message: "El Nombre no es válido."
            }
          }}
        />
        <CustomInput
          control={control}
          name="userlastname"
          placeholder="Apellido"
          trigger={trigger}
          rules={{
            required: true,
            pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, message: "El Apellido es incorrecto" },
            minLength: {
              value: 2,
              message: "El Apellido no es válido."
            },
            /* maxLength: {
              value: 15,
              message: "El Apellido no es válido."
            } */
          }}
        />
        <View style={{
          width: "100%",
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#CDD1DF',
          borderRadius: 10,
          height: 50,
          marginBottom: 20,
        }}>
          <TouchableOpacity style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center" }} onPress={() => setOpen(true)}>
            <Image source={require("../../../assets/calendar_month.png")} style={{ width: 18, height: 19, marginLeft: 5 }} />
            {
              newDate ?
                <Text style={{
                  paddingLeft: 10,
                  alignItems: "center",
                  fontWeight: "600",
                  fontSize: 14,
                  lineHeight: 16,
                  borderRadius: 8,
                  color: "#564C71"
                }}>
                  {newDate}
                </Text>
                :
                <Text style={{
                  paddingLeft: 10,
                  alignItems: "center",
                  fontWeight: "600",
                  fontSize: 14,
                  lineHeight: 16,
                  borderRadius: 8,
                  color: "#CDD1DF",
                  marginLeft: 2
                }}>
                  Fecha de nacimiento
                </Text>
            }
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false)
              setDate(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
            mode="date"
            title="Seleccione su fecha de nacimiento"
            confirmText="Confirmar"
            cancelText="Cancelar"
            locale="es"
          /* maximumDate={fechaMaxima}
          minimumDate={fechaMin} */

          />
        </View>
        <CustomInput
          control={control}
          name="useremail"
          placeholder="Email"
          trigger={trigger}
          rules={{
            required: true,
            pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "El Email ingresado no es válido." }
          }}
        />

        {
          showDropDowns === false ?
            <>
              {
                FDPResponse !== '' ?
                  <DropdownFDP
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                    contentRef={contentRef}
                    heightAnim={heightAnim}
                    setFDPSeleccionado={setFDPSeleccionado}
                    FDPSeleccionado={FDPSeleccionado}
                    FDPResponse={FDPResponse}
                  />
                  : null
              }
              {
                cuotasResponse !== '' ?
                  <DropdownCuotas
                    isExpanded1={isExpanded1}
                    setIsExpanded1={setIsExpanded1}
                    contentRef1={contentRef1}
                    heightAnim1={heightAnim1}
                    dataPasajero={dataPasajero}
                    cuotaSeleccionada={cuotaSeleccionada}
                    setCuotaSeleccionada={setCuotaSeleccionada}
                    FDPSeleccionado={FDPSeleccionado}
                    cuotasResponse={cuotasResponse}
                    setLengthCuotas={setLengthCuotas}
                  />
                  : null
              }

              <ImporteText
                dataPasajero={dataPasajero}
                FDPSeleccionado={FDPSeleccionado}
                cuotaSeleccionada={cuotaSeleccionada}
                importeResponse={importeResponse}
                setImporte={setImporte}
                importe={importe}
                toggleCheckBoxIPC={toggleCheckBoxIPC}
                setToggleCheckBoxIPC={setToggleCheckBoxIPC}
                toggleCheckBoxDolares={toggleCheckBoxDolares}
                setToggleCheckBoxDolares={setToggleCheckBoxDolares}
              />
            </>
            :
            null
        }

        <View style={{ height: "5%", display: "flex", flexDirection: "row", marginTop: 15 }}>
          <View>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
              tintColors={true ? "black" : "black"}
            />
          </View>
          <TouchableOpacity onPress={() => { abrirLink('https://8ball.ar/politica-de-privacidad-turismo-cuyen/') }} style={{ marginLeft: "3%" }}>
            <Text style={{ fontSize: 12, color: "#949AAF" }}>
              Estoy de acuerdo con los
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 11.5, color: "#949AAF" }}>
              Términos de Servicios y Política de privacidad.
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 47, width: 331, marginTop: "5%" }}>
          <ButtonCustom
            disabled={toggleCheckBox === true && toggleCheckBoxIPC === true && toggleCheckBoxDolares === true ? false : true}
            text="Agregar"
            color={toggleCheckBox === true && toggleCheckBoxIPC === true && toggleCheckBoxDolares === true ? "#FF3D00" : "#CDD1DF"}
            onPress={handleSubmit(handleSubmitcarga)}
          />
        </View>

        <ModalComponent visible={modalVisible} onClose={closeModal} data={datosTotales} setNewFetch={setNewFetch} agregarPasajero={agregarPasajero} inputChanged={inputChanged} />

        <View style={{ height: 47, width: 331, marginTop: "2%", borderColor: "#3462BF", borderWidth: 1, borderRadius: 10 }}>
          <ButtonCustom
            text="Cancelar"
            color="#FFFFFF"
            register={true}
            onPress={agregarPasajero}
          />
        </View>
      </View>
      {showAlert2 ? getAlert() : null}
    </View>
  )
}





