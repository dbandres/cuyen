import axios from "axios";
import { token } from "../../../api";

const uploadImages = (img, name, data) => {

  // Verificar si data es un array
  const isDataArray = Array.isArray(img);
  console.log(isDataArray);

  return new Promise((resolve, reject) => {
    if (isDataArray === true) {
      if (img.length >= 3) {
        reject(new Error('Demasiadas imágenes. El límite es 2.'));
        return;
      } else {
        const promises = img.map(image => {
          const formData = new FormData();
          formData.append('image', {
            uri: image.uri,
            type: image.type,
            name: "image.png", // Cambia aquí si deseas mantener el nombre original de la imagen
          });

          return axios.post("https://www.turismocuyen.com.ar/spaces", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          });
        });

        Promise.all(promises)
          .then(responses => {
            const responsesArray = [];
            responses.forEach(res => {
              if (res.status === 200) {
                responsesArray.push(res.data);
                if (name === "carnet") {
                  const resp = axios.put(`/pasajero/${data}`, {
                    obra_soc: responsesArray
                  },
                    {
                      headers: {
                        'x-access-token': `${token}`,
                        'Content-Type': 'application/json',
                      }
                    })
                  resp.then((res) => {
                    console.log("esto es res: ", res);
                  })
                } else if (name === "dni") {
                  const resp = axios.put(`/pasajero/${data}`, {
                    image_dni: responsesArray
                  },
                    {
                      headers: {
                        'x-access-token': `${token}`,
                        'Content-Type': 'application/json',
                      }
                    })
                  resp.then((res) => {
                    console.log("esto es res: ", res);
                  })
                }else if(name ==="ficha" ){
                  const resp = axios.put(`/pasajero/${data}`, {
                    ficha_med: res.data
                  },
                    {
                      headers: {
                        'x-access-token': `${token}`,
                        'Content-Type': 'application/json',
                      }
                    })
                  resp.then((res) => {
                    console.log("esto es res: ", res);
                  })
                }else{
                  const resp = axios.put(`/pasajero/${data}`, {
                    dec_jurada: res.data
                  },
                    {
                      headers: {
                        'x-access-token': `${token}`,
                        'Content-Type': 'application/json',
                      }
                    })
                  resp.then((res) => {
                    console.log("esto es res: ", res);
                  })
                }
              }
            });
            resolve(responsesArray);
            return;
          })
          .catch(error => {
            reject(error);
          });
      }
    } else {
        const formData = new FormData();
        formData.append('image', {
          uri: img.uri,
          type: img.type,
          name: "image.png", // Cambia aquí si deseas mantener el nombre original de la imagen
        });

        const response = axios.post("https://www.turismocuyen.com.ar/spaces", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

      response
        .then(responses => {
          const responsesArray = [];
            if (responses.status === 200) {
              responsesArray.push(responses.data);
              if (name === "ficha") {
                const resp = axios.put(`/pasajero/${data}`, {
                  ficha_med: responses.data
                },
                  {
                    headers: {
                      'x-access-token': `${token}`,
                      'Content-Type': 'application/json',
                    }
                  })
                resp.then((res) => {
                  console.log("esto es res: ", res);
                })
              } else if (name === "declaracion") {
                const resp = axios.put(`/pasajero/${data}`, {
                  dec_jurada: responses.data
                },
                  {
                    headers: {
                      'x-access-token': `${token}`,
                      'Content-Type': 'application/json',
                    }
                  })
                resp.then((res) => {
                  console.log("esto es res: ", res);
                })
              }
            }

          resolve(responsesArray);
          return;
        })
        .catch(error => {
          reject(error);
        });

    }
  });
};

export default uploadImages;