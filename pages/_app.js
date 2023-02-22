
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
  const [activeTab, setActiveTab] = useState()
  const [loginDetails, setLoginDetails] = useState({ username: "", password: "" })
  const [passwordDisplay, setPasswordDisplay] = useState({ password: "password" })
  const [resetPasswordDisplay, setResetPasswordDisplay] = useState({ newPassword: "password", confirmPassword: "password" })
  const [token, setToken] = useState(false)
  const [modals, setModals] = useState({ isOpen: false, teamModal: false, rolesModal: false, action: false, editCharges: false, addSplit: false, editSetting: false })
  const [editForm, setEditForm] = useState()
  const [modalSuccess, setModalSuccess] = useState(false)
  const router = useRouter()
  const [viewState, setViewState] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState()
  

  const Layout = Component.Layout || EmptyLayout

  function setView(state) {
    setViewState(state)
  }

  function setUserPrivilege (user) {

  }

  function setTab(tab) {
    setActiveTab(tab)
  }

  function switchBoard(e, board, active) {
    setActiveDashboard(board)
    setActiveState(active)
  }

  function setLoading(state) {
    setIsLoading(state)
  }

  function modalSuccessNotify(state) {
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
    console.log("closer")
    setModals({ isOpen: false, teamModal: false, rolesModal: false, action: false, editCharges: false, addSplit: false, editSetting: false })

  }

  function closeModals() {
    setModals({ isOpen: false, teamModal: false, rolesModal: false, action: false, editCharges: false, addSplit: false, editSetting: false })
  }

  function changeForm(e, form, setter) {
    setter({ ...form, [e.target.id]: e.target.value })
  }

  function editFormState(formState, id) {
    setEditForm({ id: id, values: formState })
  }

  function formEdit(e) {
    setEditForm({ ...editForm, values: { ...editForm.values, [e.target.name]: e.target.value } })
  }

  function login(details) {

    axios.post(`${testEnv}v1/auth/login`, {
      password: details.password,
      username: details.username
    })
      .then(response => {
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

    <LayoutAuthed
      isLoading={isLoading}
      setLoading={setLoading}
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
      activeTab={activeTab}
      setActiveTab={setTab}
      viewState={viewState}
      setView={setView}
    >
      <Layout modals={modals} activeTab={activeTab} setActiveTab={setTab} activeAgency={activeDashboard} setView={setView} viewState={viewState}>
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
          isLoading={isLoading}
          setLoading={setLoading}
          activeTab={activeTab}
          setActiveTab={setTab}
        />
      </Layout>
    </LayoutAuthed>
  )
}

const EmptyLayout = ({ children }) => <>{children}</>
