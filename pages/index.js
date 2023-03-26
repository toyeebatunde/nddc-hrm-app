
import Head from 'next/head'
import ImageHolder from '../components/ImageHolder'
import logoIcon from '../public/icons/logo-icon-gradient.svg'
import payrailIcon from '../public/icons/payrail-logo-black.svg'
import { useRef, useState, useEffect } from 'react'
import splash from '../public/icons/splash.svg'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

export default function Home({ showPassword, login, token, passwordDisplay, setPasswordDisplay, changeForm, loginDetails, setLoginDetails, createCaution, changer }) {
  const passwordField = useRef()
  const router = useRouter()
  useEffect(() => { }, [passwordDisplay])
  // console.log(router)

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

      <div className='flex flex-col items-center px-[20px] w-full py-[5px] '>
        <section className='flex m-auto w-fit min-h-logo-height py-1 px-1 items-center'>
          <div className=' relative w-[44px] h-[53px]'>
            <ImageHolder src="/icons/logo-icon-gradient.svg" />
          </div>
          <div className=' relative ml-[10px] w-[109px] h-[37px]'>
            <ImageHolder src="/icons/payrail-logo-black.svg" />
          </div>
        </section>
        <div id='container' className='mt-[80.04px] flex flex-col w-full lg:w-[529px] min-h-[555px] border border-border-gray rounded-[48px]'>
          <section className='flex justify-center  h-[61px] w-full w-[90%] lg:w-[307px] items-center box-border m-auto mt-[30px] rounded-[30.5px] bg-[#f9f9f9]'>
            <section className='w-[159px] h-[49px] rounded-[24.5px] flex items-center text-[los] justify-center bg-gradient-to-r text-[#ffffff] from-[#EF6B25] to-[#F6BC18] '>Log in</section>
          </section>
          <section className='flex flex-col'>
            <section className='font-pushpennyMedium text-[20px] md:text-[30px] text-center'>
              Welcome back, Admin
            </section>
            <section className='text-center mt-[30px] font-pushpennyBook text-[12px] leading-[15.62px] font-[400] w-3/5 self-center'>
              Please, check your browser’s address bar to be sure you’re on
              https://agencyadm.payrail.co
            </section>

           
              <section className='text-center mt-[30px] font-pushpennyBook text-[16px] leading-[15.62px] h-[20px] font-[700] w-3/5 self-center'>
                {createCaution? "Incorrect Password or Username, try again." : ""}
              </section>
            

            <section className=' w-[90%] md:w-[427px] mt-[20px] h-[57px] relative justify-between bg-[#f9f9f9] pr-6 border m-auto border-border-gray rounded-[28.5px] flex items-center'>
              <input value={loginDetails.username} onChange={(e) => { changeForm(e, loginDetails, setLoginDetails) }} id='username' className='ml-10 border-0 bg-input-gray w-4/5 focus:border-none outline-none' type="text" placeholder='Username' />
            </section>
            <section className='w-[90%] md:w-[427px] mt-[20px] h-[57px] relative justify-between bg-[#f9f9f9] pr-6 border m-auto border-border-gray rounded-[28.5px] flex items-center'>
              <input value={loginDetails.password} onChange={(e) => { changeForm(e, loginDetails, setLoginDetails) }} id='password' ref={passwordField} className='ml-10 w-4/6 z-10 focus:border-none outline-none bg-input-gray' type={passwordDisplay.password} placeholder='Password' />
              <button onClick={() => { showPassword(passwordField, setPasswordDisplay, passwordDisplay) }} className='bg-input-gray z-30 px-3 ml-auto cursor-pointer rounded-[10px]'>
                {passwordDisplay.password == "password" ? "Show" : "Hide"}
              </button>
            </section>
          </section>
          <section className='mt-[30px] gap-[20px] lg:gap-0 m-auto w-[90%] md:w-[425px] flex items-center justify-between'>
            <section className=' font-pushpennyBook text-[12px] leading-[15.62px]'>Forget password? <span className='underline text-yellow'> Reset now </span></section>
            <button onClick={() => { login(loginDetails, changer) }} className='bg-gradient-to-r from-[#EF6B25] to-[#F6BC18] text-white w-[126px] h-[46px] font-[400] text-[#ffffff] rounded-[23px]'>Log in</button>
          </section>
        </div>
      </div>
    </div>
  )
}
