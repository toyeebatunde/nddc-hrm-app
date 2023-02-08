
import UserButton from "./ButtonMaker"
import ImageHolder from "./ImageHolder"
import Textfield from "./TextField"
import { useRef, useState, useEffect } from "react"
import { editApi } from "./Endpoints"
import apiToken from "./Token"
import { useRouter } from "next/router"


export default function Modal({ modal, closeModal, values, formFields, setFormFields, formEdit, modalSuccessNotify }) {
    const router = useRouter()

    const chargeSelectOptions= [
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



    if (modal.addSplit) {
        return (
            <section className={`w-[350px] lg:rounded-[48px] lg:w-[529px] py-[40px] flex flex-col items-center h-[472px] bg-white rounded-[15px]`}>
                <section className="flex w-[95%] lg:w-[70%] lg:mr-[40px] lg:self-end justify-between">
                    <p className="font-pushpennyBold font-700 text-[28px] leading-[36.46px]">Add Split</p>
                    <button className="w-[40px] h-[40px] relative cursor-pointer">
                        <ImageHolder id="closer" onClick={(e) => { closeModal(e) }} src="/icons/close-modal.svg" />
                    </button>
                </section>
                <p className="font-pushpennyBook font-[700] text-[12px] md:text-[18px] leading-[26px]">
                    All splits are in percentage and within the range of 100
                </p>
                <form className="flex flex-col justify-around w-full mt-[10px] min-h-[333px]">

                    <section className="flex  flex-col lg:mt-0 lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield type="text" title="Value" />
                        </div>
                    </section>
                    <section className="flex flex-col lg:mt-0 lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                        <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                            <Textfield type="text" title="Actor Type" />
                        </div>
                    </section>

                    <section className="flex justify-between mt-[15px] w-[90%] self-center relative w-full">
                        <div className="w-[126px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton text="Cancel" />
                        </div>
                        <div className="w-[186px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton text="Save" type="gradient" />
                        </div>
                    </section>
                </form>
            </section>
        )
    }
    if (modal.bankDelete) {
        return (
            <div id="modal" className="w-[350px] lg:rounded-[48px] lg:w-[529px] lg:h-[533px] flex flex-col justify-around items-center h-[500px] bg-white rounded-[15px]">
                <div className="w-[133px] h-[133px] flex justify-center items-center rounded-[50%] bg-[#F5F5F5]">
                    <div className="w-[60px] h-[60px] relative">
                        <ImageHolder src="/icons/bin.svg" />
                    </div>
                </div>
                <h2 className="w-[136px] h-[36px] font-pushpennyMedium text-[28px] font-[700]">Heads Up</h2>
                <h2 className="text-[18px] leading-[23px] mt-[10px] lg:w-[433px] lg:h-[57px] lg:text-center text-center font-pushpennyMedium">
                    You are about to delete an institution, note after deleting it will go through approval process
                </h2>
                <div className="w-[330px] mt-[20px] h-[80px] rounded-[15px] relative bg-[#F3F3F3]">
                    <h2 className="absolute font-pushpennyMedium ml-[15px] text-[10px] top-[-7px] h-[13px] bg-[#F3F3F3] px-[3px]">Reason for action</h2>
                    <textarea className="h-full w-full rounded-[15px] bg-[#F3F3F3] outline-none px-[10px] py-[10px] w-full"></textarea>
                </div>
                <div className="w-full mt-[30px] w-[330px] flex justify-between">
                    <div className='w-[126px] h-[46px]'>
                        <UserButton text="Cancel" />
                    </div>
                    <div className='w-[126px] h-[46px]'>
                        <UserButton text="Save" type="gradient" />
                    </div>
                </div>
            </div>
        )
    }

    if (modal.teamModal) {
        return (
            <section className={`w-[350px] lg:rounded-[48px] lg:w-[529px] py-[20px] lg:h-[500px] flex flex-col items-center h-[500px] bg-white rounded-[15px]`}>
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
            <section className={`w-[350px] lg:rounded-[48px] lg:w-[544px] py-[20px] flex flex-col items-center min-h-[500px] bg-white rounded-[15px]`}>
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
                            <UserButton text="Cancel" textColor="text-black" />
                        </div>
                        <div className="w-[186px] h-[47px] lg:w-[186px] lg:h-[57px]">
                            <UserButton onClick={(e)=>{editApi(
                                e,
                                `http://admapis-staging.payrail.co/v1/charge/update/${values.id}`,
                                {
                                    "amount": values.values.value,
                                    "chargeType": values.values.chargeType,
                                    "lowerBound": values.values.lowerBound,
                                    "transactionType": values.values.transactionType,
                                    "upperBound": values.values.upperBound
                                  },
                                  localStorage.getItem('token'),
                                  router,
                                  modalSuccessNotify,
                                  closeModal
                                )}} 
                                text="Save" type="gradient" />
                        </div>
                    </section>
                </form>
            </section>
        )
    }
}