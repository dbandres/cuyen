const { default: axios } = require("axios")


const deleteImgSpaces = async (url) =>{
  const resp = await axios.put("/spaces",{
    image: url
  })
  
  return resp.status
}

export default deleteImgSpaces