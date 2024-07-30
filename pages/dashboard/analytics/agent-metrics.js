import ImageHolder from "../../../components/ImageHolder"
import axios from "axios"
import directionDown from '../../../public/icons/direction-down.svg'
import down from '../../../public/icons/down.svg'
import arrowUpGreen from '../../../public/icons/arrow-up-green-circle.svg'
import useSWR, { mutate } from "swr"
// import TheCalendar from "../../components/calendar"
import { useState, useEffect, useMemo } from "react"
import DateSelector from "../../../components/DateSelector"
import { testEnv } from "../../../components/Endpoints"
import MetricLayoutTemplate from "../../../components/MetricLayoutTemplate"
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';

export default function AgentMetrics({ setToken, setDateRange, dateRange, week, setActiveDashboard, setActiveState, reformatDate }) {
    // const [isCalendar, setIsCalendar] = useState(false)
    const [analytics, setAnalytics] = useState({ dayTotal: 0, weekTotal: 0, monthTotal: 0, yearTotal: 0 })
    const [mount, setMount] = useState(1)
    const [totalTransactions, setTotalTransactions] = useState({ total: null, successful: 0, failed: 0, reversed: 0 })
    const [agentStats, setAgentStats] = useState({
        activeAgents: 0,
        inActiveAgents: 0,
        allAgents: 0,
        dailyActiveAgents: 0,
        monthlyActiveAgents: 0,
        alluvialAgents: 0,
        mercyCorpsAgents: 0,
        usaidAgents: 0,
        totalNewAgents: 0
    })
    const [todaysTransactions, setTodaysTransactions] = useState({ total: 0, successful: 0, failed: 0, reversed: 0 })
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data: transactionsTodayData, error: transactionsTodayDataError } = useSWR(`${testEnv}v1/analytics/transaction_stats/filter_by_dates_between?from=2024-06-27&to=2024-06-29`, fetching)
    const { data: transactionsData, error: transactionsDataError } = useSWR(`${testEnv}v1/analytics/transaction_stats/filter_by_dates_between?from=${reformatDate(dateRange.dateFrom)}&to=${reformatDate(dateRange.dateTo)}`, fetching)
    const { data: agentsData, error: agentsDataError } = useSWR(`${testEnv}v1/analytics/agents_stats`, fetching)
    const auth = { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }

    // const { data: transactionsData, error: transactionsDataError } = useSWR(`${testEnv}v1/analytics/transaction_stats/filter_by_dates_between?from=${reformatDate(dateRange.dateFrom)}&to=${reformatDate(dateRange.dateTo)}`, fetching)
    // https://admapis-staging.payrail.co/v1/analytics/transaction_stats/filter_by_dates_between?from=2022-01-01&to=2022-05-29
    // ${testEnv}v1/analytics/transaction_stats/filter_by_dates_between?from=${formatDate(dateRange.dateFrom)}&to=${formatDate(dateRange.dateTo)}

    // function formatDate(date) {
    //     var d = date.getDate(), // mount == 1 ? date.getUTCDate() == 31 || date.getUTCDate() == 30 || date.getUTCDate() == 28 || date.getUTCDate() == 29 ?  "1" :  (date.getUTCDate()).toString() : date.getUTCDate() == 31 || date.getUTCDate() == 30 || date.getUTCDate() == 28 || date.getUTCDate() == 29 ?  "1" :  (date.getUTCDate()+1).toString(),
    //         m = date.getMonth()+1 ,//(date.getUTCMonth() + 1).toString(),
    //         y = date.getFullYear().toString(), // date.getUTCFullYear().toString(),
    //         formatted = '',
    //         otherDate = date.getDate();
    //     // debugger
    //     if (d.length === 1) {
    //         d = '0' + d;
    //     }
    //     if (m.length === 1) {
    //         m = '0' + m;
    //     }
    //     formatted = y + '-' + m + '-' + d;
    //     // debugger
    //     // setMount(mount+1)
    //     return formatted;
    // }

    function newFormatDate(date = new Date()) {
        var d = date.getDate().toString(), // mount == 1 ? date.getUTCDate() == 31 || date.getUTCDate() == 30 || date.getUTCDate() == 28 || date.getUTCDate() == 29 ?  "1" :  (date.getUTCDate()).toString() : date.getUTCDate() == 31 || date.getUTCDate() == 30 || date.getUTCDate() == 28 || date.getUTCDate() == 29 ?  "1" :  (date.getUTCDate()+1).toString(),
            dPlusOne = (date.getDate() + 1).toString(),
            m = (date.getMonth() + 1).toString(),
            y = date.getFullYear().toString(),
            formatted = '',
            otherDate = date.getDate();
        // debugger
        if (d.length === 1) {
            d = '0' + d;
        }
        if (m.length === 1) {
            m = '0' + m;
        }
        formatted = { to: y + '-' + m + '-' + dPlusOne, from: y + '-' + m + '-' + d }
        // debugger
        // setMount(mount+1)
        return formatted;
    }

    useEffect(() => {
        const currAnalytics = localStorage.getItem("currentAnalytics")
        const agentsData = localStorage.getItem("agentStats")
        if (currAnalytics) {
            setAnalytics(JSON.parse(currAnalytics))
        }
        if (agentsData) {
            setAgentStats(JSON.parse(agentsData))
        }
    }, [])

    useEffect(() => {
        const fetchAnalytics = async () => {
          try {
            const dateRanges = getDateRanges();
            const dayData = axios.get(`${testEnv}v1/analytics/transaction_stats/filter_by_dates_between?from=${dateRanges.day.from}&to=${dateRanges.day.to}`, auth);
            const weekData = axios.get(`${testEnv}v1/analytics/transaction_stats/filter_by_dates_between?from=${dateRanges.week.from}&to=${dateRanges.day.to}`, auth);
            const monthData = axios.get(`${testEnv}v1/analytics/transaction_stats/filter_by_dates_between?from=${dateRanges.month.from}&to=${dateRanges.day.to}`, auth);
            const yearData = axios.get(`${testEnv}v1/analytics/transaction_stats/filter_by_dates_between?from=${dateRanges.year.from}&to=${dateRanges.day.to}`, auth);
    
            const [dayResponse, weekResponse, monthResponse, yearResponse] = await Promise.all([dayData, weekData, monthData, yearData]);    
            const currentAnalytics = {
              dayTotal: dayResponse.data.data.noOfSuccessfulTransactions + dayResponse.data.data.noOfReversedTransactions + dayResponse.data.data.noOfFailedTransactions,
              weekTotal: weekResponse.data.data.noOfSuccessfulTransactions + weekResponse.data.data.noOfReversedTransactions + weekResponse.data.data.noOfFailedTransactions,
              monthTotal: monthResponse.data.data.noOfSuccessfulTransactions + monthResponse.data.data.noOfReversedTransactions + monthResponse.data.data.noOfFailedTransactions,
              yearTotal: yearResponse.data.data.noOfSuccessfulTransactions + yearResponse.data.data.noOfReversedTransactions + yearResponse.data.data.noOfFailedTransactions,
            };
    
            localStorage.setItem("currentAnalytics", JSON.stringify(currentAnalytics));
            setAnalytics(currentAnalytics);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchAnalytics();
      }, []);


    function getDateRanges() {
        const formatDate = (date) => {
            return date.toISOString().split('T')[0];
        };

        const today = new Date();
        const yesterday = new Date(today);
        const tomorrow = new Date(today);
        const lastDayOfLastMonth = new Date(today);
        const lastDayOfLastYear = new Date(today);
        const lastSundayOrSaturday = new Date(today);

        yesterday.setDate(today.getDate() - 1);
        tomorrow.setDate(today.getDate() + 1);

        lastDayOfLastMonth.setMonth(today.getMonth() - 1);
        lastDayOfLastMonth.setDate(0);

        lastDayOfLastYear.setFullYear(today.getFullYear() - 1);
        lastDayOfLastYear.setMonth(11);
        lastDayOfLastYear.setDate(31);

        if (today.getDay() === 0) {
            lastSundayOrSaturday.setDate(today.getDate() - 1);
        } else {
            lastSundayOrSaturday.setDate(today.getDate() - today.getDay());
        }

        return {
            day: {
                from: formatDate(yesterday),
                to: formatDate(tomorrow),
            },
            week: {
                from: formatDate(lastSundayOrSaturday),
            },
            month: {
                from: formatDate(lastDayOfLastMonth),
            },
            year: {
                from: formatDate(lastDayOfLastYear),
            }
        };
    }

    // useEffect(() => {
    //     console.log("Success Percentage: ", Math.floor((totalTransactions.successful / totalTransactions.total) * 100) + " Failure Percentage: ", Math.ceil((totalTransactions.failed / totalTransactions.total) * 100) + Math.floor((totalTransactions.successful / totalTransactions.total) * 100))
    //     axios.get(`${testEnv}v1/analytics/transaction_stats/filter_by_dates_between?from=${reformatDate(dateRange.dateFrom)}&to=${reformatDate(dateRange.dateFrom)}`,
    //         { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
    //     )
    //         .then(response => {
    //             console.log("today: ", response.data)
    //         })
    // }, [dateRange.dateFrom, dateRange.dateTo])


    useEffect(() => {
        setTotalTransactions({...totalTransactions, total: null})
        mutate(`${testEnv}v1/analytics/transaction_stats/filter_by_dates_between?from=${reformatDate(dateRange.dateFrom)}&to=${reformatDate(dateRange.dateTo)}`)
    }, [dateRange.dateFrom, dateRange.dateTo])

    useEffect(() => {
        setActiveDashboard("AgentMetrics")
        setActiveState("0")
        if (transactionsData) {
            setTotalTransactions({ ...totalTransactions, total: transactionsData.data.noOfSuccessfulTransactions + transactionsData.data.noOfReversedTransactions + transactionsData.data.noOfFailedTransactions, successful: transactionsData.data.noOfSuccessfulTransactions, failed: transactionsData.data.noOfFailedTransactions, reversed: transactionsData.data.noOfReversedTransactions })
        }
        if (transactionsDataError) {
            console.log(transactionsDataError)
        }
    }, [transactionsData])

    

    useEffect(() => {
        if (agentsData) {
            setAgentStats(agentsData.data)
            localStorage.setItem("agentStats", JSON.stringify(agentsData.data))
        }
    }, [agentsData])

    function dateSearch() { }
    //  ${totalTransactions.reversed == 0 ? Math.ceil((totalTransactions.failed / totalTransactions.total) * 100) + Math.ceil((totalTransactions.successful / totalTransactions.total) * 100) : Math.floor((totalTransactions.failed / totalTransactions.total) * 100) + Math.floor((totalTransactions.successful / totalTransactions.total) * 100)}

    const ninety = "90"
    return (
        <div className="flex flex-col items-center pt-[60px] w-full">
            {/* <section className="w-full flex flex-col sm:flex-row px-4 justify-between">
                <h4 className="font-pushpennyMedium text-[36px] leading-[47px]">
                    Metrics
                </h4>
                <div className=" grow flex justify-end">
                    <DateSelector week={week} dateRange={dateRange} setDateRange={setDateRange} directionDown={directionDown} />
                </div>
            </section> */}
            <section className="flex flex-col xl:flex-row items-center w-full  justify-between px-4 py-2 ">
                {/* <section className="w-full xl:grow h-[375px] flex flex-col items-center border border-[#dddddd] rounded-[8px]">
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
                </section> */}


                <section className="lg:w-[400px] xl:ml-[5px] xl:mt-0 border rounded-[8px] mt-[10px] border-[#dddddd] h-[375px] flex flex-col items-center justify-between py-4">
                    <section className="flex justify-between w-full px-4">
                        <p className="font-pushpennyMedium font-500 text-[13px] leading-[20px]">Transaction Overview</p>
                        <p className="font-400 font-pushpennyBook text-[14px] leading-[22px] cursor-pointer underline underline-offset-1">View all</p>
                    </section>
                    {totalTransactions.total == null && (
                        <section className={`w-[100%] rounded-[8px] h-[231px] relative bg-brand-light-yellow flex justify-between items-center px-4`}>
                            <Box className="justify-center w-full flex">
                                <CircularProgress sx={{ color: "#dddddd" }} className=" border-[#dddddd]" />
                            </Box>
                        </section>
                    )}
                    {totalTransactions.total != null && (
                        <section className="w-[100%] rounded-[8px] h-[231px] relative bg-brand-light-yellow flex justify-between items-center px-4">
                            <section className="flex flex-col justify-center items-center w-[180px] h-[180px]">
                                <p className="font-pushpennyMedium text-[40px] leading-[52px] text-[#6e7883] font-500">{totalTransactions.total}</p>
                                <p className="font-pushpennyBook text-[12px] leading-[18px] text-black font-400">Total</p>
                                <div id="first-chart" className="pie z-30 animate-two no-round" style={{ "--p": `${Math.floor((totalTransactions.successful / totalTransactions.total) * 100)}`, "--c": "rgba(233, 158, 36, 1)", "--b": "25px" }}></div>
                                <div id="second-chart" className="pie z-20 animate no-round" style={{ "--p": `${totalTransactions.reversed == 0 ? Math.ceil((totalTransactions.failed / totalTransactions.total) * 100) + Math.ceil((totalTransactions.successful / totalTransactions.total) * 100) : Math.floor((totalTransactions.failed / totalTransactions.total) * 100) + Math.floor((totalTransactions.successful / totalTransactions.total) * 100)}`, "--c": "black", "--b": "20px" }}></div>
                                <div id="first-chart" className="pie flex flex-col items-center z-10 animate-three no-round" style={{ "--p": "100", "--c": "gray", "--b": "15px" }}></div>
                                <div id="first-chart" className="pie flex flex-col items-center z-10 animate-three no-round" style={{ "--p": "70", "--c": "rgba(251, 244, 235, 1)", "--b": "25px" }}></div>
                            </section>
                            <section className="flex  justify-between h-[180px] flex-col">
                                <section className="flex flex-col">
                                    <p className="font-pushpennyMedium flex justify-end text-[20px] font-500 leading-[26px] text-[#6e7883]">{totalTransactions.successful}</p>
                                    <div className="flex justify-between w-[90px] items-center">
                                        <div className="w-[13px] h-[13px] rounded-[50%] bg-brand-yellow"></div>
                                        <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Successful</p>
                                    </div>
                                </section>
                                <section className="flex flex-col">
                                    <p className="font-pushpennyMedium flex justify-end text-[20px] font-500 leading-[26px] text-[#6e7883]">{totalTransactions.failed}</p>
                                    <div className="flex justify-between w-[90px] items-center">
                                        <div className="w-[13px] h-[13px] rounded-[50%] bg-black"></div>
                                        <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Failed</p>
                                    </div>
                                </section>
                                <section className="flex flex-col">
                                    <p className="font-pushpennyMedium flex justify-end text-[20px] font-500 leading-[26px] text-[#6e7883]">{totalTransactions.reversed}</p>
                                    <div className="flex justify-between w-[90px] items-center">
                                        <div className="w-[13px] h-[13px] rounded-[50%] bg-gray"></div>
                                        <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Reversed</p>
                                    </div>
                                </section>
                            </section>
                        </section>
                    )}
                    <section className="flex justify-between h-[44px] px-2 w-full">
                        <section className="flex flex-col">
                            <p className="font-pushpennyMedium font-500 text-[20px] leading-[26px]">{analytics.dayTotal}</p>
                            <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Today</p>
                        </section>
                        <section className="flex flex-col">
                            <p className="font-pushpennyMedium font-500 text-[20px] leading-[26px]">{analytics.weekTotal}</p>
                            <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Week</p>
                        </section>
                        <section className="flex flex-col">
                            <p className="font-pushpennyMedium font-500 text-[20px] leading-[26px]">{analytics.monthTotal}</p>
                            <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Month</p>
                        </section>
                        <section className="flex flex-col">
                            <p className="font-pushpennyMedium font-500 text-[20px] leading-[26px]">{analytics.yearTotal}</p>
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
                        <section className="flex w-[120px] ml-[10px] h-[23px] font-400 font-pushpennyBook text-[10px] leading-[13px]">
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
                        <section className="flex w-[108px] borde ml-[10px] h-[33px] font-400 font-pushpennyBook text-[10px] leading-[13px]">
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
                    <section className="flex w-[108px] ml-[10px] h-[23px] font-400 font-pushpennyBook text-[10px] leading-[13px]">
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
                        <section className="flex w-[108px] ml-[10px] h-[23px] font-400 font-pushpennyBook text-[10px] leading-[13px]">
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

            <section className="flex flex-col xl:flex-row items-center justify-between w-full mt-4">
                <section className="lg:w-[405px] border rounded-[8px] border-[#dddddd] h-[381px] flex flex-col items-center justify-between py-2 ">
                    <section className="flex justify-between w-full px-4">
                        <p className="font-pushpennyMedium font-500 text-[13px] leading-[20px]">Agent Growth</p>
                        <p className="font-400 font-pushpennyBook text-[14px] leading-[22px] cursor-pointer underline underline-offset-1">
                            View all agents
                        </p>
                    </section>
                    <section className="flex borde w-full justify-between">
                        <section className="flex pl-[4px] relative justify-around flex-col">
                            {agentStats.allAgents == 0 && (
                                <section className={`w-[80%] rounded-[8px] h-[231px] relative flex justify-between items-center px-4`}>
                                    <Box className="justify-center w-full flex">
                                        <CircularProgress sx={{ color: "#dddddd" }} className=" border-[#dddddd]" />
                                    </Box>
                                </section>
                            )}
                            {agentStats.allAgents > 0 && (
                                <section className="flex w-[160px] h-[180px] flex-col justify-center items-center ">
                                    <div id="first-chart" className="pie z-50 animate-two no-round" style={{ "--p": `${Math.ceil((agentStats.activeAgents / agentStats.allAgents) * 100).toString()}`, "--c": "rgba(233, 158, 36, 1)", "--b": "25px" }}></div>
                                    <div id="second-chart" className="pie z-30 animate no-round" style={{ "--p": "100", "--c": "black", "--b": "20px" }}></div>

                                    <p className="font-pushpennyMedium text-[40px] leading-[52px] text-[#6e7883] font-500">{agentStats.allAgents}</p>
                                    <p className="font-pushpennyBook text-[12px] leading-[18px] text-black font-400">All Agents</p>
                                </section>
                            )}


                            <section className="flex w-[180px] pr-[5px] justify-between borde h-[44px]">
                                <section className="flex flex-col">
                                    <h2 className="font-pushpennyMedium borde font-500 text-[20px] leading-[26px] text-[#6E7883]">{agentStats.alluvialAgents}</h2>
                                    <h2 className="font-400 font-pushpennyBook text-[12px] leading-[18px]">Alluvial</h2>
                                </section>
                                <section className="flex flex-col">
                                    <h2 className="font-pushpennyMedium borde font-500 text-[20px] leading-[26px] text-[#6E7883]">{agentStats.mercyCorpsAgents}</h2>
                                    <h2 className="font-400 font-pushpennyBook text-[12px] leading-[18px]">Mercy Corps</h2>
                                </section>
                                <section className="flex flex-col">
                                    <h2 className="font-pushpennyMedium borde font-500 text-[20px] leading-[26px] text-[#6E7883]">{agentStats.usaidAgents}</h2>
                                    <h2 className="font-400 font-pushpennyBook text-[12px] leading-[18px]">USAID</h2>
                                </section>
                            </section>
                        </section>
                        <section className="w-[160px] h-[282px] rounded-[10px] bg-brand-light-yellow flex flex-col items-center justify-between">
                            <div className="flex relative flex-col borde w-full items-center">
                                <p className="font-pushpennyMedium font-500 text-[60px] leading-[78px]">{agentStats.dailyActiveAgents}</p>
                                <section className="font-400 borde leading-[18px] font-pushpennyBook text-[12px]">Daily Active Users</section>
                            </div>
                            <div className="flex flex-col w-full justify-between items-center">
                                <p className="font-pushpennyMedium font-500 text-[60px] leading-[78px]">{agentStats.monthlyActiveAgents}</p>
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

// 

AgentMetrics.Layout = MetricLayoutTemplate