
import Head from 'next/head'
import ImageHolder from '../components/ImageHolder'
import logoIcon from '../public/icons/logo-icon-gradient.svg'
import payrailIcon from '../public/icons/payrail-logo-black.svg'
import { useRef, useState, useEffect } from 'react'
import splash from '../public/icons/splash.svg'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

export default function Home({ showPassword, login, token, setPasswordDisplay, changeForm, loginDetails, setLoginDetails, newPasswordDisplay, setNewPasswordDisplay, newLoginDetails, setNewLoginDetails }) {
    const newPassword = useRef()
    const confirmPassword = useRef()
    const router = useRouter()
    useEffect(() => { }, [newPasswordDisplay])

    return (
        <div className="w-full lg:w-[529px] h-full flex flex-col items-center p-[20px] h-full">
            <div className='flex flex-col py-2 '>
        <section className='flex m-auto w-fit min-h-logo-height py-1 px-1 items-center'>
          <div className=' relative w-[44px] h-[53px]'>
            <ImageHolder src="/icons/logo-icon-gradient.svg" />
          </div>
          <div className=' relative ml-[10px] w-[109px] h-[37px]'>
            <ImageHolder src="/icons/payrail-logo-black.svg" />
          </div>
        </section>
        <div id='container' className='mt-[80.04px] flex flex-col w-[529px] min-h-[555px] border border-border-gray rounded-[48px] m-auto'>
          <div className='w-[203.17px] h-[203.67px] mt-[54px] m-auto relative'>
            <ImageHolder src={splash} />
          </div>
         
          <section className='flex mt-[10px] flex-col'>
            <section className='font-pushpennyMedium text-[30px] font-[500] text-center leading-[39.06px]'>
              Awesome! <br /> 
             You're good to go
            </section>
            <section className='text-center mt-[4px] font-pushpennyBook text-[12px] leading-[15.62px] font-[400] w-3/5 self-center'>
              {/* We've sent you a 6-digit code number to secure your session */}
            </section>
          </section>
            <button onClick={()=>{
                router.push("/")
            }} className='bg-[#EA6212] m-auto text-white w-[217px] h-[46px] font-[400] text-[#ffffff] mt-15px] rounded-[23px]'>Log in</button>
          
        </div>
      </div>
        </div>
    )
}
