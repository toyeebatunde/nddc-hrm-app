
import { title } from "process"
import ImageHolder from "./ImageHolder"
export default function UserButton({ type, text, onClick, small=false, bg="bg-[white]", textColor, preventDefault="button" }) {
    if (type == "gradient") {
        return (
            <button type={preventDefault} onClick={onClick} className='bg-gradient-to-r from-[#EF6B25] to-[#F6BC18] text-[18px] font-pushpennyMedium font-500 text-white w-full h-full font-[400] text-[#ffffff] rounded-[23px]'>
                {text}
            </button>
        )
    }
    if (type == "edit") {
        return (
            <button type={preventDefault} onClick={onClick} className="w-full h-full flex justify-center gap-[15%] px-[5px] items-center text-white rounded-[24px] bg-black flex">
                <h2 className={`font-[400] font-pushPenny ${text == "Approve" ? "text-[17px]" : "text-[18px]"} `}>{text || "Edit"}</h2>
                <div className="w-[20px] h-[20px] relative">
                    <ImageHolder src='/icons/arrow.svg' />
                </div>
            </button>
        )
    }
    if (type == "transaction") {
        return (
            <button onClick={onClick} className="w-full h-full flex justify-center gap-[10px] px-[10px] items-center text-white rounded-[24px] bg-black flex">
                <h2 className="font-[400] font-pushPenny text-[18px]">{text || "Transaction History"}</h2>
                <div className="w-[20px] h-[20px] relative">
                    <ImageHolder src='/icons/chart.svg' />
                </div>
            </button>
        )
    }
    if (type == "delete") {
        return (
            <button type={preventDefault} onClick={onClick} className="w-full h-full flex justify-between px-[20px] items-center ml-[5px] text-white rounded-[24px] bg-black flex">
                <h2 className={`font-[400] font-pushPenny ${small ? "text-[15px]":"text-[18px]"}`}>Delete</h2>
                <div className="w-[20px] h-[20px] relative">
                    <ImageHolder src='/icons/delete.svg' />
                </div>
            </button>
        )
    }
    if (type == "view") {
        return (
            <button type={preventDefault} onClick={onClick} className="w-full h-full flex justify-center gap-[10%] px-[10px] items-center text-white rounded-[24px] bg-black flex">
                <h2 className="font-[400] font-pushPenny text-[18px]">{text}</h2>
                <div className="w-[20px] h-[20px] relative">
                    <ImageHolder src='/icons/view.svg' />
                </div>
            </button>
        )
    }
    if (type == "decline") {
        return (
            <button onClick={onClick} type={preventDefault} className="w-full h-full flex justify-between px-[10px] items-center ml-[5px] text-white rounded-[24px] bg-black flex">
                <h2 className="font-[400] text-[white] font-pushPenny text-[18px]">{text || "Decline"}</h2>
                <div className="w-[20px] h-[20px] relative">
                    <ImageHolder src='/icons/decline.svg' />
                </div>
            </button>
        )
    }
    if (type == "accept") {
        return (
            <button onClick={onClick} type={preventDefault} className="w-full h-full flex justify-between px-[10px] items-center ml-[5px] text-white rounded-[24px] bg-black flex">
                <h2 className="font-[400] font-pushPenny text-[14px]">{text || "Accept"}</h2>
                <div className="w-[20px] h-[20px] relative">
                    <ImageHolder src='/icons/check.svg' />
                </div>
            </button>
        )
    }
    if (type == "file") {
        return (
            <button type={preventDefault} className="w-full h-full flex justify-between px-[10px] items-center text-[#6E7883] border border-[#6E7883] rounded-[24px] bg-[#FBF4EB] flex">
                <h2 className="font-[500] font-pushPenny text-[14px]">Export CSV</h2>
                <div className="w-[20px] h-[20px] relative">
                    <ImageHolder src='/icons/file-text.svg' />
                </div>
            </button>
        )
    }
    if (type == "pdf") {
        return (
            <button type={preventDefault} className="w-full h-full flex justify-between px-[10px] border border-[#6E7883] items-center text-[#6E7883] rounded-[24px] bg-[#FBF4EB] flex">
                <h2 className="font-[500] font-pushPenny text-[14px]">Export PDF</h2>
                <div className="w-[20px] h-[20px] relative">
                    <ImageHolder src='/icons/file-pdf.svg' />
                </div>
            </button>
        )
    }
    return (
        <button onClick={onClick} className={` ${textColor} ${bg} border border-[#F3F3F3]  w-full h-full font-[400] rounded-[23px]`}>
            {text}
        </button>
    )
}