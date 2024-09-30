import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function OtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = [useRef(), useRef(), useRef(), useRef()];
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(true);
  const [userNumber, setUserNumber] = useState("");
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const countdownDuration = 4 * 60 * 1000;
    const storedEndTime = localStorage.getItem("endTime");

    let endTime;
    if (storedEndTime) {
      // If there's an end time in localStorage, use it
      endTime = new Date(storedEndTime).getTime();
    } else {
      // If no end time in localStorage, calculate it from now
      endTime = new Date().getTime() + countdownDuration;
      localStorage.setItem("endTime", new Date(endTime).toISOString());
    }

    const updateTimer = () => {
      const now = new Date().getTime();
      const timeRemaining = endTime - now;

      if (timeRemaining > 0) {
        setTimeLeft(Math.floor(timeRemaining / 1000)); // Convert to seconds
      } else {
        setTimeLeft(0);
        localStorage.removeItem("endTime"); // Remove the endTime after the countdown ends
      }
    };

    // Update the timer every second
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, [timer]);

  useEffect(() => {
    if (!localStorage.getItem("phoneNumber")) {
      router.push("/signup");
      return;
    }

    setUserNumber((currentValue) => {
      const storedNumber = localStorage.getItem("phoneNumber");
      return storedNumber !== null ? storedNumber : currentValue;
    });
  }, []);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  async function resendOtp() {}

  async function validateOtp() {
    try {
      // debugger
      const verifyOtp = await axios.post(
        `https://nddc-api.payrail.co/api/v1/auth/verify-otp`,
        {
          otp: otp.join(""),
          userName: userNumber,
        }
      );

      if (verifyOtp.status === 200) {
        router.push("/login");
        console.log("otp successful:", verifyOtp.data);
      }
    } catch (error) {
      console.error("otp error:", error);
      // setOtpSubmit(false)
    } finally {
      // setOtpSubmit(false)
    }
  }

  async function resendOtp() {
    setTimer(!timer);
  }

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
    if (!element.nextSibling) {
      console.log(element.value);
      validateOtp();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs[index - 1].current.focus();
    }
  };

  async function handleSubmit() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    const otpValue = otp.join("");
    console.log("OTP submitted:", otpValue);
    // Add your OTP verification logic here
  }

  useEffect(() => {
    inputs[0].current.focus();
  }, []);

  return (
    <div
      id="container"
      className="mt-[80.04px] relative flex flex-col m-auto w-full lg:w-[529px] min-h-[555px] border border-border-gray rounded-[48px]"
    >
      {/* <div className='absolute w-[96%] h-[94%] left-[2%] top-[3%] rounded-[48px] bg-[gray] z-[20] bg-opacity-20'></div> */}
      <section className="flex z-[10] justify-center h-[61px] w-[90%] lg:w-[307px] items-center box-border m-auto mt-[30px] rounded-[30.5px] bg-[#f9f9f9]">
        <section className="w-[159px] h-[49px] rounded-[24.5px] flex items-center text-[los] justify-center bg-gradient-to-r text-[#ffffff] from-[#003B49] to-[#2DCD7C]">
          OTP Verification
        </section>
      </section>
      <section className="flex z-[10] flex-col">
        <section className="font-pushpennyMedium text-[20px] md:text-[30px] text-center mt-[20px]">
          Enter OTP
        </section>
        <section className="text-center mt-[10px] font-pushpennyBook text-[14px] leading-[18px] w-4/5 self-center">
          We've sent a 4-digit code to your registered email address. Please
          enter it below.
        </section>

        <section className="flex justify-center space-x-4 mt-[30px]">
          {otp.map((data, index) => {
            return (
              <input
                className="w-[50px] h-[50px] border border-border-gray rounded-[10px] text-center text-[24px] font-bold focus:border-[#2DCD7C] focus:outline-none"
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
                ref={inputs[index]}
              />
            );
          })}
        </section>

        <section className="text-center flex flex-col mt-[20px] font-pushpennyBook text-[14px]">
          <button
            onClick={() => {
              resendOtp();
            }}
            className={`${timeLeft == 0 ? "" : "hidden"}`}
          >
            Didn't receive the code?{" "}
            <span className="text-[#2DCD7C] cursor-pointer">Resend OTP</span>
          </button>
          <h2 className={`${timeLeft == 0 ? "hidden" : ""}`}>
            {"Time remaining: " + formatTime(timeLeft)}
          </h2>
        </section>
      </section>
      <section className="mt-[30px] z-[10] m-auto flex-col w-[90%] md:w-[425px] flex items-center justify-center">
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-gradient-to-r from-[#003B49] to-[#2DCD7C] active:bg-white active:text-[#2DCD7C] w-[126px] h-[46px] font-[400] text-[#ffffff] rounded-[23px]"
        >
          {loading ? "Verifying" : "Verify OTP"}
        </button>
      </section>
    </div>
  );
}

// https://nddc-api.payrail.co/
