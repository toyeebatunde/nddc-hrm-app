import Textfield from "./TextField"
import ImageHolder from "./ImageHolder"

export default function TableContainer({ children, pageSelector, entryValue }) {
    return (
        <div className="w-full flex gap-[10px] flex-col">
            <div className="w-full overflow-x-auto">
                <div className="w-[1115px] bg-brand-light-yellow rounded-[10px] pt-[10px] min-h-[674px]">
                    {children}
                </div>
            </div>
            <div className="flex px-[20px] justify-between w-full">
                <div className="flex items-center gap-[10px]">
                    <h2 className="font-pushpennyBook font-[400] text-[#6E7883] text-[14px] leading-[18px]">Show</h2>
                    <div className="w-[83px] h-[51px] rounded-[25.5px] border-[#D1D1D1] border">
                        <Textfield formEdit={pageSelector} type="pageSize" bg="bg-white" selectOptions={[5, 10, 15]} />
                    </div>
                    <h2 className="font-pushpennyBook font-[400] text-[#6E7883] text-[14px] leading-[18px]">entries</h2>
                </div>

                <div className="w-[83px] h-[51px] rounded-[25.5px] justify-center border-[#D1D1D1] border flex items-center">
                    <div className=' w-[40%] relative h-[100%] flex justify-center items-center leading-[28px] font-pushpennyBook text-[22px] font-[400]'>{entryValue.page + 1}</div>
                    <button onClick={(e) => { pageSelector(e, "none") }} className='w-[40%] h-[100%] relative justify-center flex items-center'>
                        <div className='w-[50%] relative h-[40%]'>
                            <ImageHolder src='/icons/forward.svg' />
                        </div>
                    </button>
                </div>

            </div>
        </div>
    )
}