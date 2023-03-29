
import axios from "axios";
import { mutate } from "swr";
const poster = (url, body) => axios.post(url, body, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)

function editApi(e, endpoint, body, token, modalCloser, loadState, modal, triggerReload) {
  e.preventDefault()
  // debugger
  // loadState(true)
  axios.put(endpoint, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      console.log(response)
      loadState(false)
      modalCloser(false, modal)
      triggerReload()
    })
    .catch(error => {
      loadState(false)
      console.log(error)
      modalCloser(false, modal)
      triggerReload()
    })
}

async function addCategory(e, posted, url, body) {
  e.preventDefault()
  await posted(url, body)
  mutate(url)
}

function postApi(e, endpoint, body, token, modalCloser, loadState, modal, triggerReload, auxiliaryFunc) {
  e.preventDefault()
  // debugger
  // loadState(true)
  axios.post(endpoint, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      console.log(response)
      loadState(false)
      modalCloser(false, modal)
      // debugger
      triggerReload()
      auxiliaryFunc? auxiliaryFunc(e, false) : null
    })
    .catch(error => {
      loadState(false)
      console.log(error)
      modalCloser(false, modal)
    })
  // await addCategory(e, poster, endpoint, body)
  // modalCloser(false, modal)
}

async function createApi(e, endpoint, body, token, modalCloser, loadState, modal, triggerReload) {
  e.preventDefault()
  // debugger
  // loadState(true)
  axios.post(endpoint, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      console.log(response)
      loadState(false)
      modalCloser(false, modal)
      triggerReload()
    })
    .catch(error => {
      loadState(false)
      console.log(error)
      modalCloser(false, modal)
    })

}


function patchApi(e, endpoint, token, modalCloser, loadState, modal, triggerReload, patch=null) {
  e.preventDefault()
  // loadState(true)
  debugger
  axios.patch(endpoint, patch, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      // debugger
      console.log(response)
      loadState(false)
      modalCloser(false, modal)
      triggerReload()
    })
    .catch(error => {
      // debugger
      console.log(error)
      modalCloser(false, modal)
    })
}


async function deleteApi(e, endpoint, token, modalCloser, loadState, modal, triggerReload) {
  e.preventDefault()
  // loadState(true)
  // debugger
  await axios.delete(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      // mutate(endpoint)
      console.log(response)
      loadState(false)
      modalCloser(false, modal)
      triggerReload()
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
const testEnv = "https://agencyadm-api.payrail.co/"
// const testEnv = "https://admapis-staging.payrail.co/"
// https://agencyadm-api.payrail.co/
export { editApi, ngrok, testEnv, deleteApi, patchApi, postApi, createApi }