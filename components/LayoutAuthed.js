
import ImageHolder from "../components/ImageHolder"
import { tabs } from "../components/Tabs"
import SideTabs from "../components/SideTabs"
import SingleTab from "./SingleTab"
import { useEffect, useState, useRef } from "react"
import Modal from "./Modal"
import Textfield from "./TextField"
import UserButton from "./ButtonMaker"
import { useRouter } from "next/router"
import jwt from 'jsonwebtoken'




export default function Dashboard({ children, modals, setModalState, setActiveDashboard, activeDashboard, activeState, switchActive, switchBoard, closeModals, token, editForm, setEditForm, formEdit, modalSuccessNotify, isLoading, setLoading, logout, userPermissions }) {
    const [isFull, setIsFull] = useState()
    const [permissions, setPermissions] = useState()
    // const [menuChange, setMenuChange] = useState()
    const [edgeFunction, setEdgeFunction] = useState(false)
    const bodyRef = useRef()
    const sideBarMargin = isFull ? "-ml-[255px]" : "ml-[0]"
    const router = useRouter()

    const dateFormatter = (stamp) => {
        const date = new Date(stamp)
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes()
    }

    
    
    useEffect(() => {
        const today = new Date()
        const exp = jwt.decode(localStorage.getItem("token")).exp
        // debugger
        if(exp < (new Date().getTime() + 1) / 1000) {
            const expValue = exp < (new Date().getTime() + 1) / 1000
            // debugger
            router.push("/")
            logout()        
            return
        }
        setPermissions((JSON.parse(localStorage.getItem("user")).permissions))
        
        window.innerWidth < 1025 ? setIsFull(true) : setIsFull(false)
        function logWindow() {
            window.innerWidth < 1025 ? setIsFull(true) : setIsFull(false)
        }
        window.addEventListener('resize', logWindow)

        return function unlog() {
            window.removeEventListener('resize', logWindow)
        }
    }, [children])

    function openSideBar() {
        if (window.innerWidth > 1024) {
            return
        }
        setIsFull(false)
    }

    function closeSideBar() {
        if (window.innerWidth >= 1025) {
            return
        }

        setIsFull(true)
    }

    function closeModal(e) {
        if (edgeFunction) {
            return
        }
        if (e.target.id == "modalLayer") {
            closeModals()
            return
        }
        if (e.target.id == "img") {
            closeModals()
            return
        }

    }

    function closeEdge(edgeState) {
        setEdgeFunction(edgeState)
    }

    return (
        <div className={`w-full h-screen border flex overflow-hidden justify-between`}>
            <div className={`bg-[#ffffff] ${modals.isOpen ? "flex" : "hidden"} left-[50%] ml-[-175px] lg:ml-[-327px] top-[70px]  rounded-[15px] lg:rounded-[48px] z-[200] fixed w-fit h-fit`}>
                <Modal
                    modal={modals}
                    closeModal={closeModal}
                    values={editForm}
                    setFormFields={setEditForm}
                    formEdit={formEdit}
                    modalSuccessNotify={modalSuccessNotify}
                    modalCloser={setModalState}
                    setLoading={setLoading}
                    closeEdge={closeEdge}
                />
            </div>
            <div className={`absolute z-[200] ${isLoading ? "flex" : "hidden"} w-[100px] h-[100px] left-[50%] ml-[-50px] top-[50%] mt-[-50px] items-center justify-center`}>
                <div className={`lds-ring`}>
                    <div></div><div></div><div></div><div></div>
                </div>
            </div>
            <div id="modalLayer" onClick={(e) => { closeModal(e) }} className={`w-full h-full bg-[#000000] opacity-[0.5] ${modals.isOpen ? "flex" : isLoading ? "flex" : "hidden"} fixed justify-center  items-center top-0 z-[150]`}>
            </div>


            <div onClick={openSideBar} className={`${token ? "fixed" : "hidden"} left-[10px] cursor-pointer lg:left-[50px] z-[158]`}>
                <div className="relative side-bar mt-[46px] w-[40px] h-[40px] lg:w-[66.32px] lg:h-[66.32px]">
                    <ImageHolder src="/icons/payrail-logo-circle.svg" />
                </div>
            </div>
            <div onClick={openSideBar} className={`w-[45px] ${token ? "fixed" : "hidden"} ${isFull ? "ml-0" : "-ml-[46px]"} h-screen sticky top-0 bg-[#FAFBFC] block z-[90] pl-[10px] relative`}>
                <div className="mt-[150px] w-fit sticky top-[140px]">
                    <div className={`${isFull ? "block" : "hidden"} cursor-pointer relative w-[24px] h-[24px]`}>
                        <ImageHolder src="/icons/chevron-right-2.svg" />
                    </div>
                </div>
            </div>
            <div onMouseLeave={closeSideBar} className={`flex z-[157] ${token ? "fixed" : "hidden"} ${sideBarMargin} borde transition-all linear h-screen duration-[0.3s] w-[255px] bg-[#FAFBFC] flex-col fixed lg:relative top-0 pl-[50px] ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <ul className="flex flex-col w-[197px] sticky top-[90px] mt-[150px]  h-screen pb-2">
                    {tabs.map((tab, index) => {
                        if (index == 1) {
                            let newSubs = tab.subTexts.filter((sub, index) => {
                                if (permissions?.includes(sub.permission)) {
                                    return sub
                                }
                            })
                            if (newSubs.length === 0) {
                                return
                            }
                            return <SideTabs key={index} dataSet={tab.data} text={tab.text} subTexts={newSubs} height={`hover:h-${tab[newSubs.length]}`} full={`h-${tab[newSubs.length]}`} activeDashboard={activeDashboard} setActiveDashboard={setActiveDashboard} switchBoard={switchBoard} switchActive={switchActive} activeState={activeState} closeSideBar={closeSideBar} />
                        }

                        if (index == 2) {
                            let newSubs = (tab.subTexts.map((sub, index) => {
                                if (permissions?.includes(sub.permission[0])) {
                                    return sub
                                }
                                if (permissions?.includes(sub.permission[1])) {
                                    return sub
                                }
                            })) 
                            let filteredSubs = newSubs.filter(sub => sub != undefined)
                            if (filteredSubs.length == 0) {
                                return
                            }
                            console.log(newSubs.length.toString())
                            const newHeight = newSubs.length.toString()                              
                            return <SideTabs key={index} dataSet={tab.data} text={tab.text} subTexts={filteredSubs} height={`hover:h-${tab[newSubs.length]}`} full={`h-${tab[newSubs.length]}`} activeDashboard={activeDashboard} setActiveDashboard={setActiveDashboard} switchBoard={switchBoard} switchActive={switchActive} activeState={activeState} closeSideBar={closeSideBar} />
                        }
                        // if (index == 3) {
                        //     let newSubs = (tab.subTexts.map((sub, index) => {
                        //         if (permissions?.includes(sub.permission[0])) {
                        //             return sub
                        //         }
                        //         if (permissions?.includes(sub.permission[1])) {
                        //             return sub
                        //         }
                        //     }))
                          
                        //     let filteredSubs = newSubs.filter(sub => sub != undefined)
                        //     if (filteredSubs.length == 0) {
                        //         return
                        //     }
                        //     // console.log(filteredSubs.length)                              
                        //     return <SideTabs key={index} dataSet={tab.data} text={tab.text} subTexts={filteredSubs} height={`hover:h-${tab[newSubs.length]}`} full={`h-${tab[newSubs.length]}`} activeDashboard={activeDashboard} setActiveDashboard={setActiveDashboard} switchBoard={switchBoard} switchActive={switchActive} activeState={activeState} closeSideBar={closeSideBar} />
                        // }
                        // if (index == 4) {
                        //     let newSubs = (tab.subTexts.map((sub, index) => {
                        //         if (permissions?.includes(sub.permission[0])) {
                        //             return sub
                        //         }
                        //         if (permissions?.includes(sub.permission[1])) {
                        //             return sub
                        //         }
                        //     }))
                        //     //     let newerSubs = (tab.subTexts.filter((sub, index) => {
                        //     //         if(permissions?.includes(sub.permission[0]))  {
                        //     //             return sub
                        //     //         }                              
                        //     //     }) )   
                        //     //     let newerSubsToo = (tab.subTexts.filter((sub, index) => {
                        //     //         if(permissions?.includes(sub.permission[1]))  {
                        //     //             return sub
                        //     //         }                              
                        //     //     }) )   

                        //     //     let mergedNewSubs = newerSubs.concat(newerSubsToo)
                        //     //    let filteredMerge = mergedNewSubs.filter((currentValue, currentIndex) => mergedNewSubs.indexOf(currentValue) !== currentIndex)

                        //     //    let finalSubs = filteredMerge.length > 0 ? filteredMerge : mergedNewSubs

                        //     //     console.log(newerSubs)  
                        //     //     console.log(newerSubsToo)  
                        //     //     console.log(mergedNewSubs)  
                        //     //     console.log("fm:",filteredMerge)  
                        //     //     console.log("fs:",finalSubs)  
                        //     // console.log(newSubs)  
                        //     let filteredSubs = newSubs.filter(sub => sub != undefined)
                        //     if (filteredSubs.length == 0) {
                        //         return
                        //     }
                        //     // console.log(filteredSubs.length)                              
                        //     return <SideTabs key={index} dataSet={tab.data} text={tab.text} subTexts={filteredSubs} height={`hover:h-${tab[newSubs.length]}`} full={`h-${tab[newSubs.length]}`} activeDashboard={activeDashboard} setActiveDashboard={setActiveDashboard} switchBoard={switchBoard} switchActive={switchActive} activeState={activeState} closeSideBar={closeSideBar} />
                        // }

                        return <SideTabs key={index} dataSet={tab.data} text={tab.text} subTexts={tab.subTexts} height={tab.height} full={tab.full} activeDashboard={activeDashboard} setActiveDashboard={setActiveDashboard} switchBoard={switchBoard} switchActive={switchActive} activeState={activeState} closeSideBar={closeSideBar} />
                    })}
                </ul>
                <div className=" flex w-full z-[260] bg-[#FAFBFC] relative left-0 bottom-[5px] h-[50px] justify-around">
                    <div className="w-[50px] h-[50px] border border-[#dddddd] rounded-[50%]"></div>
                    <button onClick={logout} className="flex flex-col">
                        Logout
                        <br />
                        <div className="font-[400] text-[12px] leading-[15.62px] font-pushPennyBook text-brand-yellow">
                            Change Password</div>
                    </button>
                </div>
            </div>
            <div className="grow lg:w-[70%] overflow-auto lg:h-screen pb-[50px]">
                {children}
            </div>
        </div>
    )
}