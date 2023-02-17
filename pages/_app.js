
import '../styles/globals.css'
import { useState, useEffect } from 'react'
import LayoutAuthed from '../components/LayoutAuthed'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ngrok, testEnv } from '../components/Endpoints'


export default function MyApp({ Component, pageProps }) {
  const [activeDashboard, setActiveDashboard] = useState("AgentMetrics")
  const [activeState, setActiveState] = useState("0")
  const [loginDetails, setLoginDetails] = useState({ username: "", password: "" })
  const [passwordDisplay, setPasswordDisplay] = useState({ password: "password" })
  const [resetPasswordDisplay, setResetPasswordDisplay] = useState({ newPassword: "password", confirmPassword: "password" })
  const [token, setToken] = useState(false)
  const [modals, setModals] = useState({ isOpen: false, teamModal: false, rolesModal: false, action: false, editCharges: false, addSplit: false, editSetting:false })
  const [editForm, setEditForm] = useState()
  const [modalSuccess, setModalSuccess] = useState(false)
  const router = useRouter()
  const [viewState, setViewState] = useState(false)

  const Layout = Component.Layout || EmptyLayout

  function setView(state) {
    setViewState(state)
}

  function switchBoard(e, board, active) {
    setActiveDashboard(board)
    setActiveState(active)
  }

  function modalSuccessNotify (state) {
    setModalSuccess(state)
  }

  function switchActive(e, active) {
    setActiveState(active)
  }

  function setModalState(state, modalToSet = "") {
    if (state) {
      setModals({ ...modals, isOpen: state, [modalToSet]: state })
      return
    }
    setModals({ isOpen: false, teamModal: false, rolesModal: false, action: false, editCharges: false, addSplit: false, editSetting: false })

  }

  function closeModals() {
    setModals({ isOpen: false, teamModal: false, rolesModal: false, action: false })
  }

  function changeForm(e, form, setter) {
    setter({ ...form, [e.target.id]: e.target.value })
  }

  function editFormState(formState, id) {
    setEditForm({ id: id, values: formState })
  }

  function formEdit(e) {
    setEditForm({...editForm, values: {...editForm.values, [e.target.name]:e.target.value}})
    // console.log(e.target.value)
    // console.log(e.target.name)
    // console.log(editForm.values[e.target.name])
  }

  function login(details) {
    // https://3695-41-138-165-100.eu.ngrok.io/v1/auth/login
    // https://aa63-102-219-152-17.eu.ngrok.io 
    axios.post(`${testEnv}v1/auth/login`, {
      password: details.password,
      username: details.username
    })
      .then(response => {
        // debugger
        // console.log(response.data)
        setToken(true)
        Cookies.set("token", response.data.token)
        localStorage.setItem('token', response.data.token)
        router.push("/dashboard/analytics")
      })
      .catch(response => console.log(response))
  }

  function tokenTrue() {
    setToken(true)
  }



  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken("token")
    }
  }, [])


  function showPassword(field, shower, showState) {
    if (field.current.type === "password") {
      shower({ ...showState, [field.current.id]: "text" })
    } else if (field.current.type === "text") {
      shower({ ...showState, [field.current.id]: "password" })
    }
  }
  return (
    // <Layout token={token}>
    //   <Component {...pageProps} showPassword={showPassword} 
    //   passwordDisplay={passwordDisplay.passwordInput}
    //   setPasswordDisplay={setPasswordDisplay}
    //   resetPasswordDisplay = {resetPasswordDisplay}
    //   setResetPasswordDisplay = {setResetPasswordDisplay}
    //   />
    // </Layout>

    <LayoutAuthed
      modals={modals}
      editForm={editForm}
      setEditForm={setEditForm}
      token={token}
      setModalState={setModalState}
      setActiveDashboard={setActiveDashboard}
      activeDashboard={activeDashboard}
      activeState={activeState}
      switchBoard={switchBoard}
      switchActive={switchActive}
      closeModals={closeModals}
      formEdit={formEdit}
      modalSuccessNotify={modalSuccessNotify}
      >
      <Layout modals={modals} activeAgency={activeDashboard} setView={setView} viewState={viewState}>
        <Component
          login={login}
          setActiveDashboard={setActiveDashboard}
          activeDashboard={activeDashboard}
          setActiveState={setActiveState}
          activeState={activeState}
          setToken={tokenTrue}
          setPasswordDisplay={setPasswordDisplay}
          showPassword={showPassword}
          passwordDisplay={passwordDisplay}
          changeForm={changeForm}
          loginDetails={loginDetails}
          setLoginDetails={setLoginDetails}
          {...pageProps} modals={modals}
          setModals={setModals}
          setModalState={setModalState}
          editFormState={editFormState}
          modalSuccessNotify={modalSuccessNotify}
          setView={setView}
          viewState={viewState}
        />
      </Layout>
    </LayoutAuthed>
  )
}

const EmptyLayout = ({ children }) => <>{children}</>
