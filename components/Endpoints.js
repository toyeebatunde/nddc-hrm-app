
import axios from "axios";

function editApi(e, endpoint, body, token, router, modalSuccessNotify, closer) {
  e.preventDefault()
  debugger
  axios.put(endpoint, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      modalSuccessNotify(true)
      // router.reload(window.location.pathname)
      console.log(response)
      closer(e)
    })
    .catch(error => { console.log(error) })
}

export { editApi }