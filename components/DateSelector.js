import TheCalendar from "./Calendar"
import ImageHolder from "./ImageHolder"
import { months } from "./Tabs"



export default function DateSelector({ dateRange, setDateSearchRange, setDateRange, directionDown, week, setSearch, getPreviousDay, setRangeParam }) {

    function getFormattedDate(date, week) {
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDate()
        // debugger

        if (week) {
            return (`${months[month]} ${day}`)
        }
        return (`${months[month]} ${day}, ${year}`)
    }
    return (
        <section className="flex justify-between w-full sm:w-[72%] md:w-[405px]">
            <div className="w-[144px] group  border flex h-[50px] px-2 rounded-[8px] justify-between items-center border-gray">
                <div className="font-[500] text-[16px] leading-[26px] cursor-pointer font-pushpennyMedium">{week.current}</div>
                <div className="flex justify-center items-center w-[24px] h-[24px]">
                    <div className=" relative cursor-pointer w-[25.5px] h-[65.5px]">
                        <div className=" m-auto mt-[30px] relative w-[11.5px] h-[5.5px]">
                            <ImageHolder src={directionDown} />

                        </div>
                        <div className="absolute hidden pb-4 bg-[#ffffff] z-40 group-hover:flex h-[179px] w-[144px] rounded-[8px] left-[-110px] top-[58px]">
                            <div className=" pb-4 bg-[#ffffff] z-40 flex flex-col h-[250px] w-[144px] mt-[1px] rounded-[8px] border">
                                <ul className="w-full h-full flex flex-col justify-around items-center">

                                    {week.days.map((day, index) => {
                                        return <li key={index} onClick={(e) => { setDateSearchRange(e, "week", index + 1) }} className="h-[20%] hover:bg-[#dddddd] bg-[#ffffff] cursor-pointer z-40 cursor-pointer w-[90%] border-b flex justify-center items-end border-[#dddddd] font-400 font-pushpennyMedium text-[18px] leading-[22px]">{getFormattedDate(day, "week")}</li>
                                    })}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative flex w-[253px] border h-[50px] group rounded-[8px]">
                <div className="w-[49%] border-r-[0.5px] h-full flex items-center justify-center font-pushpennyMedium font-500 cursor-pointer text-[16px] leading-[26px]">{getFormattedDate(dateRange.dateFrom)}</div>
                <div className="w-[49%] border-l-[0.5px] h-full flex items-center justify-center font-pushpennyMedium font-500 cursor-pointer text-[16px] leading-[26px]">{getFormattedDate(dateRange.dateTo)}</div>
                <div className="bg-[red min-h-[400px] right-0 w-[320px] md:w-[890px] z-[90] absolute hidden group-hover:flex mt-[49px] bg-white">
                    <div className="w-[100%] min-h-[400px] z-[70] bg-brand-light-yellow rounded-[10px] borde border-gray top-[9px] flex flex-col md:flex-row gap-[10px] md:justify-end p-[5px] box-border">
                        <div className="w-[100%] md:w-[344px] lg:w-[394px] rounded-[10px] borde bg-white border-gray flex justify-center">
                            <TheCalendar dateRangeParam={"dateFrom"} dateRange={dateRange} setDateRange={setDateRange} setSearch={setSearch} setRangeParam={setRangeParam} />
                        </div>
                        <div className="w-[100%] md:w-[344px] lg:w-[394px] rounded-[10px] borde bg-white border-gray flex justify-center">
                            <TheCalendar dateRangeParam={"dateTo"} dateRange={dateRange} setDateRange={setDateRange} setSearch={setSearch} setRangeParam={setRangeParam} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}