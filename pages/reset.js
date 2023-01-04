import { useRef, useState, useEffect } from 'react'


export default function Reset({showPassword, resetPasswordDisplay, setResetPasswordDisplay}) {
    const passwordField = useRef()
    const passwordConfirmField = useRef()
    return (
        <div className="w-full h-full">
            <section className='flex m-auto justify-center h-[61px] w-[307px] items-center box-border self-center mt-[50px] rounded-[30.5px] bg-[#f9f9f9]'>
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
              <input id='newPassword' ref={passwordField} className='ml-10 w-4/6 z-10 focus:border-none outline-none bg-input-gray' type={resetPasswordDisplay.newPassword} placeholder='New Password' />
              <button onClick={(e) => { showPassword(e, passwordField, setResetPasswordDisplay, resetPasswordDisplay) }} className='bg-input-gray z-30 px-3 ml-auto rounded-[10px]'>
                show
              </button>
            </section>
            <section className='w-[427px] mt-[20px] h-[57px] relative justify-between bg-[#f9f9f9] pr-6 border m-auto border-border-gray rounded-[28.5px] flex items-center'>
              <input id='confirmPassword' ref={passwordConfirmField} className='ml-10 w-4/6 z-10 focus:border-none outline-none bg-input-gray' type={resetPasswordDisplay.confirmPassword} placeholder='Confirm Password' />
              <button onClick={(e) => { showPassword(e, passwordConfirmField, setResetPasswordDisplay, resetPasswordDisplay) }} className='bg-input-gray z-30 px-3 ml-auto rounded-[10px]'>
                show
              </button>
            </section>
          </section>
          <section className='mt-[44px] px-14 flex items-center justify-end'>
            <button className='bg-[#EA6212] text-white w-[217px] h-[46px] font-[400] text-[#ffffff] rounded-[23px]'>Create new password</button>
          </section>
        </div>
    )
}