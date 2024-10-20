
import { title } from "process"
import ImageHolder from "./ImageHolder"
import { CSVLink } from "react-csv"

export default function UserButton({ type, text, onClick, small = false, bg = "bg-[white]", textColor, preventDefault = "button", disabled = false, alterImg = false, submit = "", currentData = [], headers }) {
    function dataToDownload() {
        // debugger
        // console.log("current data: ", currentData)
       const downloadable = currentData.map((data)=>{
            const newObject = {...data}
            return newObject
        })
        return downloadable
    }
    // console.log("disabled Status: ", disabled)
    if (type == "gradient") {
        return (
            <button disabled={disabled} type={preventDefault} onClick={onClick} className='bg-[#2dcd7c] text-[18px] active:bg-white font-pushpennyMedium font-500 text-white w-full h-full font-[400] text-[#ffffff] rounded-[23px]'>
                {text}
            </button>
        )
    }
    if (submit == "submit") {
        return (
            <button disabled={disabled} type={preventDefault} onClick={onClick} className='bg-gradient-to-r from-[#EF6B25] to-[#F6BC18] text-[18px] active:bg-white font-pushpennyMedium font-500 text-white w-full h-full font-[400] text-[#ffffff] rounded-[23px]'>
                {text}
            </button>
        )
    }
    if (type == "edit") {
        return (
            <button disabled={disabled} type={preventDefault} onClick={onClick} className={`w-full h-full flex justify-center gap-[10%] px-[10px] items-center text-white rounded-[24px] ${disabled ? "bg-[#6E7883]" : "bg-[#2dcd7c]"} active:bg-white flex`}>
                <h2 className={`font-[400] font-pushPenny ${text == "Approve" ? "text-[17px]" : "text-[18px]"} `}>{text || "Edit"}</h2>
                <div className="w-[20px] h-[20px] relative">
                    <ImageHolder src='/icons/arrow.svg' />
                </div>
            </button>
        )
    }
    if (type == "transaction") {
        return (
            <button onClick={onClick} className="w-full h-full flex justify-center gap-[10px] px-[10px] items-center text-white rounded-[24px] active:bg-white bg-black flex">
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
                <h2 className={`font-[400] font-pushPenny ${small ? "text-[15px]" : "text-[18px]"}`}>Delete</h2>
                <div className="w-[20px] h-[20px] relative">
                    <ImageHolder src='/icons/delete.svg' />
                </div>
            </button>
        )
    }
    if (type == "view") {
        return (
            <button disabled={disabled} type={preventDefault} onClick={onClick} className={`w-full h-full flex justify-center gap-[10%] px-[10px] active:bg-white items-center text-white rounded-[24px] ${disabled ? "bg-[#6E7883]" : "bg-[#2dcd7c] active:bg-white"} flex`}>
                <h2 className="font-[400] font-pushPenny text-[18px]">{text}</h2>
                <div className="w-[20px] h-[20px] relative">
                    <ImageHolder src={alterImg || '/icons/view.svg'} />
                </div>
            </button>
        )
    }
    if (type == "decline") {
        return (
            <button onClick={onClick} type={preventDefault} className="w-full h-full flex justify-between active:bg-white px-[10px] items-center ml-[5px] text-white rounded-[24px] bg-black flex">
                <h2 className="font-[400] text-[white] font-pushPenny text-[18px]">{text || "Decline"}</h2>
                <div className="w-[20px] h-[20px] relative">
                    <ImageHolder src='/icons/decline.svg' />
                </div>
            </button>
        )
    }
    if (type == "accept") {
        return (
            <button onClick={onClick} type={preventDefault} className="w-full h-full flex active:bg-white justify-between px-[10px] items-center ml-[5px] text-white rounded-[24px] bg-black flex">
                <h2 className="font-[400] font-pushPenny text-[14px]">{text || "Accept"}</h2>
                <div className="w-[20px] h-[20px] relative">
                    <ImageHolder src='/icons/check.svg' />
                </div>
            </button>
        )
    }
    if (type == "file") {
        return (
            <button className="w-full h-full flex justify-between px-[10px] items-center text-[#6E7883] border border-[#6E7883] rounded-[24px] bg-[#FBF4EB] flex">
                {/* <h2 className="font-[500] font-pushPenny text-[14px]">Export CSV</h2>
                <div className="w-[20px] h-[20px] relative">
                    <ImageHolder src='/icons/file-text.svg' />
                </div> */}
                <CSVLink
                    filename="data.csv"
                    data={dataToDownload()}
                    headers={headers}
                    className="flex justify-between w-full"                >
                    <h2 className="font-[500] font-pushPenny text-[14px]">Export CSV</h2>
                    <div className="w-[20px] h-[20px] relative">
                        <ImageHolder src='/icons/file-text.svg' />
                    </div>
                </CSVLink>
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
    if (type == "image") {
        return (
            <button onClick={onClick} type={preventDefault} className="w-[75%] h-[36px] flex justify-between px-[10px] border border-[#6E7883] items-center text-[#6E7883] rounded-[24px] bg-[#FBF4EB] flex">
                <h2 className="font-[500] font-pushPenny text-[14px]">{text}</h2>
            </button>
        )
    }
    return (
        <button onClick={onClick} className={` ${textColor} ${bg} border border-[#F3F3F3]  w-full h-full font-[400] rounded-[23px]`}>
            {text}
        </button>
    )
}