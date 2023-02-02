import Layout from '../components/Layout'
import '../styles/globals.css'
import { useState, useEffect } from 'react'
import LayoutAuthed from '../components/LayoutAuthed'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'


export default function MyApp({ Component, pageProps }) {
  const [activeDashboard, setActiveDashboard] = useState("AgentMetrics")
  const [activeState, setActiveState] = useState("0")
  const [loginDetails, setLoginDetails] = useState({ username: "", password: "" })
  const [passwordDisplay, setPasswordDisplay] = useState({ password: "password" })
  const [resetPasswordDisplay, setResetPasswordDisplay] = useState({ newPassword: "password", confirmPassword: "password" })
  const [token, setToken] = useState(false)
  const [modals, setModals] = useState({ isOpen: false, teamModal: false, rolesModal: false, bankDelete: false, charges: false })
  const router = useRouter()

  const Layout = Component.Layout || EmptyLayout

  function switchBoard(e, board, active) {
    setActiveDashboard(board)
    setActiveState(active)
  }

  function switchActive(e, active) {
    setActiveState(active)
  }

  function setModalState(state, modalToSet="") {
    if (state) {
      setModals({ ...modals, isOpen: state, [modalToSet]: state })
      return
    }
    setModals({ isOpen: false, teamModal: false, rolesModal: false, bankDelete: false })

  }

  function closeModals() {
    setModals({ isOpen: false, teamModal: false, rolesModal: false, bankDelete: false })
  }

  function changeForm(e, form, setter) {
    setter({ ...form, [e.target.id]: e.target.value })
  }

  function login(details) {
    // https://3695-41-138-165-100.eu.ngrok.io/v1/auth/login
    axios.post("https://3695-41-138-165-100.eu.ngrok.io/v1/auth/login", {
      password: details.password,
      username: details.username
    })
      .then(response => {
        // debugger
        // console.log(response.data)
        setToken(true)
        Cookies.set("token", response.data.token)
        router.push("/dashboard/analytics")
      })
      .catch(response => console.log(response.response.status))
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

    <LayoutAuthed modals={modals} token={token} setModalState={setModalState} setActiveDashboard={setActiveDashboard} activeDashboard={activeDashboard} activeState={activeState} switchBoard={switchBoard} switchActive={switchActive} closeModals={closeModals}>
      <Layout modals={modals}>
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
          setModalState={setModalState} />
      </Layout>
    </LayoutAuthed>
  )
}

const EmptyLayout = ({ children }) => <>{children}</>
