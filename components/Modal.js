
import UserButton from "./ButtonMaker"
import ImageHolder from "./ImageHolder"
export default function Modal({ modal, closeModal, type }) {
    return (
        <div id="modal" className="w-[350px] lg:rounded-[48px] lg:w-[529px] lg:h-[533px] flex flex-col justify-around items-center h-[500px] bg-white rounded-[15px]">
            <div className="w-[133px] h-[133px] flex justify-center items-center rounded-[50%] bg-[#F5F5F5]">
                <div className="w-[60px] h-[60px] relative">
                    <ImageHolder src="/icons/bin.svg" />
                </div>
            </div>
            <h2 className="w-[136px] h-[36px] font-pushpennyMedium text-[28px] font-[700]">Heads Up</h2>
            <h2 className="text-[18px] leading-[23px] mt-[10px] lg:w-[433px] lg:h-[57px] lg:text-center text-center font-pushpennyMedium">
                You are about to delete an institution, note after deleting it will go through approval process
            </h2>
            <div className="w-[330px] mt-[20px] h-[80px] rounded-[15px] relative bg-[#F3F3F3]">
                <h2 className="absolute font-pushpennyMedium ml-[15px] text-[10px] top-[-7px] h-[13px] bg-[#F3F3F3] px-[3px]">Reason for action</h2>
                <textarea className="h-full w-full rounded-[15px] bg-[#F3F3F3] outline-none px-[10px] py-[10px] w-full"></textarea>
            </div>
            <div className="w-full mt-[30px] w-[330px] flex justify-between">                
                <div className='w-[126px] h-[46px]'>
                <UserButton text="Cancel" />
                </div>
                <div className='w-[126px] h-[46px]'>
                <UserButton text="Save" type="gradient" />
                </div>
            </div>
        </div>
    )
}