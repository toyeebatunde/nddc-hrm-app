
import UserButton from "./ButtonMaker"
import ImageHolder from "./ImageHolder"
import Textfield from "./TextField"
import { useRef, useState, useEffect } from "react"
import { editApi, deleteApi } from "./Endpoints"
import apiToken from "./Token"
import { useRouter } from "next/router"


export default function Modal({ modal, closeModal, values, formFields, setFormFields, formEdit, modalSuccessNotify, modalCloser, setLoading}) {
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
                        <ImageHolder id="closer" onClick={(e)=>{modalCloser(false, "addSplit")}} src="/icons/close-modal.svg" />
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
                            <Textfield name="actorType" formEdit={formEdit} value={values.values.actorType} type="text" title="Actor Type" />
                        </div>
                    </section>

                    <section className="flex justify-between mt-[15px] w-[90%] self-center relative w-full">
                        <div className="w-[126px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton text="Cancel" onClick={(e)=>{modalCloser(false, "addSplit")}} />
                        </div>
                        <div className="w-[186px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton onClick={(e)=> {
                                editApi(
                                    e,
                                    `https://admapis-staging.payrail.co/v1/charge/${values.id}/add_split`,
                                    {
                                        "actorType" : values.values.actorType,
                                        "amount" : values.values.value
                                    },
                                    localStorage.getItem('token'),
                                    modalCloser,
                                    "addSplit",
                                    setLoading
                                )
                            }} text="Save" type="gradient" />
                        </div>
                    </section>
                </form>
            </section>
        )
    }
    if (modal.action) {
        return (
            <div className={`w-[350px] lg:rounded-[48px] lg:w-[529px] flex flex-col items-center min-h-[533px] bg-white rounded-[15px]`}>
                <div className="w-[133px] mt-[15px] h-[133px] flex justify-center items-center rounded-[50%] bg-[#F5F5F5]">
                    <div className="w-[60px] h-[60px] relative">
                        <ImageHolder src={values.values.action == "delete" ? "/icons/bin.svg" : values.values.action == "decline" ? "/icons/remove-circle.svg" : "/icons/check-circle.svg"} />
                    </div>
                </div>
                <h2 className="w-[136px] h-[36px] font-pushpennyMedium text-[28px] font-[700]">Heads Up!</h2>
                <h2 className="text-[18px] text-[#6E7883] leading-[23px] mt-[10px] lg:w-[433px] lg:h-[57px] lg:text-center text-center font-pushpennyMedium">
                    {values.values.caution}
                </h2>
                <div className="w-[330px] lg:w-[378px] mt-[20px] h-[80px] rounded-[15px] lg:rounded-[28px] relative bg-[#F3F3F3]">
                    <h2 className="absolute font-pushpennyMedium ml-[15px] text-[10px] top-[-7px] h-[13px] text-[#6E7883] bg-[#F3F3F3] px-[3px]">Reason for action</h2>
                    <textarea className="h-full w-full rounded-[15px] lg:rounded-[28px] bg-[#F3F3F3] h-[76px] lg: w-[full] outline-none px-[10px] py-[10px] w-full"></textarea>
                </div>
                <div className="mt-[30px] w-[330px] lg:w-[370px] flex justify-between">
                    <div className='w-[126px] h-[46px] border rounded-[28px] border-[#777777]'>
                        <UserButton text="Cancel" onClick={(e)=>{modalCloser(false, "action")}} />
                    </div>
                    <div className='w-[126px] h-[46px]'>
                        <UserButton onClick={(e)=>{deleteApi(e,values.values.endpoint, localStorage.getItem('token'), modalCloser)}} text="Delete" type="gradient" />
                    </div>
                </div>
            </div>
        )
    }

    if (modal.teamModal) {
        return (
            <section className={`w-[350px] lg:rounded-[48px] lg:w-[654px] py-[20px] px-[20px] flex flex-col items-center min-h-[634px] bg-white rounded-[15px]`}>
                <section className="flex w-[95%] lg:w-[70%] lg:mr-[40px] lg:self-end justify-between">
                    <p className="font-pushpennyBold font-700 text-[28px] leading-[36.46px]">Invite a team mate</p>
                    <button className="w-[40px] h-[40px] relative cursor-pointer">
                        <ImageHolder id="closer" onClick={(e) => { closeModal(e) }} src="/icons/close-modal.svg" />
                    </button>
                </section>
                <p className="font-pushpennyBook font-[700] text-[12px] md:text-[18px] leading-[26px]">Send an invitation to join your company’s Payrail account</p>
                <form className="flex flex-col justify-between w-full mt-[10px] min-h-[333px]">
                    <section className="flex  flex-col lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-[90%] lg:w-[232px] h-[62px] relative rounded-[28.5px]">
                            <Textfield type="text" title="First Name" />
                        </div>
                        <div className="flex items-center justify-center w-[90%] lg:w-[232px] h-[62px] relative rounded-[28.5px]">
                            <Textfield type="text" title="Last Name" />
                        </div>
                    </section>
                    <section className="flex  flex-col mt-[20px] lg:mt-0 lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield type="text" title="Email" />
                        </div>
                    </section>
                    <section className="flex flex-col mt-[20px] lg:mt-0 lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield type="text" title="Assign Role" />
                        </div>
                    </section>

                    <section className="flex justify-between mt-[15px] w-[90%] self-center relative w-full">
                        <div className="w-[126px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton text="Cancel" />
                        </div>
                        <div className="w-[186px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton text="Send Invitations" type="gradient" />
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
                    <button className="w-[40px] h-[40px] relative cursor-pointer">
                        <ImageHolder id="closer" onClick={(e) => { closeModal(e) }} src="/icons/close-modal.svg" />
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
                            <Textfield type="text" title="Charge Type" name="chargeType" formEdit={formEdit} value={values.values.chargeType || ""} bg="bg-[#FBF4EB]" />
                        </div>
                    </section>
                    <section className="flex flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield charType="number" type="text" title="Fee" name="value" formEdit={formEdit} value={values.values.value || ""} bg="bg-[#FBF4EB]" />
                        </div>
                    </section>

                    <section className="flex justify-between mt-[15px] w-[90%] self-center relative w-full">
                        <div className="w-[126px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton text="Cancel" textColor="text-black" onClick={(e)=>{modalCloser(false, "editCharges")}}/>
                        </div>
                        <div className="w-[186px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton onClick={(e) => {
                                editApi(
                                    e,
                                    `https://admapis-staging.payrail.co/v1/charge/update/${values.id}`,
                                    {
                                        "amount": values.values.value,
                                        "chargeType": values.values.chargeType,
                                        "lowerBound": values.values.lowerBound,
                                        "transactionType": values.values.transactionType,
                                        "upperBound": values.values.upperBound
                                    },
                                    localStorage.getItem('token'),
                                    modalCloser,
                                    "editSetting",
                                    setLoading
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
                    <button onClick={(e)=>{modalCloser(false, "posModalAdd")}} className="w-[40px] h-[40px] relative cursor-pointer">
                        <ImageHolder id="closer"  src="/icons/close-modal.svg" />
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
                            <UserButton text="Cancel" textColor="text-black" onClick={(e)=>{modalCloser(false, "posModalAdd")}}/>
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
                    <button onClick={(e)=>{modalCloser(false, "posModalAssign")}} className="w-[40px] h-[40px] relative cursor-pointer">
                        <ImageHolder id="closer"  src="/icons/close-modal.svg" />
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
                            <Textfield type="text"  title="POS Terminal" name="posTerminalType" formEdit={formEdit} value={values.values.posTerminal || ""} bg="bg-[#FBF4EB]" />
                        </div>
                    </section>
                 

                    <section className="flex justify-between mt-[15px] w-[90%] self-center relative w-full">
                        <div className="w-[126px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton text="Cancel" textColor="text-black" onClick={(e)=>{modalCloser(false, "posModalAssign")}}/>
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
                    <p className="font-pushpennyBold font-700 text-[28px] leading-[36.46px]">Edit Setting. <span className="text-[#6E7883] text-[15px] lg:text-[26px] font-[500]">{values.values.name}</span></p>
                    <button onClick={(e) => {closeModal(e)}} className="w-[40px] h-[40px] relative cursor-pointer">
                        <ImageHolder id="closer" src="/icons/close-modal.svg"  />
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
                            <UserButton onClick={(e)=>{modalCloser(false, "editSetting")}}  text="Cancel" textColor="text-black" />
                        </div>
                        <div className="w-[186px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton onClick={(e) => {
                                editApi(
                                    e,
                                    `https://admapis-staging.payrail.co/v1/setting/${values.id}/update`,
                                    {
                                        "value": values.values.value || "n/a",
                                        "type": values.values.type || "n/a",
                                        "description": values.values.description || "n/a",
                                        "name": values.values.name || "n/a"
                                    },
                                    localStorage.getItem('token'),
                                    modalCloser,
                                    "editSetting",
                                    setLoading
                                )

                            }} text="Save" type="gradient" />
                        </div>
                    </section>
                </form>
            </section>
        )
    }
}