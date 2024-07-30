
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
import { CSVLink } from "react-csv";


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
  const [modals, setModals] = useState({ isOpen: false, teamModal: false, rolesModal: false, action: false, editCharges: false, addSplit: false, editSetting: false, posModalAdd: false, posModalRetrieve: false, posModalAssign: false, authModal: false, createCharges: false, imageView: false })
  const [editForm, setEditForm] = useState()
  const [search, setSearch] = useState(false)
  const [createView, setCreateView] = useState(false)
  const [day, setDay] = useState(0)
  const [rangeParam, setRangeParam] = useState()
  const [currentData, setCurrentData] = useState([])
  const [headers, setHeaders] = useState([])

  const [week, setWeek] = useState({
    current: "Last 7 days",
    days: []
  })
  const [dateRange, setDateRange] = useState({ dateFrom: getPreviousDay(7), dateTo: new Date(), search: false })

  function setDateSearchRange(e, set, day) {
    if (set == "week") {
      setWeek({ ...week, current: e.target.innerText })
      setSearch(true)
      setDay(day)
      setRangeParam("date")
    }
  }

  function dataToDownload(type = "all") {
    if (type == "all") {
      const preSorted = currentItems.map((data) => {
        const newObject = { ...data.data }
        return newObject
      })
      return preSorted
    }
    const data = [...viewFellowship.details.members]
    data.push(viewFellowship.details.fellowship)
    return data
  }

  function handleCurrentData(data, currentHeaders) {
    // debugger
    setCurrentData(data)
    setHeaders(currentHeaders)
  }


  function downloadData(headers) {
    return (
      <CSVLink
        filename="data.csv"
        data={currentData}
        headers={headers}
      >
        Download Info
      </CSVLink>
    )
  }

  function resetDay() {
    setDay(0)
  }

  const [modalSuccess, setModalSuccess] = useState(false)
  const router = useRouter()
  // console.log(router)
  const [viewState, setViewState] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState()
  const [entryValue, setEntryValue] = useState({ size: 15, page: 0 })
  // const[pageData, setPageData] = useState({size: 10, page: 0})
  const [passwordCaution, setCreatePasswordCaution] = useState(false)
  const [passwordChangeError, setPasswordChangeError] = useState(false)
  const [loginFail, setLoginFail] = useState(false)
  const [searchField, setSearchField] = useState("")
  const [agentFormAction, setAgentFormAction] = useState("add")
  const [isClicked, setIsClicked] = useState(false)


  const Layout = Component.Layout || EmptyLayout

  const initialCustomerForm = {
    agentId: "",
    userName: "",
    firstName: "",
    lastName: "",
    fullName: "",
    middleName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dateCreated: "",
    city: "",
    state: "",
    lga: "",
    agentType: "",
    agentClass: "",
    aggregator: "",
    bank: "",
    accountNumber: "",
    id: "",
    bvn: "",
    country: "",
    dob: "",
    gender: ""
  }

  function setSearchParam(e, source) {
    console.log("search ref: ", e.current.value)
    if (e.current.value == "") {
      // setLoading(true)
      setSearch(false)
      setSearchField(e.current.value)
      return
    }

    if (source == "button") {
      setLoading(true)
      setSearchField(e.current.value)
    }
  }
  function resetSearchParams() {
    setSearchField("")
    setDateRange({ dateFrom: getPreviousDay(7), dateTo: new Date(), search: false })
    setSearch(false)
    setWeek({ ...week, current: "Last 7 days" })
    // setDay(0)
  }

  function setView(state, status) {
    if (status) {
      setAgentFormAction(status)
    }
    setViewState(state)
  }

  function getPreviousDay(range, date = new Date()) {
    // debugger
    const previous = date         //new Date(date.getTime());
    previous.setDate(date.getDate() - range);
    // console.log("sample Date", previous.setDate(date.getDate() - range))
    // let checkPrevious = date.getDate() - range
    // debugger
    return previous;
  }

  function resetPage() {
    setEntryValue({ ...entryValue, size: 5, page: 0 })
  }

  function changePasswordCaution() {
    if (passwordCaution) {
      setCreatePasswordCaution(false)
      return
    }
    setCreatePasswordCaution(true)
  }
  function changePasswordError() {
    if (passwordChangeError) {
      setPasswordChangeError(false)
      return
    }
    setPasswordChangeError(true)
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
    axios.post(`https://admapis-staging.payrail.co/v1/auth/login`, { // ${testEnv}v1/auth/login 
      "password": details.password,
      "username": details.username
    })
      .then(response => {
        const decoded = jwt.decode(response.data.token)
        setToken(true)
        const user = { name: decoded?.firstname, role: decoded?.role, permissions: decoded?.permissions?.split(','), exp: decoded?.exp }
        // const exp = { exp: decoded?.exp }
        Cookies.set("token", response.data.token)
        Cookies.set("user", JSON.stringify(user))
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(user))
        setIsLoading(false)
        router.push("/dashboard/agency/agent-management/pending-approvals")
      })
      .catch(response => {
        if (response.response.data.status == 400 || response.response.data.data == "Incorrect Password") {
          setIsLoading(false)
          caution()
        }
      })
  }

  function logout() {
    setIsLoading(true)
    // debugger 
    localStorage.clear()
    Cookies.remove('token')
    Cookies.remove('user')
    setIsLoading(false)
    router.push("/")
  }

  function changeCreateView(status, action = "") {
    if (action == "update") {
      setAgentFormAction("update")
    }
    if (action == "add") {
      setAgentFormAction("add")
    }
    setCreateView(status)
  }

  function createPassword(details, caution, setDetails) {
    setIsClicked(true)
    // debugger
    if (details.password !== details.confirmPassword) {
      // debugger
      caution()
      setIsClicked(false)
      return
    }
    const url = `${testEnv}v1/auth/reset_password?code=${details.code}`
    const thePassword = details.password.replaceAll(" ", "")
    const theConfirmation = details.confirmPassword.replaceAll(" ", "")
    const body = { newPassword: thePassword, confirmPassword: theConfirmation }
    axios.patch(url,
      {
        "newPassword": thePassword,
        "confirmPassword": theConfirmation
      },
      {
        headers: {
          "Host": `${testEnv}`,
          "Content-Length": JSON.stringify(body).length.toString(),
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => {
        setDetails({ password: "", confirmPassword: "", code: "" })
        router.push("/success")
      })
      .catch(response => {
        setPasswordChangeError(true)
        setIsClicked(false)
        console.log("did not reset: ", response)
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

  useEffect(() => {
    setWeek({
      ...week, days: [
        getPreviousDay(1),
        getPreviousDay(2),
        getPreviousDay(3),
        getPreviousDay(4),
        getPreviousDay(5),
        getPreviousDay(6),
        getPreviousDay(7),
      ]
    })
  }, [])

  function pageSelector(e, entry) {
    if (entry == "size") {
      setEntryValue({ ...entryValue, size: e.target.value })
      return
    }
    if (entry == "page") {
      setEntryValue({ ...entryValue, page: Number(e.target.innerText) - 1 })
      // console.log("page: ", e.target.innerText)
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

  // function formatDate(date) {
  //   var d = (date.getUTCDate() + 1).toString(),
  //     m = (date.getUTCMonth() + 1).toString(),
  //     y = date.getUTCFullYear().toString(),
  //     formatted = '';
  //   if (d.length === 1) {
  //     d = '0' + d;
  //   }
  //   if (m.length === 1) {
  //     m = '0' + m;
  //   }
  //   formatted = d + '-' + m + '-' + y;
  //   return formatted;
  // }

  function formatDate(date) {
    var d = date.getDate().toString(), // mount == 1 ? date.getUTCDate() == 31 || date.getUTCDate() == 30 || date.getUTCDate() == 28 || date.getUTCDate() == 29 ?  "1" :  (date.getUTCDate()).toString() : date.getUTCDate() == 31 || date.getUTCDate() == 30 || date.getUTCDate() == 28 || date.getUTCDate() == 29 ?  "1" :  (date.getUTCDate()+1).toString(),
      m = (date.getMonth() + 1).toString(),//(date.getUTCMonth() + 1).toString(),
      y = date.getFullYear().toString(), // date.getUTCFullYear().toString(),
      formatted = '',
      otherDate = date.getDate();
    // debugger
    if (d.length === 1) {
      d = '0' + d;
    }
    if (m.length === 1) {
      m = '0' + m;
    }
    formatted = d + '-' + m + '-' + y;
    // debugger
    // setMount(mount+1)
    return formatted;
  }
  function reformatDate(date) {
    var d = date.getDate().toString(), // mount == 1 ? date.getUTCDate() == 31 || date.getUTCDate() == 30 || date.getUTCDate() == 28 || date.getUTCDate() == 29 ?  "1" :  (date.getUTCDate()).toString() : date.getUTCDate() == 31 || date.getUTCDate() == 30 || date.getUTCDate() == 28 || date.getUTCDate() == 29 ?  "1" :  (date.getUTCDate()+1).toString(),
      m = (date.getMonth() + 1).toString(),//(date.getUTCMonth() + 1).toString(),
      y = date.getFullYear().toString(), // date.getUTCFullYear().toString(),
      formatted = '',
      otherDate = date.getDate();
    // debugger
    if (d.length === 1) {
      d = '0' + d;
    }
    if (m.length === 1) {
      m = '0' + m;
    }
    formatted = y + '-' + m + '-' + d;
    // debugger
    // setMount(mount+1)
    return formatted;
  }


  function showPassword(field, shower, showState) {
    if (field.current.type === "password") {
      shower({ ...showState, [field.current.id]: "text" })
    } else if (field.current.type === "text") {
      shower({ ...showState, [field.current.id]: "password" })
    }
  }

  if (router.pathname === "/" || router.pathname === "/change-password" || router.pathname === "/success" || router.pathname === "/reset-password") {
    return (
      <LoginLayout>
        <Component
          {...pageProps}
          isLoading={isLoading}
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
          isClicked={isClicked}
          changePasswordError={changePasswordError}
          passwordChangeError={passwordChangeError}
        />
      </LoginLayout>
    )
  }


  return (

    <LayoutAuthed
      reformatDate={reformatDate}
      downloadData={downloadData}
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
      search={search}
      setSearch={setSearch}
      formatDate={formatDate}
      resetSearchParams={resetSearchParams}
      agentFormAction={agentFormAction}
      headers={headers}
      currentData={currentData}
    >
      <Layout
        reformatDate={reformatDate}
        downloadData={downloadData}
        modals={modals}
        activeTab={activeTab}
        setDateSearchRange={setDateSearchRange}
        agentFormAction={agentFormAction}
        setActiveTab={setTab}
        activeAgency={activeDashboard}
        setView={setView}
        viewState={viewState}
        activeState={activeState}
        dateRange={dateRange}
        week={week}
        setDateRange={setDateRange}
        search={search}
        setSearch={setSearch}
        setSearchParam={setSearchParam}
        searchField={searchField}
        formatDate={formatDate}
        resetSearchParams={resetSearchParams}
        changeCreateView={changeCreateView}
        getPreviousDay={getPreviousDay}
        setRangeParam={setRangeParam}
        headers={headers}
        currentData={currentData}
      >
        <Component
          reformatDate={reformatDate}
          downloadData={downloadData}
          login={login}
          agentFormAction={agentFormAction}
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
          resetPage={resetPage}
          dateRange={dateRange}
          week={week}
          setDateRange={setDateRange}
          search={search}
          setSearch={setSearch}
          formatDate={formatDate}
          searchField={searchField}
          resetSearchParams={resetSearchParams}
          setSearchParam={setSearchParam}
          initialCustomerForm={initialCustomerForm}
          createView={createView}
          changeCreateView={changeCreateView}
          day={day}
          resetDay={resetDay}
          rangeParam={rangeParam}
          handleCurrentData={handleCurrentData}
        />
      </Layout>
    </LayoutAuthed>
  )
}

const EmptyLayout = ({ children }) => <>{children}</>
