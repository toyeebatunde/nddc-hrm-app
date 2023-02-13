
import axios from "axios";

function editApi(e, endpoint, body, token, modalSuccessNotify, closer) {
  e.preventDefault()
  // debugger
  axios.put(endpoint, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      modalSuccessNotify(true)
      debugger
      // router.reload(window.location.pathname)
      console.log(response)
      closer(e)
    })
    .catch(error => { console.log(error) })
}

function deleteApi(e, endpoint, token, closer) {
  e.preventDefault()

  axios.delete(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      // debugger
      // router.reload(window.location.pathname)
      console.log(response)
      closer(false)
    })
    .catch(error => { console.log(error) })
}

 // https://aa63-102-219-152-17.eu.ngrok.io 
//  axios.post("http://admapis-staging.payrail.co/v1/auth/login", {

const ngrok = "https://a34f-102-89-33-46.eu.ngrok.io/"
const testEnv = "http://admapis-staging.payrail.co/"
export { editApi, ngrok, testEnv, deleteApi }