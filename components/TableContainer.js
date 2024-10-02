import Textfield from "./TextField"
import ImageHolder from "./ImageHolder"
import { useState, useEffect } from "react"

export default function TableContainer({ children, pageSelector, entryValue, color = "bg-brand-light-yellow", totalPages }) {
    const [currentRange, setCurrentRange] = useState({ start: 1, end: 6 })
    useEffect(() => {
        setCurrentRange({ start: 1, end: 6 })
    }, [totalPages])
    let pageNum = 1
    const pageButtons = []
    for (let i = currentRange.start; i < currentRange.end; i++) {
        pageButtons.push(
            <button key={i} disabled={i > totalPages} className={`borde min-w-[40px] ${i > totalPages ? "text-[grey]" : ""}`} onClick={(e) => { pageSelector(e, "page") }}>
                {i}
            </button>
        )
    }

    function handlePage(op) {
        if (op == "add") {
            setCurrentRange({ ...currentRange, start: currentRange.end, end: currentRange.end + 5 })
            return
        }

        if (op == "back") {
            setCurrentRange({ ...currentRange, start: currentRange.start - 5, end: currentRange.start })
            return
        }
    }

    return (
        <div className="w-full gap-[20px] overflow-auto">
            <div className="w-full overflow-auto">
                <div className={`w-[1115px] px-[5px] xl:w-full pt-[20px] ${color} border border-[#DDDDDD] rounded-[10px] pt-[10px] min-h-[674px]`}>
                    {children}
                </div>

            </div>



            <div className="flex px-[20px] justify-between flex-col md:flex-row items-center gap-[5px] md:gap-0 w-full">
                <div className="flex items-center gap-[10px]">
                    <h2 className="font-pushpennyBook font-[400] text-[#6E7883] text-[14px] leading-[18px]">Show</h2>
                    <div className="w-[90px] h-[51px] rounded-[25.5px] border-[#D1D1D1] border">
                        <Textfield formEdit={pageSelector} type="pageSize" bg="bg-white" selectOptions={[25, 50, 100]} />
                    </div>
                    <h2 className="font-pushpennyBook font-[400] text-[#6E7883] text-[14px] leading-[18px]">entries</h2>
                </div>


                <div className="h-[51px] rounded-[25.5px] px-[5px] justify-center border-[#D1D1D1] border flex items-center gap-[10px] w-fit">
                    
                    <button disabled={currentRange.start == 1} onClick={(() => { handlePage("back") })} className='w-[15px] h-[15px] relative justify-center flex items-center'>
                        <div className='w-full relative h-full'>
                            <ImageHolder src='/icons/rewind.svg' />
                        </div>
                    </button>
                    <div className=' w-fit relative h-[100%] flex gap-[20px] items-center font-pushpennyBook text-[20px] font-[400]'>
                        {pageButtons.map((butt, index) => {
                            return butt
                        })}
                    </div>
                    <button disabled={currentRange.end > totalPages} onClick={(() => { handlePage("add") })} className='w-[15px] h-[15px] relative justify-center flex items-center'>
                        <div className='w-full relative h-full'>
                            <ImageHolder src='/icons/forward.svg' />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}