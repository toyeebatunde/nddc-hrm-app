// import Head from 'next/head'
// import ImageHolder from '../components/ImageHolder'
// import logoIcon from '../public/icons/logo-icon-gradient.svg'
// import payrailIcon from '../public/icons/payrail-logo-black.svg'
// import splash from '../public/icons/splash.svg'
// import Cookies from 'js-cookie'
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import base from "../components/Endpoints";

export default function Home({
  showPassword,
  login,
  isLoading,
  token,
  passwordDisplay,
  setPasswordDisplay,
  createCaution,
  changer,
}) {
  const passwordField = useRef();
  const router = useRouter();
  const [loginCaution, setLoginCaution] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {}, [passwordDisplay]);

  useEffect(() => {
    if (createCaution) {
      let timer = setTimeout(() => {
        changer();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [createCaution]);

  function changeForm(e) {
    setLoginDetails((currentDetails) => {
      return { ...currentDetails, [e.target.name]: e.target.value };
    });
  }

  function handleLoginCaution() {
    setLoginCaution(true);
  }

  useEffect(() => {
    if (loginCaution) {
      const cautionTimeout = setTimeout(() => {
        setLoginCaution(false);
        clearTimeout(cautionTimeout);
      }, 2000);
    }
  }, [loginCaution]);

  async function userLogin(e) {
    e.preventDefault();
    setLoading(true);

    let userNumber = loginDetails.username;
    if (userNumber.charAt(0) === "0") {
      userNumber = userNumber.slice(1);
    }

    try {
      const isLogged = await axios.post(
        `${base}login`,
        {
          password: `${loginDetails.password}`,
          phoneNumber: `+234${userNumber}`,
        }
      )
      
      if (isLogged.status === 200) {
        const { data, token } = isLogged.data;
        const { user, employer } = data;

        // const {user} = data.data
        debugger

        if (!user.status) {
          localStorage.setItem("phoneNumber", `+234${userNumber}`)
          const newOtp = await axios.post(
            `${base}api/v1/auth/resend-otp`,
            {
              phoneNumber: `+234${userNumber}`,
            }
          )
          router.push("/otp-verification");
          return
        }

        if (user.needSetup) {
          localStorage.setItem("token", token);
          localStorage.setItem("userDetails", JSON.stringify(user));
          router.push("/success");
          return;
        }


        
        localStorage.setItem("userDetails", JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("employer",JSON.stringify(employer));
        router.push("/dashboard/employee-management/post-internship-positions");
        setLoading(false);
       
      }
    } catch (error) {
      handleLoginCaution();
      console.error("Signin error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full lg:w-[529px] h-full m-auto flex flex-col items-center p-[20px]">
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
              Log in
            </section>
          </section>
          <section className="flex flex-col">
            <section className="font-pushpennyMedium text-[20px] md:text-[30px] text-center">
              Welcome back
            </section>

            <section className="text-center mt-[30px] font-pushpennyBook text-[10px] text-[red] self-center leading-[15.62px] h-[20px] font-[700] w-3/5">
              {loginCaution ? "Incorrect Password or Username, try again." : ""}
            </section>

            <section className="w-[90%] md:w-[427px] mt-[20px] h-[57px] relative justify-between bg-[#f9f9f9] pr-6 border m-auto border-border-gray rounded-[28.5px] flex items-center">
              <input
                value={loginDetails.username}
                onChange={(e) => {
                  changeForm(e);
                }}
                id="username"
                name="username"
                className="ml-10 border-0 bg-input-gray w-4/5 focus:border-none outline-none"
                type="text"
                placeholder="Registered Phone Number"
              />
            </section>
            <section className="w-[90%] md:w-[427px] mt-[20px] h-[57px] relative justify-between bg-[#f9f9f9] pr-6 border m-auto border-border-gray rounded-[28.5px] flex items-center">
              <input
                value={loginDetails.password}
                onChange={(e) => {
                  changeForm(e);
                }}
                id="password"
                name="password"
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
          <section className="my-[30px] gap-[20px] lg:gap-0 m-auto w-[90%] md:w-[425px] flex items-center justify-between">
            <section className="font-pushpennyBook text-[12px] leading-[15.62px]">
              Forget password?{" "}
              <span
                onClick={() => {
                  router.push("/reset");
                }}
                className="underline cursor-pointer sec-color"
              >
                {" "}
                Reset now{" "}
              </span>
            </section>
            <button
              disabled={
                loading ||
                loginDetails.password == "" ||
                loginDetails.username == ""
              }
              onClick={(e) => {
                userLogin(e);
              }}
              className="bg-gradient-to-r from-[#003B49] to-[#2DCD7C] active:bg-white active:text-[#2DCD7C] w-[126px] h-[46px] font-[400] text-[#ffffff] rounded-[23px]"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
