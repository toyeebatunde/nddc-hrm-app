import tick from '../public/icons/tick.svg'
import { useState } from 'react'
import ImageHolder from './ImageHolder'


export default function RadioToggle({ parent, label, permissions, setPermissions, position, access, part }) {
    const [userState, setUserState] = useState(false)  
    
    function setPermission(e, state) {
        e.preventDefault()
        setUserState(state)
    }

    if (parent == "System") {
        return (
            <div className="flex justify-between">
                <p className='font-pushpennyBook text-[14px] font-400 leading-[22px] text-[#6E7883]'>{label}</p>
                <div className=' w-[143px] flex justify-around'>
                    <section className={`flex gap-[10px] items-center`}>
                        <button onClick={(e)=>{setPermissions(e,position,access.yes)}} className={`w-[16px] border h-[16px] rounded-[50%] border border-[2px] border-[#8C8C8C] relative`}>
                            <div className={`w-full h-full ${permissions[position].name ? "" : "hidden"} rounded-inherit relative`}>
                            <ImageHolder src="/icons/role-tick.svg" />
                            </div>
                        </button>
                        <p className='font-400 text-[14px] leading-[18.23px font-pushpennyBook]'>Yes</p>
                    </section>                    
                    <section className={`flex gap-[10px] items-center`}>
                        <button onClick={(e)=>{setPermissions(e,position,access.no)}} className={`w-[16px] border h-[16px] rounded-[50%] border border-[2px] border-[#8C8C8C] relative`}>
                            <div className={`w-full h-full ${permissions[position].name ? "hidden" : ""} rounded-inherit relative`}>
                            <ImageHolder src="/icons/role-tick.svg" />
                            </div>
                        </button>
                        <p className='font-400 text-[14px] leading-[18.23px font-pushpennyBook]'>No</p>
                    </section>                    
                </div>
                
            </div>
        )
    }    
    if (parent == "Support") {
        return (
            <div className="flex justify-between">
                <p className='font-pushpennyBook text-[14px] font-400 leading-[22px] text-[#6E7883]'>{label}</p>
                <div className=' w-[143px] flex justify-around'>
                    <section className={`flex gap-[10px] items-center`}>
                        <button onClick={(e)=>{setPermissions(e,position,access.edit)}} className={`w-[16px] border h-[16px] rounded-[50%] border border-[2px] border-[#8C8C8C] relative`}>
                            <div className={`w-full h-full ${permissions[position].name == access.edit ? "" : "hidden"} rounded-inherit relative`}>
                            <ImageHolder src="/icons/role-tick.svg" />
                            </div>
                        </button>
                        <p className='font-400 text-[14px] leading-[18.23px font-pushpennyBook]'>Edit</p>
                    </section>                    
                    <section className={`flex gap-[10px] items-center`}>
                        <button onClick={(e)=>{setPermissions(e,position,access.hide)}} className={`w-[16px] border h-[16px] rounded-[50%] border border-[2px] border-[#8C8C8C] relative`}>
                            <div className={`w-full h-full ${permissions[position].name ? "hidden" : ""} rounded-inherit relative`}>
                            <ImageHolder src="/icons/role-tick.svg" />
                            </div>
                        </button>
                        <p className='font-400 text-[14px] leading-[18.23px font-pushpennyBook]'>Hide</p>
                    </section>                    
                </div>
                
            </div>
        )
    }    
    if (parent == "Agency" || parent == "Insight" || parent == "Loan") {
        return (
            <div className="flex justify-between">
                <p className='font-pushpennyBook text-[14px] font-400 leading-[22px] text-[#6E7883]'>{label}</p>
                <div className=' w-[198px] flex justify-around'>
                    <section className={`flex gap-[10px] items-center`}>
                        <button onClick={(e)=>{setPermissions(e,position,access.view)}} className={`w-[16px] border h-[16px] rounded-[50%] border border-[2px] border-[#8C8C8C] relative`}>
                            <div className={`w-full h-full ${permissions[position].name == access.view ? "" : "hidden"} rounded-inherit relative`}>
                            <ImageHolder src="/icons/role-tick.svg" />
                            </div>
                        </button>
                        <p className='font-400 text-[14px] leading-[18.23px font-pushpennyBook]'>View</p>
                    </section>                    
                    <section className={`flex gap-[10px] items-center`}>
                        <button onClick={(e)=>{setPermissions(e,position,access.edit)}} className={`w-[16px] border h-[16px] rounded-[50%] border border-[2px] border-[#8C8C8C] relative`}>
                            <div className={`w-full h-full ${permissions[position].name == access.edit ? "" : "hidden"} rounded-inherit relative`}>
                            <ImageHolder src="/icons/role-tick.svg" />
                            </div>
                        </button>
                        <p className='font-400 text-[14px] leading-[18.23px font-pushpennyBook]'>Edit</p>
                    </section>                    
                    <section className={`flex gap-[10px] items-center`}>
                        <button onClick={(e)=>{setPermissions(e,position,access.hide)}} className={`w-[16px] border h-[16px] rounded-[50%] border border-[2px] border-[#8C8C8C] relative`}>
                            <div className={`w-full h-full ${permissions[position].name  ? "hidden" : ""} rounded-inherit relative`}>
                            <ImageHolder src="/icons/role-tick.svg" />
                            </div>
                        </button>
                        <p className='font-400 text-[14px] leading-[18.23px font-pushpennyBook]'>Hide</p>
                    </section>                    
                </div>
                
            </div>
        )
    }    
}