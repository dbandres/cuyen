const { default: axios } = require("axios")
const { token } = require("../../../api")


const deleteImgSpaces = async (url) => {
  console.log("esto es url: ",url);
  const resp = await axios.put("/spaces", {
    image: url
  })

  return resp.status
}

const deleteImgUrl = async (id, name, data, deletedItem) => {
  if (name === "Ficha medica") {
    const resp = await axios.put(`/pasajero/${id}`, {
      ficha_med: null
    }, {
      headers: {
        'x-access-token': `${token}`,
        'Content-Type': 'application/json',
      }
    })
    console.log(resp);
    return resp.status
  }
  else if (name === "Declaración jurada") {
    const resp = await axios.put(`/pasajero/${id}`, {
      dec_jurada: null
    }, {
      headers: {
        'x-access-token': `${token}`,
        'Content-Type': 'application/json',
      }
    })
    console.log(resp);
    return resp.status
  }
  else if (name === "Documento de identidad") {

    const resp = await axios.put(`/pasajero/${id}`, {
      image_dni: data !== undefined ? data : []
    }, {
      headers: {
        'x-access-token': `${token}`,
        'Content-Type': 'application/json',
      }
    })
    console.log(resp);
    return resp.status
  }

  else if (name === "Carnet de obra social") {
    const resp = await axios.put(`/pasajero/${id}`, {
      obra_soc: data !== undefined ? data : []
    }, {
      headers: {
        'x-access-token': `${token}`,
        'Content-Type': 'application/json',
      }
    })
    console.log(resp);
    return resp.status
  }
}
module.exports = { deleteImgSpaces, deleteImgUrl };