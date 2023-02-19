
import ImageHolder from '../../../components/ImageHolder'
// import directionDown from '../../public/icons/direction-down.svg'
// import down from '../../public/icons/down.svg'
// import arrowUpGreen from '../../public/icons/arrow-up-green-circle.svg'
import searchIcon from '../../../public/icons/search-icon.svg'
// import closeIcon from '../../public/icons/close-modal.svg'
import { useState, useRef, useEffect } from "react"
// import tick from '../../public/icons/tick.svg'
// import RadioToggle from "../../components/radioToggle"
// import ButtonTab from "../../components/ButtonTab"
import UserButton from '../../../components/ButtonMaker'
import Textfield from '../../../components/TextField'
import axios from 'axios'
import useSWR from 'swr'
import { testEnv, editApi } from '../../../components/Endpoints'

export default function Institutions({ modals, setModalState, setToken, setActiveDashboard, setActiveState, editFormState, viewState, setView, setLoading }) {

    const initialForm = {
        institutionCode: "",
        nipCode: "",
        institutionName: "",
        bankAccountName: "",
        bankAccountNumber: "",
        ledgerPurseNumber: "",
        integrated: false
    }
    const [institutionView, setInstitutionView] = useState(initialForm)
    const [institutionsData, setInstitutionsData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/institution/all?pageNo=0&pageSize=10`, fetching)
    // const [view, setView] = useState(false)
    // const router = useRouter()

    function institutionHandler(modalState, modal, fields, id) {
        setModalState(modalState, modal)
        editFormState(fields, id)
    }
    const deleteCaution = "You are about to delete an institution, note after deleting it will go through an approval process"

    useEffect(() => {
        setToken()
        setView(false)
        setActiveDashboard("Institutions")
        setActiveState("1")
        if(!institutionsData) {
            setLoading(true)
        }
        if (data) {
            setLoading(false)
            setInstitutionsData(data)
        }
        if (error) {
            console.log(error)
        }
    }, [data])

    function formEdit(e) {
        setInstitutionView({ ...institutionView, [e.target.name]: e.target.value })
    }


    const textFieldList = [
        {
            title: "Institution Code",
            name: "institutionCode",
        },
        {
            title: "NIP Code",
            name: "nipCode",
        },
        {
            title: "Institution Name",
            name: "institutionName",
        },
        {
            title: "Bank Account Number",
            name: "bankAccountNumber",
        },
        {
            title: "Bank Account Name",
            name: "bankAccountName",
        },
        {
            title: "Ledger Purse",
            name: "ledgerPurseNumber",
        },
    ]

    function updateInstitution(e) {
        e.preventDefault()
        axios.put(`${testEnv}v1/institution/update/${institutionView.id}`,
            {
                "bankAccountName": institutionView.bankAccountName,
                "bankAccountNumber": institutionView.bankAccountNumber,
                "institutionCode": institutionView.institutionCode,
                "institutionName": institutionView.institutionName,
                "integrated": institutionView.integrated,
                "ledgerPurseNumber": institutionView.ledgerPurseNumber,
                "nipCode": institutionView.nipCode
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }            
        )
        .then(response =>{
            // console.log(response)
            setView(false)
        })
        .catch(error=>{console.log(error)})
    }

    function changeView(e, id) {
        console.log(e)
        e.preventDefault()
        if (viewState) {
            setView(false)
            return
        }
        setView(true)
        const dataToView = institutionsData.data.filter(institution => institution.id === id)
        setInstitutionView(dataToView[0])
    }

    const [formFields, setFormFields] = useState(initialForm)
    const [createRole, setCreateRole] = useState(false)
    // ${modals.isOpen ? "blur-sm" : "blur-none"}




    const getModalRef = useRef()
    const getModalButtonRef = useRef()

    function forButton(e) {
        e.preventDefault()
        console.log(formFields.institutionName)
    }


    return (
        <div className={`flex relative flex-col items-start pt-[60px] overflow-hidden w-full`}>
            <section className={`w-full flex px-4 justify-between ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <h4 className="font-pushpennyMedium text-[36px] leading-[47px]">
                    System
                </h4>
            </section>
            <section className={`h-fit flex font-pushpennyMedium leading-[31px] text-[24px] font-[400] w-fit px-4 relative mt-5 ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                Bank Management
            </section>
            <section className={`px-4 justify-center w-full ${modals.isOpen ? "blur-sm" : "blur-none"} ${viewState ? "hidden" : "flex"}`}>
                <section className={`px-[40px] mdxl:px-[10px] pt-2 pb-2 w-fit md:w-full mt-8 h-fit lg:h-[61px] flex flex-col mdxl:flex-row justify-between items-center rounded-[48px] bg-[#F3F3F3] md:pr-[60px]`}>
                    <section className="md:w-[354px] h-[40px] bg-white rounded-[20px] px-2 relative flex items-center justify-between">
                        <input className="search-tab rounded-[20px] w-[80%]" placeholder="Search member" />
                        <div className="w-[28px] h-[28px] relative">
                            <ImageHolder src={searchIcon} />
                        </div>
                    </section>
                    <section className="flex w-[250px] md:w-[354px] mt-4 mdxl:mt-0 justify-between">
                        <div className='grow lg:w-[216px] h-[35px]'>
                            <UserButton type="gradient" text="+ Add New Bank" />
                        </div>
                    </section>

                </section>
            </section>

            <section className={`py-2 w-full mt-[20px] px-4 ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <div className={`mt-[25px] w-full ${viewState ? "flex" : "hidden"} font-[400] text-[18px] font-pushpennyBook md:w-[485px] items-center pl-[20px] border border-[#F3F3F3] bg-[#F3F3F3] rounded-[28.5px] h-[57px]`}>
                    Edit Bank
                </div>
                <section className={`min-h-[674px] ${viewState ? "w-full md:w-[485.7px]" : "w-full"} ${viewState ? "mt-[20px]" : "mt-0"} overflow-x-auto rounded-[10px] bg-brand-light-yellow pt-4 pl-2 pr-4`}>
                    <div className={`w-[250%] sm:w-[230%] md:w-[200%] mdxl:w-[180%] lg:w-[160%] xlg:w-[140%] xl:w-full h-[30px] ${viewState ? "hidden" : "block"}`}>

                        <table className="table-fixed w-full flex flex-col">
                            <thead>
                                <tr className="flex justify-around">
                                    <th className="font-400  flex w-[20%]  text-[12px] leading-[15.62px] font-pushpennyBook">CODE</th>
                                    <th className="font-400   flex w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">BANK NAME</th>
                                    <th className="font-400  flex w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6">
                                {institutionsData?.data.map((data, index) => {
                                    return (
                                        <tr key={index} className="flex justify-around h-[50px]">
                                            <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">{data.institutionName}</td>
                                            <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">{data.institutionCode}</td>

                                            <td className="font-pushpennyBook flex w-[20%] flex items-start font-400 text-[18px] leading-[14px] text-[#6E7883]">

                                                <UserButton type="edit" onClick={(e) => { changeView(e, data.id) }} />
                                                <UserButton type="delete" onClick={()=>{institutionHandler(true, "action", {caution:deleteCaution, action: "delete", endpoint: `${testEnv}v1/institution/delete/${data.id}` }, data.id)}} />

                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <section className={`w-full mt-[30px] h-fit rounded-[10px] flex-col bg-[#FBF4EB] ${viewState ? "flex" : "hidden"}`}>

                        <form className="w-full w-full flex flex-col items-center justify-between px-4">

                            {textFieldList.map((item, index) => {
                                return (
                                    <div key={index} className='mt-[25px] w-full rounded-[28.5px] h-[57px]'>
                                        <Textfield bg="bg-white" title={item.title} value={institutionView[item.name]} formEdit={formEdit} name={item.name} />
                                    </div>
                                )
                            })}
                            <div className='flex mt-[20px] gap-[5px] w-full pl-[20px]'>
                                <label for="integrated"> Integrated?</label>
                                <input type="checkbox" id="integrated" name="integrated" checked={institutionView.integrated} onChange={(e) => { setInstitutionView({ ...institutionView, [e.target.name]: e.target.checked }) }} />
                            </div>


                            <div className='w-full mt-[30px]  w-[330px] flex justify-between py-2 px-4'>
                                <div className='w-[126px] h-[46px]'>
                                    <UserButton text="Cancel" onClick={(e) => { changeView(e) }} />
                                </div>
                                <div className='w-[126px] h-[46px]'>
                                    <UserButton text="Save" type="gradient" onClick={(e)=>{updateInstitution(e)}} />
                                </div>
                            </div>
                        </form>

                    </section>
                </section>
            </section>
        </div>
    )
}