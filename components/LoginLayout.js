
import ImageHolder from "../components/ImageHolder"
import { tabs } from "../components/Tabs"
import SideTabs from "../components/SideTabs"
import { useEffect, useState, useRef } from "react"
import Modal from "./Modal"
import Textfield from "./TextField"
import UserButton from "./ButtonMaker"




export default function LoginLayout({ children, modals, setModalState, setActiveDashboard, activeDashboard, activeState, switchActive, switchBoard, closeModals, token, editForm, setEditForm, formEdit, modalSuccessNotify, isLoading, setLoading }) {
    return (
        <div className={`w-full h-screen flex justify-center`}>
            {children}
        </div>
    )
}