
import MetricLayoutTemplate from "../../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
import UserButton from "../../../../components/ButtonMaker";
import { useEffect, useState } from "react";
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { ngrok, testEnv, editApi } from "../../../../components/Endpoints";
import Textfield from "../../../../components/TextField";
import TableContainer from "../../../../components/TableContainer";

export default function Customers({ modals, setToken, setActiveDashboard, setActiveState, viewState, setView, isLoading, setLoading, entryValue, pageSelector }) {

    const initialCustomerForm = {
        customerId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        dateCreated: "",
        email: "",
        dob: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        lga: "",
        bvn: "",
    }
    const router = useRouter()
    const [customerEdit, setCustomerEdit] = useState({ editView: false, editForm: initialCustomerForm })
    const [customerData, setCustomerData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/customer/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)

    function formEdit(e) {
        setCustomerEdit({ ...customerEdit, editForm: { ...customerEdit.editForm, [e.target.name]: e.target.value } })
    }

    useEffect(() => {
        setLoading(true)
        setView(false)
        setActiveDashboard("Customer Management")
        setActiveState("2")
        if (data) {
            setLoading(false)
            setCustomerData(data)
        }
        if (error) {
            console.log(error)
        }
    }, [data])

    function editCustomer() {
        // editApi()
        setLoading(true)
        axios.post(`${testEnv}v1/customer/${customerEdit.editForm.customerId}/update`,
            {
                "address": customerEdit.editForm.address,
                "bvn": customerEdit.editForm.bvn,
                "city": customerEdit.editForm.city,
                "country": customerEdit.editForm.country,
                "createdOnDate": customerData.data.dateCreated,
                "customerIdentifier": customerEdit.editForm.customerId,
                "dob": customerEdit.editForm.dob,
                "email": customerEdit.editForm.email,
                "firstName": customerEdit.editForm.firstName,
                "gender": customerEdit.editForm.gender,
                "lastName": customerEdit.editForm.lastName,
                "lga": customerEdit.editForm.lga,
                "middleName": customerEdit.editForm.middleName,
                "phoneNumber": customerEdit.editForm.phone,
                "state": customerEdit.editForm.state
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
            .then(response => {
                // debugger
                console.log(response.data)
                setLoading(false)
                setCustomerEdit({ ...customerEdit, editView: false })
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
                setCustomerEdit({ ...customerEdit, editView: false })
            })
    }

    function editInfo(id, fName, lName, email, dob, phone, address, city, state, lga, bvn, middleName, dateCreated, gender) {
        setCustomerEdit({
            ...customerEdit,
            editView: true,
            editForm: {
                ...customerEdit.editForm,
                customerId: id,
                firstName: fName,
                lastName: lName,
                email: email,
                dob: dob,
                phone: phone,
                address: address,
                city: city,
                state: state,
                lga: lga,
                bvn: bvn,
                middleName: middleName,
                dateCreated: dateCreated,
                gender: gender
            }

        })
    }

    const dateFormatter = (stamp) => {
        const date = new Date(stamp)
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes()
    }





    return (
        <div className="w-full">

            <section className={`py-2 w-full mt-[20px] ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <section className={`min-h-[674px] w-full ${customerEdit.editView ? "hidden" : "flex"}  pt-4 pl-[5px]`}>
                    <div className={`w-full ${customerEdit.editView ? "hidden" : "flex"}`}>
                        <TableContainer pageSelector={pageSelector} entryValue={entryValue}>

                                <table className="table-fixed px-[5px] w-full flex flex-col">
                                    <thead>
                                        <tr className="flex justify-between">
                                            <th className="font-400  flex w-[80px] text-[12px] leading-[15.62px] font-pushpennyBook">FIRSTNAME</th>
                                            <th className="font-400  flex w-[80px]  text-[12px] leading-[15.62px] font-pushpennyBook">LASTNAME</th>
                                            <th className="font-400  flex w-[170px] text-[12px] leading-[15.62px] font-pushpennyBook">EMAIL ADDRESS</th>
                                            <th className="font-400  flex w-[120px] text-[12px] leading-[15.62px] font-pushpennyBook">PHONE NUMBER</th>
                                            <th className="font-400  flex w-[75px] text-[12px] leading-[15.62px] font-pushpennyBook">CREATED ON</th>
                                            <th className="font-400  flex w-[173px] text-[12px] leading-[15.62px] font-pushpennyBook">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody className="mt-6 ">
                                        {customerData?.data.map((customer, index) => {
                                            return (
                                                <tr key={index} className="flex justify-between items-center h-[50px] border-b border-[#979797]">
                                                    <td className="font-pushpennyBook flex w-[80px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{customer.firstName}</td>
                                                    <td className="font-pushpennyBook flex w-[80px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{customer.lastName}</td>
                                                    <td className="font-pushpennyBook flex w-[170px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{customer.email}</td>
                                                    <td className="font-pushpennyBook flex w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{customer.phoneNumber}</td>

                                                    <td className="font-pushpennyBook flex w-[75px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{dateFormatter(customer.dateCreated)}</td>
                                                    <td className="font-pushpennyBook gap-[5px] flex w-[175px]  flex items-start">
                                                        <div className="w-[80px] h-[36px]">
                                                            <UserButton type="edit" onClick={() => { editInfo(customer.id, customer.firstName, customer.lastName, customer.email, customer.dob, customer.phoneNumber, customer.address, customer.city, customer.state, customer.lga, customer.bvn, customer.middleName, customer.dateCreated, customer.gender) }} />
                                                        </div>
                                                        <div className="w-[88px] h-[36px]">
                                                            <UserButton type="view" text="View" onClick={() => { router.push(`/dashboard/agency/customer-management/${customer.id}`) }} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>

                            
                        </TableContainer>
                    </div>
                </section>







                <section className={`${customerEdit.editView ? "flex" : "hidden"} flex-col gap-[10px]`}>
                    <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                        <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Edit Agent Details</h2>
                    </div>
                    <form className=" flex flex-col lg:flex-row w-full gap-[20px] lg:gap-[9%] overflow-x-auto bg-[#FBF4EB] py-4 rounded-[10px]">
                        <section className="w-full lg:w-[45%] flex flex-col gap-[20px]">
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield formEdit={formEdit} title="Customer ID" value={customerEdit.editForm.customerId} name="customerId" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield formEdit={formEdit} title="First Name" value={customerEdit.editForm.firstName} name="firstName" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield formEdit={formEdit} title="Middle Name" value={customerEdit.editForm.middleName || "n/a"} name="middleName" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield formEdit={formEdit} title="Last Name" value={customerEdit.editForm.lastName} name="lastName" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield formEdit={formEdit} title="Email address" value={customerEdit.editForm.email} name="email" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield formEdit={formEdit} title="Date of Birth" value={customerEdit.editForm.dob} name="dob" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield formEdit={formEdit} title="Phone Number" value={customerEdit.editForm.phone} name="phone" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield formEdit={formEdit} title="Gender" value={customerEdit.editForm.gender} name="gender" bg="bg-[white]" />
                            </div>

                        </section>
                        <section className="w-full lg:w-[45%] flex flex-col gap-[20px] lg:justify-between">
                            <section className="flex gap-[15px] flex-col">
                                <div className="w-full h-[57px] rounded-[28px]">
                                    <Textfield formEdit={formEdit} title="Date Created" value={dateFormatter(customerEdit.editForm.dateCreated)} name="dateCreated" bg="bg-[white]" />
                                </div>
                                <div className="w-full h-[57px] rounded-[28px]">
                                    <Textfield formEdit={formEdit} title="State" value={customerEdit.editForm.state} name="state" bg="bg-[white]" />
                                </div>
                                <div className="w-full h-[57px] rounded-[28px]">
                                    <Textfield formEdit={formEdit} title="Local Government Area" value={customerEdit.editForm.lga} name="lga" bg="bg-[white]" />
                                </div>
                                <div className="w-full h-[57px] rounded-[28px]">
                                    <Textfield formEdit={formEdit} title="BVN" name="bvn" value={customerEdit.editForm.bvn} bg="bg-[white]" />
                                </div>
                                <div className="w-full h-[57px] rounded-[28px]">
                                    <Textfield formEdit={formEdit} title="Address" value={customerEdit.editForm.address} name="address" bg="bg-[white]" />
                                </div>
                                <div className="w-full h-[57px] rounded-[28px]">
                                    <Textfield formEdit={formEdit} title="City" value={customerEdit.editForm.city} name="city" bg="bg-[white]" />
                                </div>
                            </section>
                            <div className="w-full flex flex-col gap-[20px] lg:gap-0 md:flex-row md:justify-around h-fit rounded-[28px]">
                                <div className="w-full md:w-[164px] h-[46px] rounded-inherit">
                                    <UserButton type="" text="Cancel" bg="bg-[#DDDDDD]" onClick={() => { setCustomerEdit({ ...customerEdit, editView: false }) }} />
                                </div>
                                <div className="w-full md:w-[164px] h-[46px] rounded-inherit">
                                    <UserButton onClick={editCustomer} type="gradient" text="Save" />
                                </div>
                            </div>
                        </section>
                    </form>
                </section>
            </section>
        </div>
    )
}



Customers.Layout = MetricLayoutTemplate