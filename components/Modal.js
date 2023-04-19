
import UserButton from "./ButtonMaker"
import ImageHolder from "./ImageHolder"
import Textfield from "./TextField"
import { useRef, useState, useEffect } from "react"
import { editApi, deleteApi, createApi, postApi } from "./Endpoints"
import apiToken from "./Token"
import { useRouter } from "next/router"


export default function Modal({ modal, closeModal, values, formFields, setFormFields, formEdit, modalSuccessNotify, modalCloser, setLoading, closeEdge }) {
    const router = useRouter()

    const chargeSelectOptions = [
        "TRANSFER",
        "WITHDRAWAL",
        "DEPOSIT",
        "BILL_PAYMENT",
        "ACCOUNT_OPENING",
        "CABLE_TV",
        "DATA_RECHARGE",
        "ELECTRICITY_RECHARGE",
        "AIRTIME_RECHARGE",
        "PAYRAIL_DEPOSIT",
        "PAYRAIL_WITHDRAWAL",
        "VALUE_ADDED_SERVICES"
    ]

    const posOptions = [
        "GA Linux Terminal",
        "GA POS Android Terminal",
    ]



    if (modal.addSplit) {
        return (
            <section className={`w-[350px] lg:rounded-[48px] lg:w-[654px] py-[20px] px-[20px] flex flex-col items-center min-h-[634px] bg-white rounded-[15px]`}>
                <section className="flex w-[95%] lg:w-[70%] lg:mr-[40px] lg:self-end justify-between">
                    <p className="font-pushpennyBold font-700 text-[28px] leading-[36.46px]">Add Split</p>
                    <button className="w-[40px] h-[40px] relative cursor-pointer">
                        <ImageHolder id="closer" onClick={(e) => { modalCloser(false, "addSplit") }} src="/icons/close-modal.svg" />
                    </button>
                </section>
                <p className="font-pushpennyBook font-[700] text-[12px] md:text-[18px] leading-[26px]">
                    All splits are in percentage and within the range of 100
                </p>
                <form className="flex flex-col justify-around w-full mt-[10px] min-h-[333px]">

                    <section className="flex  flex-col lg:mt-0 lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield name="value" formEdit={formEdit} value={values.values.value} type="text" title="Value" />
                        </div>
                    </section>
                    <section className="flex flex-col lg:mt-0 lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield selectOptions={["Choose an actor type", "SUPER_AGENT", "AGENT", "PAYRAIL"]} name="actorType" formEdit={formEdit} value={values.values.actorType} type="select" title="Actor Type" />
                        </div>
                    </section>

                    <section className="flex justify-between mt-[15px] w-[90%] self-center relative w-full">
                        <div className="w-[126px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton text="Cancel" onClick={(e) => { modalCloser(false, "addSplit") }} />
                        </div>
                        <div className="w-[186px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton onClick={(e) => {
                                editApi(
                                    e,
                                    `https://admapis-staging.payrail.co/v1/charge/${values.id}/add_split`,
                                    {
                                        "actorType": values.values.actorType,
                                        "amount": values.values.value
                                    },
                                    localStorage.getItem('token'),
                                    modalCloser,
                                    setLoading,
                                    "addSplit",
                                    values.values.trigger
                                )
                            }} text="Save" type="gradient" />
                        </div>
                    </section>
                </form>
            </section>
        )
    }
    if (modal.authModal) {
        return (
            <section className={`w-[350px] lg:rounded-[48px] lg:w-[654px] py-[20px] px-[20px] flex flex-col items-center min-h-[434px] bg-white rounded-[15px]`}>
                <section className="flex w-[95%] lg:w-[70%] lg:mr-[40px] lg:self-end justify-between">
                    <p className="font-pushpennyBold font-700 text-[28px] leading-[36.46px]">Add Split</p>
                    <button onClick={(e) => { modalCloser(false, "authModal") }} className="w-[40px] h-[40px] relative cursor-pointer">
                        <ImageHolder id="closer" src="/icons/close-modal.svg" />
                    </button>
                </section>
                <p className="font-pushpennyBook font-[700] text-[12px] md:text-[18px] leading-[26px]">
                    Ensure the name of category suites what you want achieve
                </p>
                <form className="flex flex-col justify-around w-full mt-[10px] min-h-[333px]">

                    <section className="flex  flex-col lg:mt-0 lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield name="name" formEdit={formEdit} value={values.values.name} type="text" title="Authentication" />
                        </div>
                    </section>
                    <section className="flex flex-col lg:mt-0 lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield name="description" formEdit={formEdit} value={values.values.description} type="text" title="Description" />
                        </div>
                    </section>

                    <section className="flex justify-between mt-[15px] w-[90%] self-center relative w-full">
                        <div className="w-[126px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton text="Cancel" onClick={(e) => { modalCloser(false, "authModal") }} />
                        </div>
                        <div className="w-[186px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton onClick={(e) => {
                                postApi(
                                    e,
                                    `https://admapis-staging.payrail.co/v1/code/category/create`,
                                    {
                                        "name": values.values.name,
                                        "description": values.values.description
                                    },
                                    localStorage.getItem('token'),
                                    modalCloser,
                                    setLoading,
                                    "authModal",
                                    values.values.trigger,
                                    values.values.changeView
                                )
                                console.log("changed")
                            }} text="Save" type="gradient" />
                        </div>
                    </section>
                </form>
            </section>
        )
    }
    if (modal.imageView) {
        return (
            <section className={`w-[350px] lg:rounded-[48px] lg:w-[654px] py-[20px] px-[20px] flex flex-col items-center min-h-[434px] bg-white rounded-[15px]`}>
                <div className="w-[90%] h-[90%] relative rounded-[10px]">
                    <ImageHolder src={values.values.image} uop={true} />
                </div>
            </section>
        )
    }

    if (modal.action) {
        if (values.values.keyTwo == "status") {
            closeEdge(true)
        }
        return (
            <div className={`w-[350px] lg:rounded-[48px] lg:w-[529px] pb-[20px] flex flex-col items-center min-h-[403px] bg-white rounded-[15px]`}>
                <div className="w-[133px] mt-[15px] h-[133px] flex justify-center items-center rounded-[50%] bg-[#F5F5F5]">
                    <div className="w-[60px] h-[60px] relative">
                        <ImageHolder src={values.values.action == "delete" ? "/icons/bin.svg" : values.values.action == "decline" ? "/icons/remove-circle.svg" : "/icons/check-circle.svg"} />
                    </div>
                </div>
                <h2 className="w-[136px] h-[36px] font-pushpennyMedium text-[28px] font-[700]">Heads Up!</h2>
                <h2 className="text-[18px] text-[#6E7883] leading-[23px] mt-[10px] lg:w-[433px] lg:h-[57px] lg:text-center text-center font-pushpennyMedium">
                    {values.values.caution}
                </h2>
                <div className={`w-[330px] ${values.values.reason ? "" : "hidden"} lg:w-[378px] mt-[20px] h-[80px] rounded-[15px] lg:rounded-[28px] relative bg-[#F3F3F3]`}>
                    {/* <h2 className="absolute font-pushpennyMedium ml-[15px] text-[10px] top-[-7px] h-[13px] text-[#6E7883] bg-[#F3F3F3] px-[3px]">Reason for action</h2> */}
                    {/* <textarea className="h-full w-full rounded-[15px] lg:rounded-[28px] bg-[#F3F3F3] h-[76px] lg: w-[full] outline-none px-[10px] py-[10px] w-full"></textarea> */}
                    <Textfield name="reasontext" formEdit={formEdit} value={values.values.reasontext} type="textbox" />
                </div>
                <div className="mt-[30px] w-[330px] lg:w-[370px] flex justify-between">
                    <div className='w-[126px] h-[46px] border rounded-[28px] border-[#777777]'>
                        <UserButton text="Cancel" onClick={(e) => {
                            if (values.values.cancelClick) {
                                values.values.cancelClick(values.values.target, values.values.status, values.values.setter, values.values.keyOne, values.values.keyTwo, values.values.keyThree)
                                closeEdge(false)
                            }
                            modalCloser(false, "action")
                            closeEdge(false)
                        }} />
                    </div>
                    <div className={`${values.values.text == "Reset PASSWORD" ? "w-[190px]" : "w-[146px]"} h-[46px]`}>
                        <UserButton onClick={(e) => {
                            if (values.values.reason) {
                                values.values.onClick(e, values.values.endPoint, localStorage.getItem('token'), modalCloser, setLoading, "action", values.values.trigger, { "reason": values.values.reasontext })
                                closeEdge(false)
                                return
                            }
                            values.values.onClick(e, values.values.endPoint, localStorage.getItem('token'), modalCloser, setLoading, "action", values.values.trigger)
                            closeEdge(false)
                        }} text={values.values.text || values.values.action} type="gradient" />
                    </div>
                </div>
            </div>
        )
    }

    if (modal.teamModal) {
        return (
            <section className={`w-[350px] lg:rounded-[48px] lg:w-[654px] py-[20px] px-[20px] flex flex-col items-center min-h-[634px] bg-white rounded-[15px]`}>
                <section className="flex w-[95%] lg:w-[70%] lg:mr-[40px] lg:self-end justify-between">
                    <p className="font-pushpennyBold font-700 text-[28px] leading-[36.46px]">{values.values.heading || "Invite a team mate"}</p>
                    <button onClick={(e) => { modalCloser(false, "editCharges") }} className="w-[40px] h-[40px] relative cursor-pointer">
                        <ImageHolder id="closer" onClick={(e) => { closeModal(e) }} src="/icons/close-modal.svg" />
                    </button>
                </section>
                <p className="font-pushpennyBook font-[700] text-[12px] md:text-[18px] leading-[26px]">Send an invitation to join your company’s Payrail account</p>
                <form className="flex flex-col justify-between w-full mt-[10px] min-h-[333px]">
                    <section className="flex  flex-col lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-[90%] lg:w-[232px] h-[62px] relative rounded-[28.5px]">
                            <Textfield type={values.values.privileges ? "readonly" : "text"} formEdit={formEdit} value={values.values.firstName} title="First Name" name="firstName" />
                        </div>
                        <div className="flex items-center justify-center w-[90%] lg:w-[232px] h-[62px] relative rounded-[28.5px]">
                            <Textfield formEdit={formEdit} value={values.values.lastName} type={values.values.privileges ? "readonly" : "text"} title="Last Name" name="lastName" />
                        </div>
                    </section>
                    <section className={`${values.values.privileges ? "hidden" : "flex"}  flex-col mt-[20px] lg:mt-0 lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]`}>
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield formEdit={formEdit} value={values.values.email} type="text" title="Email" name="email" />
                        </div>
                    </section>
                    <section className="flex flex-col mt-[20px] lg:mt-0 lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield formEdit={formEdit} value={values.values.assignRole} type="select" selectOptions={values.values.selectOptions} title="Assign Role" name="assignRole" />
                        </div>
                    </section>

                    <section className="flex justify-between mt-[15px] w-[90%] self-center relative w-full">
                        <div className="w-[126px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton text={values.values.privileges ? "Delete user" : "Cancel"}
                                onClick={values.values.privileges ?
                                    (e) => {
                                        // console.log("not disabled")
                                        deleteApi(
                                            e,
                                            values.values.endPoint,
                                            localStorage.getItem('token'),
                                            modalCloser,
                                            setLoading,
                                            "teamModal",
                                            values.values.trigger
                                        )
                                    }
                                    : (e) => { modalCloser(false, "teamModal") }}
                            />
                        </div>
                        <div className="w-[186px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton disabled={values.values.firstName === "" || values.values.lastName === "" || values.values.assignRole === "" || values.values.assignRole == "Select a Role" || values.values.email === ""} text={values.values.privileges ? "Update Role" : "Send Invitation"} type="gradient"
                                onClick={values.values.privileges ?
                                    (e) => {
                                        console.log("no update endpoint")
                                    } :
                                    (e) => {
                                        // console.log("not disabled")
                                        postApi(
                                            e,
                                            values.values.endPoint,
                                            {
                                                "firstname": values.values.firstName,
                                                "lastname": values.values.lastName,
                                                "email": values.values.email,
                                                "role": values.values.assignRole,
                                            },
                                            localStorage.getItem('token'),
                                            modalCloser,
                                            setLoading,
                                            "teamModal",
                                            values.values.trigger
                                        )
                                    }
                                }
                            />
                        </div>
                    </section>
                </form>
            </section>
        )
    }

    if (modal.editCharges) {
        return (
            <section className={`w-[350px] lg:rounded-[48px] lg:w-[654px] py-[20px] px-[20px] flex flex-col items-center min-h-[634px] bg-white rounded-[15px]`}>
                <section className="flex w-[90%] lg:w-[80%] lg:mr-[40px] lg:self-end justify-between">
                    <p className="font-pushpennyBold font-700 text-[28px] leading-[36.46px]">Edit Charge. <span className="text-[#6E7883] text-[26px] font-[500]">{values.values.transactionType || ""}</span></p>
                    <button onClick={(e) => { modalCloser(false, "editCharges") }} className="w-[40px] h-[40px] relative cursor-pointer">
                        <ImageHolder id="closer" src="/icons/close-modal.svg" />
                    </button>
                </section>
                <p className="font-pushpennyBook font-[700] text-[12px] text-[#6E7883] md:text-[18px] leading-[26px]">Make your changes, note that the changes you made will be sent approval</p>
                <form className="flex flex-col justify-between w-full mt-[10px] min-h-[333px]">

                    <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield charType="number" type="text" title="Lower Bound" name="lowerBound" formEdit={formEdit} value={values.values.lowerBound || ""} bg="bg-[#FBF4EB]" />
                        </div>
                    </section>
                    <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield charType="number" type="text" title="Upper Bound" name="upperBound" formEdit={formEdit} value={values.values.upperBound || ""} bg="bg-[#FBF4EB]" />
                        </div>
                    </section>
                    <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield type="select" selectOptions={chargeSelectOptions} title="Transaction Type" name="transactionType" formEdit={formEdit} value={values.values.transactionType || ""} bg="bg-[#FBF4EB]" />
                        </div>
                    </section>
                    <section className="flex flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield type="select" selectOptions={["FLAT", "PERCENTAGE"]} title="Charge Type" name="chargeType" formEdit={formEdit} value={values.values.chargeType || ""} bg="bg-[#FBF4EB]" />
                        </div>
                    </section>
                    <section className="flex flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield charType="number" type="text" title="Fee" name="amount" formEdit={formEdit} value={values.values.amount || 0} bg="bg-[#FBF4EB]" />
                        </div>
                    </section>

                    <section className="flex justify-between mt-[15px] w-[90%] self-center relative w-full">
                        <div className="w-[126px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton text="Cancel" textColor="text-black" onClick={(e) => { modalCloser(false, "editCharges") }} />
                        </div>
                        <div className="w-[186px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton onClick={(e) => {
                                // debugger
                                editApi(
                                    e,
                                    `https://admapis-staging.payrail.co/v1/charge/update/${values.id}`,
                                    {
                                        "amount": Number(values.values.amount),
                                        "chargeType": values.values.chargeType,
                                        "lowerBound": Number(values.values.lowerBound),
                                        "transactionType": values.values.transactionType,
                                        "upperBound": Number(values.values.upperBound)
                                    },
                                    localStorage.getItem('token'),
                                    modalCloser,
                                    values.values.loadState,
                                    "editSetting",
                                    values.values.trigger
                                )
                            }}
                                text="Save" type="gradient" />
                        </div>
                    </section>
                </form>
            </section>
        )
    }
    if (modal.createCharges) {
        return (
            <section className={`w-[350px] lg:rounded-[48px] lg:w-[654px] py-[20px] px-[20px] flex flex-col items-center min-h-[634px] bg-white rounded-[15px]`}>
                <section className="flex w-[90%] lg:w-[80%] lg:mr-[40px] lg:self-end justify-between">
                    <p className="font-pushpennyBold font-700 text-[28px] leading-[36.46px]">Create Charges. <span className="text-[#6E7883] text-[26px] font-[500]">{values.values.transactionType || ""}</span></p>
                    <button onClick={(e) => { modalCloser(false, "createCharges") }} className="w-[40px] h-[40px] relative cursor-pointer">
                        <ImageHolder id="closer" src="/icons/close-modal.svg" />
                    </button>
                </section>
                <p className="font-pushpennyBook font-[700] text-[12px] text-[#6E7883] md:text-[18px] leading-[26px]">Make your changes, note that the changes you make will be sent for approval</p>
                <form className="flex flex-col justify-between w-full mt-[10px] min-h-[333px]">

                    <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield charType="number" type="text" title="Lower Bound" name="lowerBound" formEdit={formEdit} value={values.values.lowerBound || ""} bg="bg-[#FBF4EB]" />
                        </div>
                    </section>
                    <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield charType="number" type="text" title="Upper Bound" name="upperBound" formEdit={formEdit} value={values.values.upperBound || ""} bg="bg-[#FBF4EB]" />
                        </div>
                    </section>
                    <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield type="select" selectOptions={chargeSelectOptions} title="Transaction Type" name="transactionType" formEdit={formEdit} value={values.values.transactionType || ""} bg="bg-[#FBF4EB]" />
                        </div>
                    </section>
                    <section className="flex flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield type="select" selectOptions={["FLAT", "PERCENTAGE"]} title="Charge Type" name="chargeType" formEdit={formEdit} value={values.values.chargeType || ""} bg="bg-[#FBF4EB]" />
                        </div>
                    </section>
                    <section className="flex flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield charType="number" type="text" title="Fee" name="amount" formEdit={formEdit} value={values.values.amount || ""} bg="bg-[#FBF4EB]" />
                        </div>
                    </section>

                    <section className="flex justify-between mt-[15px] w-[90%] self-center relative w-full">
                        <div className="w-[126px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton text="Cancel" textColor="text-black" onClick={(e) => { modalCloser(false, "createCharges") }} />
                        </div>
                        <div className="w-[186px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton onClick={(e) => {
                                createApi(
                                    e,
                                    `https://admapis-staging.payrail.co/v1/charge/create`,
                                    {
                                        "amount": values.values.amount,
                                        "chargeType": values.values.chargeType,
                                        "lowerBound": values.values.lowerBound,
                                        "transactionType": values.values.transactionType,
                                        "upperBound": values.values.upperBound
                                    },
                                    localStorage.getItem('token'),
                                    modalCloser,
                                    setLoading,
                                    "createCharges",
                                    values.values.trigger
                                )
                            }}
                                text="Save" type="gradient" />
                        </div>
                    </section>
                </form>
            </section>
        )
    }

    if (modal.posModalAdd) {
        return (
            <section className={`w-[350px] lg:rounded-[48px] lg:w-[654px] py-[20px] px-[20px] flex flex-col items-center min-h-[500px] bg-white rounded-[15px]`}>
                <section className="flex w-[90%] lg:w-[80%] lg:mr-[40px] lg:self-end justify-between">
                    <p className="font-pushpennyBold font-700 text-[28px] leading-[36.46px]">{values.values.action} POS Terminal Inventory</p>
                    <button onClick={(e) => { modalCloser(false, "posModalAdd") }} className="w-[40px] h-[40px] relative cursor-pointer">
                        <ImageHolder id="closer" src="/icons/close-modal.svg" />
                    </button>
                </section>
                <p className="font-pushpennyBook font-[700] text-[12px] text-[#6E7883] md:text-[18px] leading-[26px]">Note that all changes are effected immediately</p>
                <form className="flex flex-col justify-between w-full mt-[10px] min-h-[333px]">

                    <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield type="text" title="Terminal ID" name="terminalId" formEdit={formEdit} value={values.values.terminalId || ""} bg="bg-[#FBF4EB]" />
                        </div>
                    </section>
                    <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield charType="text" type="text" title="Serial Number" name="serialNumber" formEdit={formEdit} value={values.values.serialNumber || ""} bg="bg-[#FBF4EB]" />
                        </div>
                    </section>
                    <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield type="select" selectOptions={posOptions} title="POS Terminal Type" name="posTerminalType" formEdit={formEdit} value={values.values.posTerminalType || ""} bg="bg-[#FBF4EB]" />
                        </div>
                    </section>


                    <section className="flex justify-between mt-[15px] w-[90%] self-center relative w-full">
                        <div className="w-[126px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton text="Cancel" textColor="text-black" onClick={(e) => { modalCloser(false, "posModalAdd") }} />
                        </div>
                        <div className="w-[186px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton onClick={(e) => {
                                // editApi(
                                //     e,
                                //     `https://admapis-staging.payrail.co/v1/charge/update/${values.id}`,
                                //     {
                                //         "amount": values.values.value,
                                //         "chargeType": values.values.chargeType,
                                //         "lowerBound": values.values.lowerBound,
                                //         "transactionType": values.values.transactionType,
                                //         "upperBound": values.values.upperBound
                                //     },
                                //     localStorage.getItem('token'),
                                //     modalCloser,
                                //     "posModalAdd",
                                //     setLoading
                                // )
                            }}
                                text={`${values.values.action == "Add" ? "Add" : "Edit"}`} type="gradient" />
                        </div>
                    </section>
                </form>
            </section>
        )
    }
    if (modal.posModalAssign) {
        return (
            <section className={`w-[350px] lg:rounded-[48px] lg:w-[654px] py-[20px] px-[20px] flex flex-col items-center min-h-[500px] bg-white rounded-[15px]`}>
                <section className="flex w-[90%] lg:w-[80%] lg:mr-[40px] lg:self-end justify-between">
                    <p className="font-pushpennyBold font-700 text-[28px] leading-[36.46px]">{values.values.action} POS Terminal Inventory</p>
                    <button onClick={(e) => { modalCloser(false, "posModalAssign") }} className="w-[40px] h-[40px] relative cursor-pointer">
                        <ImageHolder id="closer" src="/icons/close-modal.svg" />
                    </button>
                </section>
                <p className="font-pushpennyBook font-[700] text-[12px] text-[#6E7883] md:text-[18px] leading-[26px]">Note that all changes are effected immediately</p>
                <form className="flex flex-col justify-between w-full mt-[10px] min-h-[333px]">

                    <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield type="text" title="List of Agent ID" name="agentId" formEdit={formEdit} value={values.values.agentId || ""} bg="bg-[#FBF4EB]" />
                        </div>
                    </section>
                    <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield charType="number" type="text" title="Agent Name (Autofill)" name="agentName" formEdit={formEdit} value={values.values.agentName || ""} bg="bg-[#FBF4EB]" />
                        </div>
                    </section>
                    <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield type="text" title="POS Terminal" name="posTerminalType" formEdit={formEdit} value={values.values.posTerminal || ""} bg="bg-[#FBF4EB]" />
                        </div>
                    </section>


                    <section className="flex justify-between mt-[15px] w-[90%] self-center relative w-full">
                        <div className="w-[126px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton text="Cancel" textColor="text-black" onClick={(e) => { modalCloser(false, "posModalAssign") }} />
                        </div>
                        <div className="w-[186px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton onClick={(e) => {
                                // editApi(
                                //     e,
                                //     `https://admapis-staging.payrail.co/v1/charge/update/${values.id}`,
                                //     {
                                //         "amount": values.values.value,
                                //         "chargeType": values.values.chargeType,
                                //         "lowerBound": values.values.lowerBound,
                                //         "transactionType": values.values.transactionType,
                                //         "upperBound": values.values.upperBound
                                //     },
                                //     localStorage.getItem('token'),
                                //     modalCloser,
                                //     "posModalAdd",
                                //     setLoading
                                // )
                            }}
                                text={`${values.values.action == "Assign" ? "Assign" : "Retrieve"}`} type="gradient" />
                        </div>
                    </section>
                </form>
            </section>
        )
    }

    if (modal.editSetting) {
        return (
            <section className={`w-[350px] lg:rounded-[48px] lg:w-[654px] py-[20px] px-[20px] flex flex-col items-center min-h-[634px] bg-white rounded-[15px]`}>
                <section className="flex w-[90%] lg:w-[95%] justify-between">
                    <p className="font-pushpennyBold font-700 text-[28px] leading-[36.46px]">{values.values.title || "Edit Setting."} <span className="text-[#6E7883] text-[15px] lg:text-[26px] font-[500]">{values.values.name}</span></p>
                    <button onClick={(e) => { closeModal(e) }} className="w-[40px] h-[40px] relative cursor-pointer">
                        <ImageHolder id="closer" src="/icons/close-modal.svg" />
                    </button>
                </section>
                <p className="font-pushpennyBook font-[700] text-[12px] w-[95%] text-[#6E7883] md:text-[18px] leading-[26px]">Make your changes, note that the changes you make will be subject to approval</p>
                <form className="flex flex-col justify-between w-full mt-[10px] min-h-[333px]">

                    <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield charType="text" type="text" formEdit={formEdit} title="Name" value={values.values.name} name="name" bg="bg-[#FBF4EB]" />
                        </div>
                    </section>
                    <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield charType="text" type="text" formEdit={formEdit} title="Description" value={values.values.description} name="description" bg="bg-[#FBF4EB]" />
                        </div>
                    </section>
                    <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield type="select" title="Type of setting" selectOptions={["n/a"]} name="type" bg="bg-[#FBF4EB]" />
                        </div>
                    </section>
                    <section className="flex flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield charType="number" type="text" formEdit={formEdit} title="Value" name="value" value={values.values.value} bg="bg-[#FBF4EB]" />
                        </div>
                    </section>

                    <section className="flex justify-between mt-[15px] w-[90%] self-center relative w-full">
                        <div className="w-[126px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton onClick={(e) => { modalCloser(false, "editSetting") }} text="Cancel" textColor="text-black" />
                        </div>
                        <div className="w-[186px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton onClick={(e) => {
                                values.values.settingAction(
                                    e,
                                    values.values.action,
                                    editApi,
                                    createApi,
                                    values.values.endPoint,
                                    {
                                        "value": values.values.value || "n/a",
                                        "type": values.values.type || "n/a",
                                        "description": values.values.description || "n/a",
                                        "name": values.values.name || "n/a"
                                    },
                                    localStorage.getItem('token'),
                                    modalCloser,
                                    setLoading,
                                    "editSetting",
                                    values.values.trigger
                                )

                            }} text="Save" type="gradient" />
                        </div>
                    </section>
                </form>
            </section>
        )
    }
}