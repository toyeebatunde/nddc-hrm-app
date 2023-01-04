import Head from 'next/head'
import ImageHolder from '../components/ImageHolder'
import logoIcon from '../public/icons/logo-icon-gradient.svg'
import payrailIcon from '../public/icons/payrail-logo-black.svg'
import { useRef, useState, useEffect } from 'react'
import splash from '../public/icons/splash.svg'

export default function Home({ showPassword, token, passwordDisplay, setPasswordDisplay }) {
  const passwordField = useRef()

  
  return (
    <div className="w-full">
      <section className='flex justify-center h-[61px] w-[307px] items-center box-border m-auto mt-[50px] rounded-[30.5px] bg-[#f9f9f9]'>
        <section className='w-[159px] h-[49px] rounded-[24.5px] flex items-center text-[los] justify-center bg-gradient-to-r text-[#ffffff] from-[#EF6B25] to-[#F6BC18] '>Log in</section>
      </section>
      <section className='flex mt-[25px] flex-col'>
        <section className='font-pushpennyMedium text-[30px] text-center'>
          Welcome back, Admin
        </section>
        <section className='text-center mt-[30px] font-pushpennyBook text-[12px] leading-[15.62px] font-[400] w-3/5 self-center'>
          Please, check your browser’s address bar to be sure you’re on
          https://agencyadm.payrail.co
        </section>
        <section className='w-[427px] h-[57px] mt-[30px] border m-auto border-border-gray bg-[#f9f9f9] rounded-[28.5px] flex items-center'>
          <input className='ml-10 border-0 bg-input-gray w-4/5 focus:border-none outline-none' type="text" placeholder='Username' />
        </section>
        <section className='w-[427px] mt-[20px] h-[57px] relative justify-between bg-[#f9f9f9] pr-6 border m-auto border-border-gray rounded-[28.5px] flex items-center'>
          <input id='passwordInput' ref={passwordField} className='ml-10 w-4/6 z-10 focus:border-none outline-none bg-input-gray' type={passwordDisplay} placeholder='Password' />
          <button onClick={(e) => { showPassword(e, passwordField, setPasswordDisplay, passwordDisplay) }} className='bg-input-gray z-30 px-3 ml-auto rounded-[10px]'>
            show
          </button>
        </section>
      </section>
      <section className='mt-[44px] px-14 flex items-center justify-between'>
        <section className=' font-pushpennyBook text-[12px] leading-[15.62px]'>Forget password? <span className='underline text-yellow'> Reset now </span></section>
        <button className='bg-gradient-to-r from-[#EF6B25] to-[#F6BC18] text-white w-[126px] h-[46px] font-[400] text-[#ffffff] rounded-[23px]'>Log in</button>
      </section>


      {/* <div className='flex flex-col py-2 '>
        <section className='flex m-auto w-fit min-h-logo-height py-1 px-1 items-center'>
          <div className=' relative w-[44px] h-[53px]'>
            <ImageHolder src={logoIcon} />
          </div>
          <div className=' relative ml-[10px] w-[109px] h-[37px]'>
            <ImageHolder src={payrailIcon} />
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
              Create new password, Admin
            </section>
            <section className='text-center mt-[30px] font-pushpennyBook text-[12px] leading-[15.62px] font-[400] w-3/5 self-center'>
              We've sent you a 6-digit code number to secure your session
            </section>      
            <section className='w-[427px] mt-[20px] h-[57px] relative justify-between bg-[#f9f9f9] pr-6 border m-auto border-border-gray rounded-[28.5px] flex items-center'>
              <input ref={passwordField} className='ml-10 w-4/6 z-10 focus:border-none outline-none bg-input-gray' type={passwordDisplay} placeholder='New Password' />
              <button onClick={(e) => { showPassword(e, passwordField) }} className='bg-input-gray z-30 px-3 ml-auto rounded-[10px]'>
                show
              </button>
            </section>
            <section className='w-[427px] mt-[20px] h-[57px] relative justify-between bg-[#f9f9f9] pr-6 border m-auto border-border-gray rounded-[28.5px] flex items-center'>
              <input ref={passwordField} className='ml-10 w-4/6 z-10 focus:border-none outline-none bg-input-gray' type={passwordDisplay} placeholder='Confirm Password' />
              <button onClick={(e) => { showPassword(e, passwordField) }} className='bg-input-gray z-30 px-3 ml-auto rounded-[10px]'>
                show
              </button>
            </section>
          </section>
          <section className='mt-[44px] px-14 flex items-center justify-end'>
            <button className='bg-[#EA6212] text-white w-[217px] h-[46px] font-[400] text-[#ffffff] rounded-[23px]'>Create new password</button>
          </section>
        </div>
      </div> */}


      {/* <div className='flex flex-col py-2 '>
        <section className='flex m-auto w-fit min-h-logo-height py-1 px-1 items-center'>
          <div className=' relative w-[44px] h-[53px]'>
            <ImageHolder src={logoIcon} />
          </div>
          <div className=' relative ml-[10px] w-[109px] h-[37px]'>
            <ImageHolder src={payrailIcon} />
          </div>
        </section>
        <div id='container' className='mt-[80.04px] flex flex-col w-[529px] min-h-[555px] border border-border-gray rounded-[48px] m-auto'>
          <div className='w-[203.17px] h-[203.67px] mt-[54px] m-auto relative'>
            <ImageHolder src={splash} />
          </div>
         
          <section className='flex mt-[10px] flex-col'>
            <section className='font-pushpennyMedium text-[30px] font-[500] text-center leading-[39.06px]'>
              Awesome! <br /> 
              Admin, you are good to go
            </section>
            <section className='text-center mt-[4px] font-pushpennyBook text-[12px] leading-[15.62px] font-[400] w-3/5 self-center'>
              We've sent you a 6-digit code number to secure your session
            </section>
          </section>
            <button className='bg-[#EA6212] m-auto text-white w-[217px] h-[46px] font-[400] text-[#ffffff] mt-15px] rounded-[23px]'>Log in</button>
          
        </div>
      </div> */}


    </div>
  )
}
