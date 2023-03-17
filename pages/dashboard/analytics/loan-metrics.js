
import { useState, useEffect, use } from "react"
import DateSelector from "../../../components/DateSelector"

export default function LoanMetrics({setToken, setDateRange, dateRange, week}) {
    // const [dateRange, setDateRange] = useState({ dateFrom: getPreviousDay(), dateTo: new Date() })

    // function getPreviousDay(date = new Date()) {
    //     const previous = new Date(date.getTime());
    //     previous.setDate(date.getDate() - 7);

    //     return previous;
    // }

    useEffect(()=>{
        setToken()
    },[])

    const ninety = "90"

    return (
        <div className="flex flex-col items-center pt-[60px] w-full">
            <section className="w-full flex flex-col sm:flex-row px-4 justify-between">
                <h4 className="font-pushpennyMedium text-[36px] leading-[47px]">
                    Metrics
                </h4>
                <DateSelector week={week} dateRange={dateRange} setDateRange={setDateRange} directionDown="/icons/direction-down.svg" />
            </section>
            <section className="flex flex-col items-center w-full xl:flex-row justify-between px-4 py-2">
                <section className="w-full lg:grow h-[375px] px-2 pt-2 flex flex-col items-start border border-[#dddddd] rounded-[8px]">
                    <section className="flex flex-col rounded-[4px] justify-around bg-brand-light-yellow items-start w-[280px] h-[106px]">
                        <section className="flex w-[240px] items-center justify-between">
                            <div className="w-[13px] h-[13px] rounded-[50%] bg-brand-yellow"></div>
                            <p>Disbursed loan</p>
                            <p>N800,000.00</p>
                        </section>
                        <section className="flex w-[240px] items-center justify-between">
                            <div className="w-[13px] h-[13px] rounded-[50%] bg-gray"></div>
                            <p>Overdue loan</p>
                            <p>N800,000.00</p>
                        </section>
                        <section className="flex w-[240px] items-center justify-between">
                            <div className="w-[13px] h-[13px] rounded-[50%] bg-black"></div>
                            <p>Recovered loan</p>
                            <p>N800,000.00</p>
                        </section>
                    </section>


                    <section className="flex justify-center items-center w-full h-[176px]">chart</section>
                </section>

                <section className="w-[400px] mt-[10px] xl:mt-0 xl:w-[500px] xl:ml-[5px] border rounded-[8px] border-[#dddddd] h-[375px] flex flex-col items-center justify-between py-4">
                    <section className="flex justify-between w-full px-4">
                        <p className="font-pushpennyMedium font-500 text-[13px] leading-[20px]">Transaction Overview</p>
                        <p className="font-400 font-pushpennyBook text-[14px] leading-[22px] cursor-pointer underline underline-offset-1">View all</p>
                    </section>
                    <section className="w-[100%] rounded-[8px] h-[231px] bg-brand-light-yellow flex justify-between items-center px-4">
                        <section className="flex flex-col relative justify-center items-center lg:w-[180px] h-[180px]">
                            <p className="font-pushpennyMedium text-[40px] leading-[52px] text-[#6e7883] font-500">21841</p>
                            <p className="font-pushpennyBook text-[12px] leading-[18px] text-black font-400">Total</p>
                            <div id="first-chart" className="pie z-30 animate-two no-round" style={{ "--p": `${ninety}`, "--c": "rgba(233, 158, 36, 1)", "--b": "25px" }}></div>
                            <div id="second-chart" className="pie z-20 animate no-round" style={{ "--p": "97", "--c": "black", "--b": "15px" }}></div>
                            <div id="first-chart" className="pie flex flex-col items-center z-10 animate-three no-round" style={{ "--p": "100", "--c": "gray", "--b": "20px" }}></div>
                            <div id="first-chart" className="pie flex flex-col items-center z-10 animate-three no-round" style={{ "--p": "97", "--c": "rgba(251, 244, 235, 1)", "--b": "25px" }}></div>
                        </section>
                        <section className="flex justify-between h-[180px] flex-col">
                            <section className="flex flex-col">
                                <p className="font-pushpennyMedium flex justify-end text-[20px] font-500 leading-[26px] text-[#6e7883]">14967</p>
                                <div className="flex justify-between w-[90px] items-center">
                                    <div className="w-[13px] h-[13px] rounded-[50%] bg-brand-yellow"></div>
                                    <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Requests</p>
                                </div>
                            </section>
                            <section className="flex flex-col">
                                <p className="font-pushpennyMedium flex justify-end text-[20px] font-500 leading-[26px] text-[#6e7883]">6008</p>
                                <div className="flex justify-between w-[90px] items-center">
                                    <div className="w-[13px] h-[13px] rounded-[50%] bg-black"></div>
                                    <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Recovered</p>
                                </div>
                            </section>
                            <section className="flex flex-col">
                                <p className="font-pushpennyMedium flex justify-end text-[20px] font-500 leading-[26px] text-[#6e7883]">74</p>
                                <div className="flex justify-between w-[90px] items-center">
                                    <div className="w-[13px] h-[13px] rounded-[50%] bg-gray"></div>
                                    <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Overdue</p>
                                </div>
                            </section>
                        </section>
                    </section>
                    <section className="flex justify-between items-center h-[44px] w-[304px]">
                        <section className="flex w-[70px] justify-between items-center">
                            <div className="w-[13px] h-[13px] rounded-[50%] bg-brand-yellow"></div>
                            <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Requests</p>
                        </section>
                        <section className="flex w-[75px] justify-between items-center">
                            <div className="w-[13px] h-[13px] rounded-[50%] bg-black"></div>
                            <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Recovered</p>
                        </section>
                        <section className="flex justify-between items-center w-[65px]">
                            <div className="w-[13px] h-[13px] rounded-[50%] bg-gray"></div>
                            <p className=" font-pushpennyBook font-400 text-[12px] leading-[18px]">Overdue</p>
                        </section>

                    </section>
                </section>
            </section>

            <section className="flex flex-col items-center w-full xl:flex-row justify-between px-4 py-2">

                <section className="w-full border xl:grow  h-[416px] border border-[#dddddd] pt-2 rounded-[10px] flex justify-between flex-col">
                    <section className="flex justify-between w-full px-4">
                        <p className="font-pushpennyMedium font-500 text-[13px] text-black leading-[20px]">Loan Requests</p>
                        <p className="font-400 font-pushpennyBook text-[14px] leading-[22px] cursor-pointer underline underline-offset-1">
                            View all
                        </p>
                    </section>
                    <section className="w-full h-[360px] pr-2 rounded-[10px] bg-brand-light-yellow flex flex-col items-center justify-around">
                        <section className="flex relative w-full h-[72px] justify-between items-center">
                            <div className=" flex justify-between px-2 items-center h-full grow overflow-auto">
                                <p className="font-pushpennyBook font-400 text-[15px] text-black leading-[18px]">AGL0000002</p>
                                <p className="font-pushpennyBook font-400 text-[15px] text-black leading-[18px]">Olajide Oladejo </p>
                                <p className="font-pushpennyBook font-400 text-[15px] text-black leading-[18px]">Agent </p>
                                <p className="font-pushpennyBook font-400 text-[16px] text-[#6e7883] leading-[18px]">N1000000</p>
                            </div>
                            <button className="w-[20%] z-[30] px-[2px] h-[36px] font-500 font-pushpennyMedium leading-[26px] text-[10px] mdxl:w-[155px] mdxl:text-[14px] rounded-[5px] bg-black text-white">Manage Request</button>
                        </section>
                        <section className="flex relative w-full h-[72px] justify-between items-center">
                            <div className=" flex justify-between px-2 items-center h-full grow overflow-auto">
                                <p className="font-pushpennyBook font-400 text-[15px] text-black leading-[18px]">AGL0000002</p>
                                <p className="font-pushpennyBook font-400 text-[15px] text-black leading-[18px]">Olajide Oladejo </p>
                                <p className="font-pushpennyBook font-400 text-[15px] text-black leading-[18px]">Agent </p>
                                <p className="font-pushpennyBook font-400 text-[16px] text-[#6e7883] leading-[18px]">N1000000</p>
                            </div>
                            <button className="w-[20%] z-[30] px-[2px] h-[36px] font-500 font-pushpennyMedium leading-[26px] text-[10px] mdxl:w-[155px] mdxl:text-[14px] rounded-[5px] bg-black text-white">Manage Request</button>
                        </section>
                        <section className="flex relative w-full h-[72px] justify-between items-center">
                            <div className=" flex justify-between px-2 items-center h-full grow overflow-auto">
                                <p className="font-pushpennyBook font-400 text-[15px] text-black leading-[18px]">AGL0000002</p>
                                <p className="font-pushpennyBook font-400 text-[15px] text-black leading-[18px]">Olajide Oladejo </p>
                                <p className="font-pushpennyBook font-400 text-[15px] text-black leading-[18px]">Agent </p>
                                <p className="font-pushpennyBook font-400 text-[16px] text-[#6e7883] leading-[18px]">N1000000</p>
                            </div>
                            <button className="w-[20%] z-[30] px-[2px] h-[36px] font-500 font-pushpennyMedium leading-[26px] text-[10px] mdxl:w-[155px] mdxl:text-[14px] rounded-[5px] bg-black text-white">Manage Request</button>
                        </section>
                        <section className="flex relative w-full h-[72px] justify-between items-center">
                            <div className=" flex justify-between px-2 items-center h-full grow overflow-auto">
                                <p className="font-pushpennyBook font-400 text-[15px] text-black leading-[18px]">AGL0000002</p>
                                <p className="font-pushpennyBook font-400 text-[15px] text-black leading-[18px]">Olajide Oladejo </p>
                                <p className="font-pushpennyBook font-400 text-[15px] text-black leading-[18px]">Agent </p>
                                <p className="font-pushpennyBook font-400 text-[16px] text-[#6e7883] leading-[18px]">N1000000</p>
                            </div>
                            <button className="w-[20%] z-[30] px-[2px] h-[36px] font-500 font-pushpennyMedium leading-[26px] text-[10px] mdxl:w-[155px] mdxl:text-[14px] rounded-[5px] bg-black text-white">Manage Request</button>
                        </section>
                        <section className="flex relative w-full h-[72px] justify-between items-center">
                            <div className=" flex justify-between px-2 items-center h-full grow overflow-auto">
                                <p className="font-pushpennyBook font-400 text-[15px] text-black leading-[18px]">AGL0000002</p>
                                <p className="font-pushpennyBook font-400 text-[15px] text-black leading-[18px]">Olajide Oladejo </p>
                                <p className="font-pushpennyBook font-400 text-[15px] text-black leading-[18px]">Agent </p>
                                <p className="font-pushpennyBook font-400 text-[16px] text-[#6e7883] leading-[18px]">N1000000</p>
                            </div>
                            <button className="w-[20%] z-[30] px-[2px] h-[36px] font-500 font-pushpennyMedium leading-[26px] text-[10px] mdxl:w-[155px] mdxl:text-[14px] rounded-[5px] bg-black text-white">Manage Request</button>
                        </section>
                    </section>

                </section>

                <section className="w-[400px] xl:w-[500px] xl:ml-[5px] border rounded-[8px] border-[#dddddd] mt-[10px] xl:mt-0 h-[416px] flex flex-col items-center justify-between pt-2 ">
                    <section className="flex justify-between w-full px-4">
                        <p className="font-pushpennyMedium font-500 text-[13px] leading-[20px]">Overdue loan</p>
                        <p className="font-400 font-pushpennyBook text-[14px] leading-[22px] cursor-pointer underline underline-offset-1">
                            View all
                        </p>
                    </section>
                    <section className="flex w-full justify-between">
                        <section className="w-full h-[360px] rounded-[10px] bg-brand-light-yellow flex flex-col items-center justify-between">
                            <section className="flex min-w-full px-2 h-[72px] justify-between items-center">
                                <p className="font-pushpennyBook font-400 text-[15px] text-black leading-[18px]">Olajide Oladejo </p>
                                <p className="font-pushpennyBook font-400 text-[16px] text-[#6e7883] leading-[18px]">10 days</p>
                                <button className="w-[88px] h-[36px] font-500 font-pushpennyMedium leading-[26px] text-[14px] rounded-[5px] bg-black text-white">Notify</button>
                            </section>
                            <section className="flex min-w-full px-2 h-[72px] justify-between items-center">
                                <p className="font-pushpennyBook font-400 text-[15px] text-black leading-[18px]">Olajide Oladejo </p>
                                <p className="font-pushpennyBook font-400 text-[16px] text-[#6e7883] leading-[18px]">10 days</p>
                                <button className="w-[88px] h-[36px] font-500 font-pushpennyMedium leading-[26px] text-[14px] rounded-[5px] bg-black text-white">Notify</button>
                            </section>
                            <section className="flex min-w-full px-2 h-[72px] justify-between items-center">
                                <p className="font-pushpennyBook font-400 text-[15px] text-black leading-[18px]">Olajide Oladejo </p>
                                <p className="font-pushpennyBook font-400 text-[16px] text-[#6e7883] leading-[18px]">10 days</p>
                                <button className="w-[88px] h-[36px] font-500 font-pushpennyMedium leading-[26px] text-[14px] rounded-[5px] bg-black text-white">Notify</button>
                            </section>
                            <section className="flex min-w-full px-2 h-[72px] justify-between items-center">
                                <p className="font-pushpennyBook font-400 text-[15px] text-black leading-[18px]">Olajide Oladejo </p>
                                <p className="font-pushpennyBook font-400 text-[16px] text-[#6e7883] leading-[18px]">10 days</p>
                                <button className="w-[88px] h-[36px] font-500 font-pushpennyMedium leading-[26px] text-[14px] rounded-[5px] bg-black text-white">Notify</button>
                            </section>
                            <section className="flex min-w-full px-2 h-[72px] justify-between items-center">
                                <p className="font-pushpennyBook font-400 text-[15px] text-black leading-[18px]">Olajide Oladejo </p>
                                <p className="font-pushpennyBook font-400 text-[16px] text-[#6e7883] leading-[18px]">10 days</p>
                                <button className="w-[88px] h-[36px] font-500 font-pushpennyMedium leading-[26px] text-[14px] rounded-[5px] bg-black text-white">Notify</button>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </div>
    )
}