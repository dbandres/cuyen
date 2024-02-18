const { default: axios } = require("axios");


const updateImage = async (imgGalery, image) => {
  console.log("update img: ",imgGalery, image);
  // Verificar si data es un array
  const isDataArray = Array.isArray(imgGalery);
  if(isDataArray === true){
    const responseArray = []
    responseArray.push(image[0])
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imgGalery[0].uri,
        type: imgGalery[0].type,
        name: "image.png", // Cambia aquí si deseas mantener el nombre original de la imagen
      });
  
      const response = await axios.post("https://www.turismocuyen.com.ar/spaces", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
  
      responseArray.push(response.data);
      return responseArray; // Devuelve los datos de la respuesta para usarlos en otro componente
    } catch (error) {
      console.error('Error al actualizar la imagen:', error);
      throw error; // Puedes manejar el error como desees
    }
  }else{
    const responseArray = []
    responseArray.push(image[0])
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imgGalery.uri,
        type: imgGalery.type,
        name: "image.png", // Cambia aquí si deseas mantener el nombre original de la imagen
      });
  
      const response = await axios.post("https://www.turismocuyen.com.ar/spaces", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
  
      responseArray.push(response.data);
      return responseArray; // Devuelve los datos de la respuesta para usarlos en otro componente
    } catch (error) {
      console.error('Error al actualizar la imagen:', error);
      throw error; // Puedes manejar el error como desees
    }
  }
};


export default updateImage;