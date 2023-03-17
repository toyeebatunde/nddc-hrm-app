
import '../styles/globals.css'
import { useState, useEffect } from 'react'
import LayoutAuthed from '../components/LayoutAuthed'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ngrok, testEnv } from '../components/Endpoints'
import Textfield from '../components/TextField'
import ImageHolder from '../components/ImageHolder'
import jwt from 'jsonwebtoken'
import LoginLayout from '../components/LoginLayout'


export default function MyApp({ Component, pageProps }) {
  const [activeDashboard, setActiveDashboard] = useState("AgentMetrics")
  const [activeState, setActiveState] = useState("0")
  const [activeTab, setActiveTab] = useState()
  const [loginDetails, setLoginDetails] = useState({ username: "", password: "" })
  const [newLoginDetails, setNewLoginDetails] = useState({ confirmPassword: "", password: "", code: "" })
  const [passwordDisplay, setPasswordDisplay] = useState({ password: "password" })
  const [newPasswordDisplay, setNewPasswordDisplay] = useState({ password: "password", confirmPassword: "password" })
  const [resetPasswordDisplay, setResetPasswordDisplay] = useState({ newPassword: "password", confirmPassword: "password" })
  const [token, setToken] = useState(false)
  const [modals, setModals] = useState({ isOpen: false, teamModal: false, rolesModal: false, action: false, editCharges: false, addSplit: false, editSetting: false, posModalAdd: false, posModalAssign: false, authModal: false, createCharges: false, imageView: false })
  const [editForm, setEditForm] = useState()
  const [week, setWeek] = useState({
    current: "Last 7 days",
    oneBefore: getPreviousDay(1),
    twoBefore: getPreviousDay(2),
    threeBefore: getPreviousDay(3),
    fourBefore: getPreviousDay(4),
    fiveBefore: getPreviousDay(5),
    sixBefore: getPreviousDay(6),
    sevenBefore: getPreviousDay(7),
  })
  const [dateRange, setDateRange] = useState({ dateFrom: getPreviousDay(7), dateTo: new Date(), search:false })

//    function formatDate(date) {            
//     var d = date.getUTCDate().toString(),           
//         m = (date.getUTCMonth() + 1).toString(),    
//         y = date.getUTCFullYear().toString(),       
//         formatted = '';
//     if (d.length === 1) {                           
//         d = '0' + d;
//     }
//     if (m.length === 1) {                           
//     }
//     formatted = d + '-' + m + '-' + y;              
//     return formatted;
// }

  function setDateSearchRange(e, set) {
    // console.log(e)
    if(set == "week") {
      setWeek({...week, current:e.target.innerText})
    }
  }

  function dateSearch() {}

  const [modalSuccess, setModalSuccess] = useState(false)
  const router = useRouter()
  // console.log(router)
  const [viewState, setViewState] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState()
  const [entryValue, setEntryValue] = useState({ size: 5, page: 0 })
  const [passwordCaution, setCreatePasswordCaution] = useState(false)
  const [loginFail, setLoginFail] = useState(false)


  const Layout = Component.Layout || EmptyLayout

  function setView(state) {
    setViewState(state)
  }

  function getPreviousDay(range, date = new Date()) {
    const previous = new Date(date.getTime());
    // console.log(previous)
    previous.setDate(date.getDate() - range);
    return previous;
  }

  function changePasswordCaution() {
    if (passwordCaution) {
      setCreatePasswordCaution(false)
      return
    }
    setCreatePasswordCaution(true)
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
    // console.log("closer")
    setModals({ isOpen: false, teamModal: false, rolesModal: false, action: false, editCharges: false, addSplit: false, editSetting: false, posModalAdd: false, posModalAssign: false, authModal: false, createCharges: false, imageView: false })

  }

  function closeModals() {
    setModals({ isOpen: false, teamModal: false, rolesModal: false, action: false, editCharges: false, addSplit: false, editSetting: false, posModalAdd: false, posModalAssign: false, authModal: false, createCharges: false, imageView: false })
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

  function login(details, caution) {
    setIsLoading(true)
    // debugger
    axios.post(`${testEnv}v1/auth/login`, {
      "password": details.password,
      "username": details.username
    })
      .then(response => {
        const decoded = jwt.decode(response.data.token)
        setToken(true)
        const user = { role: decoded?.role, permissions: decoded?.permissions?.split(',') }
        Cookies.set("token", response.data.token)
        Cookies.set("token", response.data.token)
        // console.log(user)
        Cookies.set("user", JSON.stringify(user))
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(user))
        setIsLoading(false)
        router.push("/dashboard/analytics/agent-metrics")
        // console.log(response.data)
      })
      .catch(response => {
        // console.log(response.response.data)
        if(response.response.data.status == 400 || response.response.data.data == "Incorrect Password") {
          caution()
        }
      })
  }

  function logout() {
    setIsLoading(true)
    // debugger 
    localStorage.clear('token')
    localStorage.clear('user')
    Cookies.remove('token')
    Cookies.remove('user')
    setIsLoading(false)
    router.push("/")
  }

  function loginCaution() {

  }

  function createPassword(details, caution, setDetails) {
    if (details.password !== details.confirmPassword) {
      // debugger
      caution()
      return
    }
    // console.log(`${testEnv}v1/auth/reset_password?code=${details.code}`)
    const url = `${testEnv}v1/auth/reset_password?code=${details.code}`
    // console.log(url)
    debugger
    axios.patch(url,
      {
        "newPassword": details.password,
        "confirmPassword": details.confirmPassword
      }
    )
      .then(response => {
        // debugger
        setDetails({ password: "", confirmPassword: "", code: "" })
        router.push("/success")
      })
      .catch(response => {
        // debugger
        // console.log(response)
      })
  }

  function tokenTrue() {
    setToken(true)
  }



  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken("token")
    }
  }, [])

  function pageSelector(e, entry) {
    if (entry == "size") {
      setEntryValue({ ...entryValue, size: e.target.value })
      return
    }
    if (entry == "page") {
      setEntryValue({ ...entryValue, page: e.target.value })
      return
    }
    if (entry == "none") {
      setEntryValue({ ...entryValue, page: entryValue.page + 1 })
      return
    }
    if (entry == "rewind" && entryValue.page > 0) {
      setEntryValue({ ...entryValue, page: entryValue.page - 1 })
      return
    }

  }


  function showPassword(field, shower, showState) {
    if (field.current.type === "password") {
      shower({ ...showState, [field.current.id]: "text" })
    } else if (field.current.type === "text") {
      shower({ ...showState, [field.current.id]: "password" })
    }
  }

  if (router.pathname === "/" || router.pathname.includes("/change-password") || router.pathname === "/success" || router.pathname === "/reset-password") {
    return (
      <LoginLayout>
        <Component
          {...pageProps}
          login={login}
          setPasswordDisplay={setPasswordDisplay}
          showPassword={showPassword}
          passwordDisplay={passwordDisplay}
          changeForm={changeForm}
          loginDetails={loginDetails}
          setLoginDetails={setLoginDetails}
          newPasswordDisplay={newPasswordDisplay}
          setNewPasswordDisplay={setNewPasswordDisplay}
          newLoginDetails={newLoginDetails}
          setNewLoginDetails={setNewLoginDetails}
          createCaution={passwordCaution}
          changer={changePasswordCaution}
          createPassword={createPassword}
        />
      </LoginLayout>
    )
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
      logout={logout}
      dateRange={dateRange}
      week={week}
      setDateRange={setDateRange}

    

    >
      <Layout modals={modals} activeTab={activeTab} setDateSearchRange={setDateSearchRange} setActiveTab={setTab} activeAgency={activeDashboard} setView={setView} viewState={viewState} activeState={activeState} dateRange={dateRange} week={week} setDateRange={setDateRange}>
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
          pageSelector={pageSelector}
          entryValue={entryValue}
          dateRange={dateRange}
          week={week}
          setDateRange={setDateRange}
        />
        {/* <div className="flex px-[20px] justify-between w-full">
          <div className="flex items-center gap-[10px]">
            <h2 className="font-pushpennyBook font-[400] text-[#6E7883] text-[14px] leading-[18px]">Show</h2>
            <div className="w-[83px] h-[51px] rounded-[25.5px] border-[#D1D1D1] border">
              <Textfield formEdit={pageSelector} type="pageSize" bg="bg-white" selectOptions={[5, 10, 15]} />
            </div>
            <h2 className="font-pushpennyBook font-[400] text-[#6E7883] text-[14px] leading-[18px]">entries</h2>
          </div>

          <div className="w-[83px] h-[51px] rounded-[25.5px] justify-center border-[#D1D1D1] border flex items-center">
            <div className=' w-[40%] relative h-[100%] flex justify-center items-center leading-[28px] font-pushpennyBook text-[22px] font-[400]'>{entryValue.page + 1}</div>
            <button onClick={(e)=>{pageSelector(e, "none")}} className='w-[40%] h-[100%] relative justify-center flex items-center'>
              <div className='w-[50%] relative h-[40%]'>
                <ImageHolder src='/icons/forward.svg' />
              </div>
            </button>
          </div>

        </div> */}
      </Layout>
    </LayoutAuthed>
  )
}

const EmptyLayout = ({ children }) => <>{children}</>
