import React, { useState, useRef, useEffect } from 'react';

export default function OtpPage() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = [useRef(), useRef(), useRef(), useRef()];
  const [loading, setLoading] = useState(false)

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
    if (!element.nextSibling) {
      console.log(element.value)
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs[index - 1].current.focus();
    }
  };

  async function handleSubmit() {
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    }, 3000)

    const otpValue = otp.join('');
    console.log('OTP submitted:', otpValue);
    // Add your OTP verification logic here
  };

  useEffect(() => {
    inputs[0].current.focus();
  }, []);

  return (
    <div id='container' className='mt-[80.04px] relative flex flex-col m-auto w-full lg:w-[529px] min-h-[555px] border border-border-gray rounded-[48px]'>
      {/* <div className='absolute w-[96%] h-[94%] left-[2%] top-[3%] rounded-[48px] bg-[gray] z-[20] bg-opacity-20'></div> */}
      <section className='flex z-[10] justify-center h-[61px] w-[90%] lg:w-[307px] items-center box-border m-auto mt-[30px] rounded-[30.5px] bg-[#f9f9f9]'>
        <section className='w-[159px] h-[49px] rounded-[24.5px] flex items-center text-[los] justify-center bg-gradient-to-r text-[#ffffff] from-[#003B49] to-[#2DCD7C]'>OTP Verification</section>
      </section>
      <section className='flex z-[10] flex-col'>
        <section className='font-pushpennyMedium text-[20px] md:text-[30px] text-center mt-[20px]'>
          Enter OTP
        </section>
        <section className='text-center mt-[10px] font-pushpennyBook text-[14px] leading-[18px] w-4/5 self-center'>
          We've sent a 4-digit code to your registered email address. Please enter it below.
        </section>

        <section className='flex justify-center space-x-4 mt-[30px]'>
          {otp.map((data, index) => {
            return (
              <input
                className='w-[50px] h-[50px] border border-border-gray rounded-[10px] text-center text-[24px] font-bold focus:border-[#2DCD7C] focus:outline-none'
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={e => handleChange(e.target, index)}
                onKeyDown={e => handleKeyDown(e, index)}
                onFocus={e => e.target.select()}
                ref={inputs[index]}
              />
            );
          })}
        </section>

        <section className='text-center mt-[20px] font-pushpennyBook text-[14px]'>
          Didn't receive the code? <span className='text-[#2DCD7C] cursor-pointer'>Resend OTP</span>
        </section>
      </section>
      <section className='mt-[30px] z-[10] m-auto w-[90%] md:w-[425px] flex items-center justify-center'>
        <button disabled={loading} onClick={handleSubmit} className='bg-gradient-to-r from-[#003B49] to-[#2DCD7C] active:bg-white active:text-[#2DCD7C] w-[126px] h-[46px] font-[400] text-[#ffffff] rounded-[23px]'>{loading ? "Verifying" : "Verify OTP"}</button>
      </section>
    </div>
  );
}


// http://35.158.104.113:55/