
import Head from 'next/head'
import ImageHolder from '../components/ImageHolder'
import logoIcon from '../public/icons/logo-icon-gradient.svg'
import payrailIcon from '../public/icons/payrail-logo-black.svg'
import { useRef, useState, useEffect } from 'react'
import splash from '../public/icons/splash.svg'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

export default function Home({ showPassword, login, token, setPasswordDisplay, changeForm, loginDetails, setLoginDetails, newPasswordDisplay, setNewPasswordDisplay, newLoginDetails, setNewLoginDetails, createCaution, changer, createPassword }) {
    const newPassword = useRef()
    const confirmPassword = useRef()
    const router = useRouter()

    useEffect(() => {
        setNewLoginDetails({ ...newLoginDetails, code: router.query.code })
    }, [router.query.code])

    useEffect(() => {
        if (createCaution) {
            let timer = setTimeout(() => {
                changer()
            }, 2000)
            return () => clearTimeout(timer);
        }

    }, [createCaution])





    return (
        <div className="w-full lg:w-[529px] h-full flex flex-col items-center p-[20px] h-full">
            <div className='flex flex-col py-[5px] '>
                <section className='flex m-auto w-fit min-h-logo-height py-1 px-1 items-center'>
                    <div className=' relative w-[44px] h-[53px]'>
                        <ImageHolder src="/icons/logo-icon-gradient.svg" />
                    </div>
                    <div className=' relative ml-[10px] w-[109px] h-[37px]'>
                        <ImageHolder src="/icons/payrail-logo-black.svg" />
                    </div>
                </section>
                <div id='container' className='mt-[80.04px] flex flex-col w-[529px] min-h-[555px] border border-border-gray rounded-[48px] m-auto'>
                    <section className='flex justify-center h-[61px] w-[307px] items-center box-border self-center mt-[50px] rounded-[30.5px] bg-[#f9f9f9]'>
                        <section className='w-[159px] h-[49px] rounded-[24.5px] flex items-center text-[los] justify-center bg-[#EA6212] text-[#ffffff] from-[#EF6B25] to-[#F6BC18] '>
                            Reset Password
                        </section>
                    </section>
                    <section className='flex mt-[25px] flex-col'>
                        <section className='font-pushpennyMedium text-[30px] text-center'>
                            Create new password
                        </section>
                        {createCaution ?
                            <section className='text-center mt-[30px] font-pushpennyBook text-[20px] leading-[15.62px] font-[700] w-3/5 self-center'>
                                Passwords must match
                            </section> :
                            <section className='text-center mt-[30px] font-pushpennyBook text-[12px] leading-[15.62px] font-[400] w-3/5 self-center'>
                                Please enter your new password and confirm it
                            </section>
                        }
                        <section className='w-[427px] mt-[20px] h-[57px] relative justify-between bg-[#f9f9f9] pr-6 border m-auto border-border-gray rounded-[28.5px] flex items-center'>
                            <input value={newLoginDetails.password} onChange={(e) => { changeForm(e, newLoginDetails, setNewLoginDetails) }} id='password' ref={newPassword} className='ml-10 w-4/6 z-10 focus:border-none outline-none bg-input-gray' type={newPasswordDisplay.password} placeholder='Password' />
                            <button onClick={() => { showPassword(newPassword, setNewPasswordDisplay, newPasswordDisplay) }} className='bg-input-gray z-30 px-3 ml-auto cursor-pointer rounded-[10px]'>
                            {newPasswordDisplay.password == "password" ? "show" : "hide"}
                            </button>
                        </section>
                        <section className='w-[427px] mt-[20px] h-[57px] relative justify-between bg-[#f9f9f9] pr-6 border m-auto border-border-gray rounded-[28.5px] flex items-center'>
                            <input value={newLoginDetails.confirmPassword} onChange={(e) => { changeForm(e, newLoginDetails, setNewLoginDetails) }} id='confirmPassword' ref={confirmPassword} className='ml-10 w-4/6 z-10 focus:border-none outline-none bg-input-gray' type={newPasswordDisplay.confirmPassword} placeholder='Password' />
                            <button onClick={() => { showPassword(confirmPassword, setNewPasswordDisplay, newPasswordDisplay) }} className='bg-input-gray z-30 px-3 ml-auto cursor-pointer rounded-[10px]'>
                                {newPasswordDisplay.confirmPassword == "password" ? "show" : "hide"}
                            </button>
                        </section>
                    </section>
                    <section className='mt-[44px] px-14 flex items-center justify-end'>
                        <button onClick={() => {        
                            // console.log(router.query.code)        
                            createPassword(newLoginDetails, changer, setLoginDetails)
                        }} className='bg-[#EA6212] text-white w-[217px] h-[46px] font-[400] text-[#ffffff] rounded-[23px]'>Create new password
                        </button>
                    </section>
                </div>
            </div>
        </div>
    )
}
