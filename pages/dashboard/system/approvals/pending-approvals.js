
import { useState, useRef, useEffect } from "react"
import ApprovalsLayoutTemplate from "../../../../components/ApprovalsLayoutTemplate"

export default function Approval({ modals, setModalState }) {
    const [activeTab, setActiveTab] = useState("")
    const [createRole, setCreateRole] = useState(false)

    function setTab(tab) {
        setActiveTab(tab)
    }

    const getModalRef = useRef()
    const getModalButtonRef = useRef()


    return (
        <section className={`border w-full h-full`}>
            Pending Approvals          
        </section>
    )
}

Approval.Layout = ApprovalsLayoutTemplate