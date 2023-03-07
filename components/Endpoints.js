
import axios from "axios";

function editApi(e, endpoint, body, token, modalCloser, loadState) {
  e.preventDefault()
  // debugger
  loadState(true)
  axios.put(endpoint, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      console.log(response)
      loadState(false)
      modalCloser(false, "editSetting")
    })
    .catch(error => { console.log(error) })
}
function createApi(e, endpoint, body, token, modalCloser, loadState, modal) {
  e.preventDefault()
  // debugger
  loadState(true)
  axios.post(endpoint, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      console.log(response)
      loadState(false)
      modalCloser(false, modal)
    })
    .catch(error => { console.log(error) })
}

function postApi(e, endpoint, body, token, modalCloser, loadState, modal) {
  e.preventDefault()
  // debugger
  loadState(true)
  axios.post(endpoint, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      console.log(response)
      loadState(false)
      modalCloser(false, modal)
    })
    .catch(error => {
      loadState(false)
      console.log(error)
      modalCloser(false, modal)
    })
}
function patchApi(e, endpoint, token, modalCloser, loadState, modal) {
  e.preventDefault()
  // loadState(true)
  // debugger
  axios.patch(endpoint, null, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      // debugger
      console.log(response.config.url)
      loadState(false)
      modalCloser(false, modal)
    })
    .catch(error => {
      // debugger
      console.log(error)
      modalCloser(false, modal)
    })
}

function deleteApi(e, endpoint, token, modalCloser, loadState, modal) {
  e.preventDefault()
  // loadState(true)
  debugger
  axios.delete(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      console.log(response)
      loadState(false)
      modalCloser(false, modal)
    })
    .catch(error => {
      console.log(error)
      loadState(false)
      modalCloser(false, modal)
    })
}

// https://aa63-102-219-152-17.eu.ngrok.io 
//  axios.post("http://admapis-staging.payrail.co/v1/auth/login", {

const ngrok = "https://a34f-102-89-33-46.eu.ngrok.io/"
const testEnv = "https://admapis-staging.payrail.co/"
export { editApi, ngrok, testEnv, deleteApi, patchApi, postApi, createApi }