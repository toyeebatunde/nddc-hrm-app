import Head from "next/head";
import ImageHolder from "../components/ImageHolder";
import logoIcon from "../public/icons/logo-icon-gradient.svg";
import payrailIcon from "../public/icons/payrail-logo-black.svg";
import { useRef, useState, useEffect } from "react";
import splash from "../public/icons/splash.svg";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { validatePassword } from "../components/constants";
import axios from "axios";

export default function Home({
  showPassword,
  login,
  isLoading,
  token,
  passwordDisplay,
  setPasswordDisplay,
  changeForm,
  signupDetails,
  setSignupDetails,
  createCaution,
  changer,
}) {
  const passwordField = useRef();
  const [loginDetails, setLoginDetails] = useState({
    passwordOne: "",
    passwordTwo: "",
    number: "",
    code: "+234",
  });
  const [passwordCheck, setPasswordCheck] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const router = useRouter();
  useEffect(() => {}, [passwordDisplay]);
  // console.log(router)

 

  useEffect(() => {
    if (createCaution) {
      let timer = setTimeout(() => {
        changer();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [createCaution]);

  async function signup(e) {
    e.preventDefault();

    if (loginDetails.passwordOne !== loginDetails.passwordTwo) {
      setPasswordCheck("Passwords must be the same");
      return;
    }

    if (!validatePassword(loginDetails.passwordOne)) {
      setPasswordCheck(
        "Password must be up to 8 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 special character and 1 number"
      );
      return;
    }

    let userNumber = loginDetails.number;
    if (userNumber.charAt(0) === "0") {
      userNumber = userNumber.slice(1);
    }

    setSubmitLoading(true);
    // debugger
    try {
      const signupResponse = await axios.post(
        "https://nddc-api.payrail.co/api/v1/auth/signup",
        {
          //http://localhost:8080/  http://35.158.104.113:55
          confirmPassword: loginDetails.passwordOne,
          password: loginDetails.passwordOne,
          phoneNumber: `${loginDetails.code}${userNumber}`,
          userType: "ORGANIZATION",
          classification: "INDIVIDUAL",
        }
      );

      if (signupResponse.status === 200) {        
        const phoneNumber = `+234${userNumber}`
        localStorage.setItem("phoneNumber", phoneNumber)
        router.push("/otp-verification");
        console.log("Signup successful:", signupResponse.data);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setPasswordCheck("error");
    } finally {
      setSubmitLoading(false);
    }
  }

  function handleFormChange(e) {
    // debugger
    if (e.target.name == "number") {
      if (
        (!Number(e.target.value + 1) && e.target.value != "") ||
        e.target.value.length == 12
      ) {
        return;
      }
    }

    setLoginDetails((currentDetails) => {
      return { ...currentDetails, [e.target.name]: e.target.value };
    });
  }

  return (
    <div className="w-full lg:w-[529px] m-auto h-full flex flex-col items-center p-[20px]">
      <div className="flex flex-col items-center px-[20px] m-auto w-full py-[5px] ">
        <section className="flex m-auto w-fit min-h-logo-height py-1 px-1 items-center">
          <div className=" relative w-[209px] h-[37px]">
            <img src="/images/logo-transparent.png" alt="NDDC logo" />
          </div>
        </section>
        <div
          id="container"
          className="mt-[60px] flex flex-col w-full lg:w-[529px] min-h-[550px] mb-[50px] border border-border-gray rounded-[48px]"
        >
          <section className="flex justify-center h-[61px] w-[90%] lg:w-[307px] items-center box-border m-auto my-[30px] rounded-[30.5px] bg-[#f9f9f9]">
            <section className="w-[159px] h-[49px] rounded-[24.5px] flex items-center text-[los] justify-center bg-gradient-to-r text-[#ffffff] from-[#003B49] to-[#2DCD7C]">
              Sign up
            </section>
          </section>

          <h2 className="mt-[10px] text-center text-[10px] w-[250px] text-[red] self-center font-[600]">
            {passwordCheck}
          </h2>

          <section className="flex flex-col">
            <section className="text-center font-pushpennyBook text-[16px] leading-[15.62px] h-[20px] font-[700] w-3/5 self-center">
              {createCaution
                ? "Incorrect Password or Username, try again."
                : ""}
            </section>
            <section className="w-[90%] md:w-[427px] mt-[20px] h-[57px] relative justify-between bg-[#f9f9f9] pr-6 border m-auto border-border-gray rounded-[28.5px] flex items-center">
              <input
                value={loginDetails.number}
                onChange={(e) => {
                  handleFormChange(e);
                }}
                id="phone-number"
                name="number"
                className="ml-10 border-0 bg-input-gray w-4/5 focus:border-none outline-none"
                type="tel"
                placeholder="Phone Number"
              />
            </section>
            <section className="w-[90%] md:w-[427px] mt-[20px] h-[57px] relative justify-between bg-[#f9f9f9] pr-6 border m-auto border-border-gray rounded-[28.5px] flex items-center">
              <input
                value={loginDetails.passwordOne}
                name="passwordOne"
                onChange={(e) => {
                  handleFormChange(e);
                }}
                id="password"
                ref={passwordField}
                className="ml-10 w-4/6 z-10 focus:border-none outline-none bg-input-gray"
                type={passwordDisplay.password}
                placeholder="Password"
              />
              <button
                onClick={() => {
                  showPassword(
                    passwordField,
                    setPasswordDisplay,
                    passwordDisplay
                  );
                }}
                className="bg-input-gray z-30 px-3 ml-auto cursor-pointer rounded-[10px]"
              >
                {passwordDisplay.password == "password" ? "Show" : "Hide"}
              </button>
            </section>
            <section className="w-[90%] md:w-[427px] mt-[20px] h-[57px] relative justify-between bg-[#f9f9f9] pr-6 border m-auto border-border-gray rounded-[28.5px] flex items-center">
              <input
                value={loginDetails.passwordTwo}
                name="passwordTwo"
                onChange={(e) => {
                  handleFormChange(e);
                }}
                id="password"
                ref={passwordField}
                className="ml-10 w-4/6 z-10 focus:border-none outline-none bg-input-gray"
                type={passwordDisplay.password}
                placeholder="Password"
              />
              <button
                onClick={() => {
                  showPassword(
                    passwordField,
                    setPasswordDisplay,
                    passwordDisplay
                  );
                }}
                className="bg-input-gray z-30 px-3 ml-auto cursor-pointer rounded-[10px]"
              >
                {passwordDisplay.password == "password" ? "Show" : "Hide"}
              </button>
            </section>
          </section>
          <section className="mt-[30px] gap-[20px] lg:gap-0 m-auto w-[90%] md:w-[425px] flex items-center justify-between">
            <section className="font-pushpennyBook text-[12px] leading-[15.62px]">
              Have an account already?{" "}
              <span
                onClick={(e) => {
                  signup(e);
                }}
                className="underline cursor-pointer sec-color"
              >
                {" "}
                Login instead{" "}
              </span>
            </section>
            <button
              disabled={submitLoading}
              onClick={(e) => {
                signup(e);
              }}
              className="bg-gradient-to-r from-[#003B49] to-[#2DCD7C] active:bg-white active:text-[#2DCD7C] w-[126px] h-[46px] font-[400] text-[#ffffff] rounded-[23px]"
            >
              {submitLoading ? "Signing you up..." : "Sign up"}
            </button>
          </section>
        </div>
      </div>
      {/* <AlertDialog props={dialogue} /> */}
    </div>
  );
}
