
import SubLayoutTemplate from "../../../../components/ConfigLayoutTemplate"
import ImageHolder from "../../../../components/ImageHolder"
import { useEffect, useState } from "react"
import UserButton from "../../../../components/ButtonMaker"
import Textfield from "../../../../components/TextField"
import axios from 'axios'
import useSWR, { mutate } from 'swr'
import { ngrok, testEnv, deleteApi } from "../../../../components/Endpoints"
import TableContainer from "../../../../components/TableContainer"

export default function Authentication({ modals, setToken, setActiveDashboard, setActiveState, activeTab, setModalState, getModalButtonRef, closeModals, editFormState, entryValue, pageSelector, setActiveTab }) {
    const initialAuthEdit = { code: "", description: "", type: "" }
    const [editAuth, setEditAuth] = useState(initialAuthEdit)
    const [view, setView] = useState(false)
    const [authData, setAuthData] = useState()
    const [codeCategories, setCodeCategories] = useState()
    const [codeCategoryNames, setCodeCategoryNames] = useState(["", ""])
    const [reload, setReload] = useState(true)
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const poster = (url, body) => axios.post(url, body, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data: auths, error: authError } = useSWR(`${testEnv}v1/code/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const { data: codeCats, error: codeCatError } = useSWR(`${testEnv}v1/code/category/all?pageNo=0&pageSize=10`, fetching)

    const deleteCaution = "You are about to delete a charge, note after deleting it will go through approval process"


    useEffect(() => {
        setActiveTab("Authentication")
        setToken()
        setActiveDashboard("Configurations")
        setActiveState("1")
        if (auths) {
            setAuthData(auths)
            // console.log(codeCats)
        }
        if (codeCats) {
            setCodeCategories(codeCats)
            const catList = codeCats?.data.map(item => item.name)
            setCodeCategoryNames(catList)
        }

    }, [auths, codeCats])

    useEffect(()=>{
        mutate(`${testEnv}v1/code/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`)
        mutate(`${testEnv}v1/code/category/all?pageNo=0&pageSize=10`)
    }, [reload])

    function triggerReload() {
        setReload(!reload)
    }

    

    function onChange(e) {
        setEditAuth({ ...editAuth, [e.target.name]: e.target.value })
    }

    function changeView(e, id) {
        e.preventDefault()
        if (view) {
            setEditAuth(initialAuthEdit)
            setView(false)
            return
        }
        setView(true)
        const currentView = authData.data.filter(auth => auth.id === id)
        setEditAuth({ ...editAuth, code: currentView[0].code, type: currentView[0].type, description: currentView[0].description })
    }

    function authEdit(modalState, modal, fields, id) {
        setModalState(modalState, modal)
        editFormState(fields, id)
    }




    return (
        <div className="">
            <section className={`px-[40px] mdxl:px-[10px] pt-2 pb-2 w-fit md:w-full mt-8 h-fit lg:h-[61px] ${view ? "hidden" : "flex"} flex-col mdxl:flex-row justify-between items-center rounded-[48px] bg-[#F3F3F3] md:pr-[60px]`}>
                <section className="w-[354px] h-[40px] bg-white rounded-[20px] px-2 relative flex items-center justify-between">
                    <input className="search-tab rounded-[20px] w-[80%]" placeholder="Search member" />
                    <div className="w-[28px] h-[28px] relative">
                        <ImageHolder src="/icons/search-icon.svg" />
                    </div>
                </section>
                <section className="flex w-[354px] mt-4 mdxl:mt-0 justify-between">
                    <button ref={getModalButtonRef}
                        onClick={() => { authEdit(true, "authModal", { name: "", description: "" }, "0") }}
                        className="flex font-pushpennyMedium font-500 text-[18px] leading-[23.44px] grow lg:w-[216px] h-[35px] rounded-[20px] items-center justify-center bg-gradient-to-r text-[#ffffff] from-[#EF6B25] to-[#F6BC18]">+ Add new authentication</button>
                </section>

            </section>
            <section className={`py-2 w-full mt-[20px] px-4 ${modals.isOpen ? "blur-sm" : "blur-none"} ${view ? "hidden" : "block"}`}>
                <section className="min-h-[674px] w-full  pt-4 pl-2 pr-4">

                    <TableContainer pageSelector={pageSelector} entryValue={entryValue}>
                        <table className="table-fixed w-full">
                            <thead>
                                <tr className="">
                                    <th className="font-400 text-start  w-[228px]  text-[12px] leading-[15.62px] font-pushpennyBook">AUTHENTICATION</th>
                                    <th className="font-400 text-start  w-[227px]  text-[12px] leading-[15.62px] font-pushpennyBook">DESCRIPTION</th>
                                    <th className="font-400  text-start w-[206px]  text-[12px] leading-[15.62px] font-pushpennyBook">CATEGORY</th>
                                    <th className="font-400 text-start  w-[223px]  text-[12px] leading-[15.62px] font-pushpennyBook">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6">
                                {authData?.data.map((item, index) => {
                                    return (
                                        <tr key={index} className=" h-[50px]">
                                            <td className="font-pushpennyBook    font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.code}</td>
                                            <td className="font-pushpennyBook    font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.description}</td>
                                            <td className="font-pushpennyBook    font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.type}</td>
                                            <td className="font-pushpennyBook  flex  justify-start">
                                                <div className="w-[107px] h-[36px]">
                                                    <UserButton type="edit" onClick={(e) => { changeView(e, item.id) }} />
                                                </div>
                                                <div className="w-[130px] h-[36px]">
                                                    <UserButton type="delete" onClick={() => { authEdit(true, "action", { caution: deleteCaution, action: "delete", endpoint: `https://admapis-staging.payrail.co/v1/charge/${item.id}/delete` }, item.id) }} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>

                    </TableContainer>
                </section>
            </section>
            <section className={`py-2 w-full h-fit mt-[20px] flex-col lg:justify-between px-4 ${view ? "flex" : "hidden"}`}>
                <button className="lg:w-fit" onClick={changeView}>Back</button>
                <div className="w-full flex flex-col lg:flex-row">
                    <div className="w-full lg:w-[48%] min-h-[538px] flex flex-col  px-4 py-6">

                        <div className="w-full  rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#DDDDDD] pl-[30px] pr-[13px] ">
                            <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Edit Authentication Type</h2>
                        </div>


                        <form className="flex bg-brand-light-yellow py-4 rounded-[10px] flex-col justify-between w-full mt-[10px] min-h-[333px]">

                            <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                                <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                                    <Textfield name="type" value={editAuth.type} formEdit={onChange} type="select" selectOptions={codeCategoryNames} title="Type" bg="bg-white" />
                                </div>
                            </section>
                            <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                                <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                                    <Textfield type="text" title="Question" name="code" value={editAuth.code} formEdit={onChange} bg="bg-white" />
                                </div>
                            </section>
                            <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                                <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                                    <Textfield type="text" title="Description" name="description" value={editAuth.description} formEdit={onChange} bg="bg-white" />
                                </div>
                            </section>



                            <section className="flex justify-between mt-[15px] w-[90%] self-center relative w-full">
                                <div className="w-[126px] h-[47px] lg:w-[186px] lg:h-[57px]">
                                    <UserButton onClick={(e) => { changeView(e) }} text="Cancel" bg="bg-[#DDDDDD]" textColor="text-[white]" />
                                </div>
                                
                                <div className="w-[126px] h-[47px] lg:w-[186px] lg:h-[57px]">
                                    <UserButton text="Save" type="gradient" />
                                </div>

                            </section>
                        </form>
                    </div>

                    <div className="w-full lg:w-[48%] h-fit gap-[10px] flex flex-col px-4 py-6">

                        <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                            <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Authentication Categories</h2>
                            <div className="w-[134px] h-[35px]">
                                <UserButton
                                    // onClick={() => { authEdit(true, "action", { caution: "Ensure the name of category suites what you want achieve", action: "delete", endpoint: `https://admapis-staging.payrail.co/v1/code/category/create` }, 0) }}
                                    onClick={() => { authEdit(true, "authModal", { name: "", description: "", trigger: triggerReload }, "0") }}
                                    type="gradient" text="+Add New"
                                />
                            </div>
                        </div>

                        <div className="grow w-full justify-around bg-brand-light-yellow rounded-[10px] p-[20px] flex flex-col">
                            <h2 className="font-pushpennyBook text-[12px] font-[400] leading-[14px] text-[#6E7883]">
                                All authentications must fall under a category, if none is available please create one
                            </h2>

                            <table className="table-fixed mt-[20px] w-full">
                                <thead>
                                    <tr className="border-b border-white h-[52px]">
                                        <th className="font-400 w-[167px] text-[12px] text-left leading-[15.62px] font-pushpennyBook">AUTHENTICATION</th>
                                        <th className="font-400 w-[60px] text-[12px] leading-[15.62px]  font-pushpennyBook">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {codeCategories?.data.map((cat, index) => {
                                        return (
                                            <tr key={index} className=" h-[72px] border-b border-[#dddddd] ">
                                                <td className="font-pushpennyBook   w-[167px] font-400  text-[18px] leading-[14px] text-[#6E7883]">{cat.name}</td>
                                                <td className="font-pushpennyBook  w-[60px] h-[36px]  font-400 text-[18px] leading-[14px] text-[#6E7883]">
                                                    <div className="w-[70%] ml-[20px] h-[36px]">
                                                        <UserButton
                                                            onClick={() => {
                                                                authEdit(true, "action", {
                                                                    caution: "You are about to delete an authentication category, note after deleting it will go through approval process",
                                                                    action: "delete",
                                                                    endPoint: `https://admapis-staging.payrail.co/v1/code/category/${cat.id}/delete`,
                                                                    text: "Delete",
                                                                    onClick: deleteApi,
                                                                    trigger: triggerReload
                                                                },
                                                                    cat.id)
                                                            }}
                                                            type="delete"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}



Authentication.Layout = SubLayoutTemplate