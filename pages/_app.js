import Layout from '../components/Layout'
import '../styles/globals.css'
import {useState, useEffect} from 'react'
import LayoutAuthed from '../components/LayoutAuthed'
import {useRouter} from 'next/router'

export default function MyApp({ Component, pageProps }) {
  const [passwordDisplay, setPasswordDisplay] = useState({passwordInput:"password"})
  const [resetPasswordDisplay, setResetPasswordDisplay] = useState({newPassword:"password", confirmPassword:"password"})
  const [token, setToken] = useState()
  // const [activeDashboard, setActiveDashboard] = useState("AgentMetrics")
  // const [isModalOpen, setIsModalOpen] = useState(false)  
  const [modals, setModals] = useState({isOpen: false, teamModal: false, rolesModal: false, bankDelete: false})
  const router = useRouter()

  const Layout = Component.Layout || EmptyLayout

  function setModalState(state, modalToSet) {
    setModals({...modals, isOpen:state, [modalToSet]:state})
  }

  // localStorage.setItem('token', true)

  useEffect(()=>{
    // let isLoggedIn = localStorage.getItem('token')
    if(localStorage.getItem('token')) {
      setToken("token")
    }
  },[])

  function showPassword(e, field, shower, showState) {
    // e.preventDefault()
    console.log(field)
    if (field.current.type === "password") {
      let a = {...showState, [field.current.id]:"updated"}
      console.log(a)
      shower({...showState, [field.current.id]:"text"})
    } else if (field.current.type === "text") {      
      shower({...showState, [field.current.id]:"password"})
    }

    // useEffect(()=>{},[passwordDisplay])

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

    <LayoutAuthed modals={modals} setModalState={setModalState}>
      <Layout  modals={modals}>
      <Component {...pageProps} modals={modals} setModals={setModals} setModalState={setModalState}/>
      </Layout>
    </LayoutAuthed>
  )
}

const EmptyLayout = ({children}) => <>{children}</>
 