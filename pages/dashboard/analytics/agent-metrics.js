import ImageHolder from "../../../components/ImageHolder"
import directionDown from '../../../public/icons/direction-down.svg'
import down from '../../../public/icons/down.svg'
import arrowUpGreen from '../../../public/icons/arrow-up-green-circle.svg'
// import TheCalendar from "../../components/calendar"
import { useState, useEffect } from "react"
import DateSelector from "../../../components/DateSelector"

export default function AgentMetrics({setToken, setDateRange, dateRange, week}) {
    const [isCalendar, setIsCalendar] = useState(false)
    // const [dateRange, setDateRange] = useState({ dateFrom: getPreviousDay(), dateTo: new Date() })

   


    // function getPreviousDay(date = new Date()) {
    //     const previous = new Date(date.getTime());
    //     previous.setDate(date.getDate() - 7);
    //     return previous;
    // }

    function dateSearch() {}

    const ninety = "90"
    return (
        <div className="flex flex-col items-center pt-[60px] w-full">
            <section className="w-full flex flex-col sm:flex-row px-4 justify-between">
                <h4 className="font-pushpennyMedium text-[36px] leading-[47px]">
                    Metrics
                </h4>
                <DateSelector week={week} dateRange={dateRange} setDateRange={setDateRange} directionDown={directionDown} />
            </section>
            <section className="flex flex-col xl:flex-row items-center w-full  justify-between px-4 py-2 ">
                <section className="w-full xl:grow h-[375px] flex flex-col items-center border border-[#dddddd] rounded-[8px]">
                    <section className="flex rounded-[4px] group relative justify-around bg-brand-light-yellow items-center w-[190px] h-[38px] font-400 font-pushpennyBook text-[10px] leading-[13px] text-[#161616]">
                        <p>TOTAL AGENT BALANCE</p>
                        <div className="relative w-[24px] h-[24px] flex justify-center items-center">
                            <ImageHolder src={down} />
                        </div>
                        <div className="hidden py-2 group-hover:flex absolute z-30 bg-[#ffffff] mt-[164px] w-[190px] h-[121px] flex-col rounded-[8px] border border-[#dddddd]">
                            <section className="font-400 flex hover:bg-brand-light-yellow justify-center items-center h-[50%]  font-pushpennyBook text-[10px] leading-[13px] text-[#161616]">TOTAL AGENT BALANCE</section>
                            <section className="font-400 flex hover:bg-brand-light-yellow justify-center items-center h-[50%] font-pushpennyBook text-[10px] leading-[13px] text-[#161616]">TOTAL FAILED TRANSACTIONS</section>
                        </div>
                    </section>
                    <section className="font-500 font-pushpennyMedium text-[40px] leading-[52px]">
                        N100,000,000.00
                    </section>
                    <section className="flex font-400 text-[12px] font-pushpennyBook leading-[18px] text-center">
                        <div className="relative w-[20px] h-[20px] flex justify-center items-center">
                            <ImageHolder src={arrowUpGreen} />
                        </div>
                        <p>N 0.00 Today, October 17</p>
                    </section>
                    <section className="border-b w-full lg:w-[631px] relative flex justify-center mt-4 h-[200px] ">
                        <div className=" flex flex-col justify-end items-center relative h-[230px] min-w-[30px] ">
                            <div className="bg-brand-yellow animate-chart flex flex-col justify-end pb-[2px] items-center w-[10px] h-[60px] rounded-t-[14px] mb-[14px]">
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[90%]"></div>
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[90%]"></div>
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[90%]"></div>
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[90%]"></div>
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[60%]"></div>

                            </div>
                            <div className="font-pushpennyMedium font-400 text-[14px] px-[6px] leading-[18px]">Mon</div>
                        </div>
                        <div className=" flex flex-col justify-end items-center relative h-[230px] min-w-[30px]">
                            <div className="bg-brand-yellow animate-chart flex flex-col justify-end pb-[2px] items-center w-[10px] h-[160px] rounded-t-[14px] mb-[14px]">
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[90%]"></div>
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[90%]"></div>
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[90%]"></div>
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[90%]"></div>
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[60%]"></div>

                            </div>
                            <div className="font-pushpennyMedium font-400 text-[14px] px-[6px] leading-[18px]">Tue</div>
                        </div>
                        <div className=" flex flex-col justify-end items-center relative h-[230px] min-w-[30px]">
                            <div className="bg-brand-yellow animate-chart flex flex-col justify-end pb-[2px] items-center w-[10px] h-[100px] rounded-t-[14px] mb-[14px]">
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[90%]"></div>
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[90%]"></div>
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[90%]"></div>
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[90%]"></div>
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[60%]"></div>

                            </div>
                            <div className="font-pushpennyMedium font-400 text-[14px] px-[6px] leading-[18px]">Wed</div>
                        </div>
                        <div className=" flex flex-col justify-end items-center relative h-[230px] min-w-[30px]">
                            <div className="bg-brand-yellow animate-chart flex flex-col justify-end pb-[2px] items-center w-[10px] h-[120px] rounded-t-[14px] mb-[14px]">
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[90%]"></div>
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[90%]"></div>
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[90%]"></div>
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[90%]"></div>
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[60%]"></div>

                            </div>
                            <div className="font-pushpennyMedium font-400 text-[14px] px-[6px] leading-[18px]">Thur</div>
                        </div>
                        <div className=" flex flex-col justify-end items-center relative h-[230px] min-w-[30px]">
                            <div className="bg-brand-yellow animate-chart flex flex-col justify-end pb-[2px] items-center w-[10px] h-[90px] rounded-t-[14px] mb-[14px]">
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[90%]"></div>
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[90%]"></div>
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[90%]"></div>
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[90%]"></div>
                                <div className="bg-white h-[1px] mb-[5px] origin-center -rotate-[32deg]  w-[60%]"></div>

                            </div>
                            <div className="font-pushpennyMedium font-400 text-[14px] px-[6px] leading-[18px]">Fri</div>
                        </div>
                    </section>
                </section>


                <section className="lg:w-[400px] xl:ml-[5px] xl:mt-0 border rounded-[8px] mt-[10px] border-[#dddddd] h-[375px] flex flex-col items-center justify-between py-4">
                    <section className="flex justify-between w-full px-4">
                        <p className="font-pushpennyMedium font-500 text-[13px] leading-[20px]">Transaction Overview</p>
                        <p className="font-400 font-pushpennyBook text-[14px] leading-[22px] cursor-pointer underline underline-offset-1">View all</p>
                    </section>
                    <section className="w-[100%] rounded-[8px] h-[231px] relative bg-brand-light-yellow flex justify-between items-center px-4">
                        <section className="flex flex-col justify-center items-center w-[180px] h-[180px]">
                            <p className="font-pushpennyMedium text-[40px] leading-[52px] text-[#6e7883] font-500">21841</p>
                            <p className="font-pushpennyBook text-[12px] leading-[18px] text-black font-400">Total</p>
                            <div id="first-chart" className="pie z-30 animate-two no-round" style={{ "--p": `${ninety}`, "--c": "rgba(233, 158, 36, 1)", "--b": "25px" }}></div>
                            <div id="second-chart" className="pie z-20 animate no-round" style={{ "--p": "97", "--c": "black", "--b": "15px" }}></div>
                            <div id="first-chart" className="pie flex flex-col items-center z-10 animate-three no-round" style={{ "--p": "100", "--c": "gray", "--b": "20px" }}></div>
                            <div id="first-chart" className="pie flex flex-col items-center z-10 animate-three no-round" style={{ "--p": "97", "--c": "rgba(251, 244, 235, 1)", "--b": "25px" }}></div>
                        </section>
                        <section className="flex  justify-between h-[180px] flex-col">
                            <section className="flex flex-col">
                                <p className="font-pushpennyMedium flex justify-end text-[20px] font-500 leading-[26px] text-[#6e7883]">14967</p>
                                <div className="flex justify-between w-[90px] items-center">
                                    <div className="w-[13px] h-[13px] rounded-[50%] bg-brand-yellow"></div>
                                    <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Successful</p>
                                </div>
                            </section>
                            <section className="flex flex-col">
                                <p className="font-pushpennyMedium flex justify-end text-[20px] font-500 leading-[26px] text-[#6e7883]">6008</p>
                                <div className="flex justify-between w-[90px] items-center">
                                    <div className="w-[13px] h-[13px] rounded-[50%] bg-black"></div>
                                    <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Failed</p>
                                </div>
                            </section>
                            <section className="flex flex-col">
                                <p className="font-pushpennyMedium flex justify-end text-[20px] font-500 leading-[26px] text-[#6e7883]">74</p>
                                <div className="flex justify-between w-[90px] items-center">
                                    <div className="w-[13px] h-[13px] rounded-[50%] bg-gray"></div>
                                    <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Reversed</p>
                                </div>
                            </section>
                        </section>
                    </section>
                    <section className="flex justify-between h-[44px] px-2 w-full">
                        <section className="flex flex-col">
                            <p className="font-pushpennyMedium font-500 text-[20px] leading-[26px]">20</p>
                            <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Today</p>
                        </section>
                        <section className="flex flex-col">
                            <p className="font-pushpennyMedium font-500 text-[20px] leading-[26px]">1358</p>
                            <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Week</p>
                        </section>
                        <section className="flex flex-col">
                            <p className="font-pushpennyMedium font-500 text-[20px] leading-[26px]">1389</p>
                            <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Month</p>
                        </section>
                        <section className="flex flex-col">
                            <p className="font-pushpennyMedium font-500 text-[20px] leading-[26px]">21049</p>
                            <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Year</p>
                        </section>
                    </section>
                </section>
            </section>
            <section className="w-[97.5%] h-fit border border-[#dddddd] rounded-[10px] flex flex-col xl:flex-row items-center justify-between px-4">
                <section className="flex sm:w-[70%] xl:w-fit xl:justify-betwen justify-around">
                <section className="flex justify-between items-center">
                    <section className=" flex z-30 w-fit relative h-[52px] font-500 leading-[52px] text-[#6E7883] font-pushpennyMedium text-[40px]">
                        <p className="z-30">03</p>
                        <section className="z-10 bg-brand-light-yellow -ml-[10px] h-[20px] w-[20px] flex justify-center items-center rounded-[30px] font-pushpennyMedium font-700 text-[6px] leading-[8px] ">
                            Secs
                        </section>
                    </section>
                    <section className="flex w-[78px] ml-[10px] h-[23px] font-400 font-pushpennyBook text-[10px] leading-[13px]">
                        Avg. completed transaction time
                    </section>
                </section>

                <section className="flex justify-between items-center">
                    <section className=" z-30 flex w-fit relative h-[52px] font-500 leading-[52px] text-[#6E7883] font-pushpennyMedium text-[40px]">
                        <p className="z-30">98</p>
                        <section className="z-10 -ml-[10px] bg-brand-light-yellow h-[20px] w-[20px] flex justify-center items-center rounded-[30px] font-pushpennyMedium font-700 text-[6px] leading-[8px] ">
                            %
                        </section>
                    </section>
                    <section className="flex w-[78px] ml-[10px] h-[23px] font-400 font-pushpennyBook text-[10px] leading-[13px]">
                        Payment <br></br>
                        Conversion rate
                    </section>
                </section>

                </section>
                <section className="flex sm:w-[40%] justify-around xl:w-fit xl:justify-between items-center">
                    <section className=" flex z-30 w-fit relative h-[52px] font-500 leading-[52px] text-[#6E7883] font-pushpennyMedium text-[40px]">
                        <p className="z-30">9,000,000</p>
                        <section className="z-10 bg-brand-light-yellow -ml-[10px] h-[20px] w-[20px] flex justify-center items-center rounded-[30px] font-pushpennyMedium font-700 text-[6px] leading-[8px] ">
                            N
                        </section>
                    </section>
                    <section className="flex w-[78px] ml-[10px] h-[23px] font-400 font-pushpennyBook text-[10px] leading-[13px]">
                        Lifetime Value <br></br>
                        Calculation
                    </section>
                </section>
                <section className="flex sm:w-[70%] justify-around xl:w-fit xl:justify-betwen">
                <section className="flex justify-between items-center">
                    <section className=" flex z-30 w-fit relative h-[52px] font-500 leading-[52px] text-[#6E7883] font-pushpennyMedium text-[40px]">
                        <p className="z-30">40</p>
                        <section className="z-10 -ml-[10px] bg-brand-light-yellow h-[20px] w-[20px] flex justify-center items-center rounded-[30px] font-pushpennyMedium font-700 text-[6px] leading-[8px] ">
                            %
                        </section>
                    </section>
                    <section className="flex w-[78px] ml-[10px] h-[23px] font-400 font-pushpennyBook text-[10px] leading-[13px]">
                        Rate of <br></br>
                        returning users
                    </section>
                </section>
                <section className="flex justify-between items-center">
                    <section className=" flex z-30 w-fit relative h-[52px] font-500 leading-[52px] text-[#6E7883] font-pushpennyMedium text-[40px]">
                        <p className="z-30">05</p>
                        <section className="z-10 -ml-[10px] bg-brand-light-yellow h-[20px] w-[20px] flex justify-center items-center rounded-[30px] font-pushpennyMedium font-700 text-[6px] leading-[8px] ">
                            %
                        </section>
                    </section>
                    <section className="flex w-[78px] ml-[10px] h-[23px] font-400 font-pushpennyBook text-[10px] leading-[13px]">
                        Abandonment <br></br>
                        Rate
                    </section>
                </section>
                </section>


            </section>
            <section className="flex flex-col xl:flex-row items-center justify-between w-full px-4 mt-4">
                <section className="lg:w-[396px] border rounded-[8px] border-[#dddddd] h-[381px] flex flex-col items-center justify-between py-2 ">
                    <section className="flex justify-between w-full px-4">
                        <p className="font-pushpennyMedium font-500 text-[13px] leading-[20px]">Agent Growth</p>
                        <p className="font-400 font-pushpennyBook text-[14px] leading-[22px] cursor-pointer underline underline-offset-1">
                            View all agents
                        </p>
                    </section>
                    <section className="flex w-full justify-between">
                        <section className="flex pl-2 relative justify-around flex-col">

                            <section className="flex w-[180px] h-[180px] flex-col justify-center items-center ">
                                <div id="first-chart" className="pie z-50 animate-two no-round" style={{ "--p": "90", "--c": "rgba(233, 158, 36, 1)", "--b": "25px" }}></div>
                                <div id="second-chart" className="pie z-30 animate no-round" style={{ "--p": "100", "--c": "black", "--b": "20px" }}></div>

                                <p className="font-pushpennyMedium text-[40px] leading-[52px] text-[#6e7883] font-500">5000</p>
                                <p className="font-pushpennyBook text-[12px] leading-[18px] text-black font-400">All Agents</p>
                            </section>
                            <section className="flex flex-col w-[176px] h-[44px]">
                                <section className=" w-full justify-between flex">
                                    <p className="font-pushpennyMedium font-500 text-[20px] leading-[26px] text-[#6E7883]">00</p>
                                    <p className="font-pushpennyMedium font-500 text-[20px] leading-[26px] text-[#6E7883]">00</p>
                                    <p className="font-pushpennyMedium font-500 text-[20px] leading-[26px] text-[#6E7883]">00</p>
                                </section>
                                <section className=" w-full justify-between flex font-400 font-pushpennyBook text-[12px] leading-[18px]">
                                    <p>Alluvial</p>
                                    <p>Mercy Corps</p>
                                    <p>USAID</p>
                                </section>
                            </section>
                        </section>
                        <section className="w-[160px] h-[282px] rounded-[10px] bg-brand-light-yellow flex flex-col items-center justify-between">
                            <div className="flex relative flex-col w-[106px] h-[80px] items-center">
                                <p className="font-pushpennyMedium font-500 text-[60px] leading-[78px]">100</p>
                                <section className="font-400 leading-[18px] font-pushpennyBook text-[12px]">Daily Active Users</section>
                            </div>
                            <div className="flex flex-col w-[106px] h-[80px] justify-between items-center">
                                <p className="font-pushpennyMedium font-500 text-[60px] leading-[78px]">98</p>
                                <p className="font-400 leading-[18px] font-pushpennyBook text-[12px]">Monthly Active Users</p>
                            </div>
                            <div className="flex w-full justify-around">
                                <div className="flex flex-col w-[36px] h-[38px]">
                                    <div className="bg-brand-yellow rounded-[50%] w-[13.5px] h-[13.5px]"></div>
                                    <p className="font-400 font-pushpennyBook text-[12px] leading-[18px]">Active</p>
                                </div>
                                <div className="flex flex-col w-[36px] h-[38px]">
                                    <div className="bg-black rounded-[50%] w-[13.5px] h-[13.5px]"></div>
                                    <p className="font-400 font-pushpennyBook text-[12px] leading-[18px]">Inactive</p>
                                </div>
                            </div>
                        </section>
                    </section>
                </section>

                <section className="w-full h-fit border border-[#dddddd] py-2 xl:h-[381px] rounded-[10px] flex justify-between flex-col xl:ml-[5px] xl:grow">
                    <section className="flex justify-between w-full px-4">
                        <p className="font-pushpennyMedium font-500 text-[13px] leading-[20px]">Reconciliation</p>
                        <p className="font-400 font-pushpennyBook text-[14px] leading-[22px] cursor-pointer underline underline-offset-1">
                            View all agents
                        </p>
                    </section>

                    <section className="flex flex-wrap xl:flex-nowrap justify-between">
                        <section className="w-fit sm:w-[48%] xlg:w-[34%] h-[282px] rounded-[10px] bg-brand-light-yellow flex justify-around pl-6 flex-col">
                            <section className="font-pushpennyBook font-400 text-[20px] leading-[26px]">Agent Commissions</section>
                            <section className="flex flex-col">
                                <p className="font-pushpennyBook text-[16px] leading-[26px] font-400">Agent</p>
                                <p className="font-pushpennyMedium font-500 text-[24px] leading-[31px]">N100,000.00</p>
                            </section>
                            <section className="flex flex-col">
                                <p className="font-pushpennyBook text-[16px] leading-[26px] font-400">Super Agent</p>
                                <p className="font-pushpennyMedium font-500 text-[24px] leading-[31px]">N132,100,000.00</p>
                            </section>
                        </section>
                        <section className="w-fit sm:w-[48%] xlg:w-[34%] h-[282px] rounded-[10px] bg-brand-light-yellow flex justify-around pl-6 flex-col">
                            <section className="font-pushpennyBook font-400 text-[20px] leading-[26px]">Recurring revenue</section>
                            <section className="flex flex-col">
                                <p className="font-pushpennyBook text-[16px] leading-[26px] font-400">Monthly</p>
                                <p className="font-pushpennyMedium font-500 text-[24px] leading-[31px]">N5,000,000.00</p>
                            </section>
                            <section className="flex flex-col">
                                <p className="font-pushpennyBook text-[16px] leading-[26px] font-400">Annual</p>
                                <p className="font-pushpennyMedium font-500 text-[24px] leading-[31px]">N36,000,000.00</p>
                            </section>
                        </section>
                        <section className="w- h-[282px] flex justify-center pl-6 flex-col">
                            <section className=" h-[108px] flex flex-col justify-between">
                                <p className="flex justify-end px-2 font-pushpennyMedium font-700 text-[16px] leading-[26px]">Bill Commissions</p>
                                <section className="flex group relative justify-end items-center w-full h-[24px] font-400 font-pushpennyBook text-[10px] leading-[13px] text-[#161616]">
                                    <p>AIRTIME</p>
                                    <div className="relative w-[24px] h-[24px] flex justify-center items-center">
                                        <div className="w-[11px] h-[10px] flex justify-center items-center relative">
                                            <ImageHolder src={down} />
                                        </div>
                                    </div>
                                    <ul className="hidden flex-col group-hover:flex absolute mt-[60px] border border-[#dddddd] bg-[#ffffff] h-fit z-30 w-full">
                                        <li className="w-full h-[29px] hover:bg-brand-light-yellow flex justify-end items-center font-400 px-2 font-pushpennyBook text-[10px] leading-[13px] text-[#161616]">Airtime</li>
                                        <li className="w-full h-[29px] hover:bg-brand-light-yellow flex justify-end items-center font-400 px-2 font-pushpennyBook text-[10px] leading-[13px] text-[#161616]">Data</li>
                                        <li className="w-full h-[29px] hover:bg-brand-light-yellow flex justify-end items-center font-400 px-2 font-pushpennyBook text-[10px] leading-[13px] text-[#161616]">Prepaid Electricity</li>
                                        <li className="w-full h-[29px] hover:bg-brand-light-yellow flex justify-end items-center font-400 px-2 font-pushpennyBook text-[10px] leading-[13px] text-[#161616]">Postpaid Electricity</li>
                                    </ul>
                                </section>
                                <p className=" flex justify-end px-2 font-pushpennyMedium font-500 text-[28px] leading-[52px]">N 0.00</p>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </div>
    )
}