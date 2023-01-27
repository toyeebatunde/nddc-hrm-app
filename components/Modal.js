
import UserButton from "./ButtonMaker"
import ImageHolder from "./ImageHolder"
export default function Modal({ modal, closeModal }) {
    if (modal.bankDelete) {
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

    if (modal.teamModal) {
        return (
            <section className={`w-[350px] lg:rounded-[48px] lg:w-[529px] lg:h-[533px] flex flex-col justify-around items-center h-[500px] bg-white rounded-[15px]`}>
                <section className="flex justify-between">
                    <p className="font-pushpennyBold font-700 text-[28px] leading-[36.46px]">Invite a team mate</p>
                    <div className="w-[40px] h-[40px] relative cursor-pointer">
                    </div>
                </section>
                <p className="font-pushpennyBook text-[18px] leading-[26px] mt-4">Send an invitation to join your company’s Payrail account</p>
                <form className="flex flex-col mt-10 justify-between w-full h-[333px]">
                    <section className="flex justify-between relative w-full">
                        <div className="flex items-center justify-start pl-2 w-[232px] h-[62px] relative rounded-[28.5px] bg-[#F3F3F3]">
                            <label className="z-40 absolute top-[-7px] left-[30px] w-[59px] h-[14px] flex flex-col items-center justify-center" for="firstname">
                                <p className="z-30 font-400 text-[10px] leading-[13px] font-pushpennyBook">First Name</p>
                            </label>
                            <input id="firstname" name="firstname" className="bg-[#F3F3F3] h-[60%] rounded-[40px]" type="text" />
                        </div>
                        <div className="flex items-center justify-start pl-2 w-[232px] h-[62px] relative rounded-[28.5px] bg-[#F3F3F3]">
                            <label className="z-40 top-[-7px] absolute left-[30px] w-[59px] h-[14px] flex flex-col items-center justify-center" for="lastname">

                                <p className="z-30 font-400 text-[10px] leading-[13px] font-pushpennyBook">Last Name</p>
                            </label>
                            <input id="lastname" name="firstname" className="bg-[#F3F3F3] h-[60%] rounded-[40px]" type="text" />
                        </div>
                    </section>
                    <section>
                        <div className="flex items-center justify-start pl-2 w-full h-[62px] relative rounded-[28.5px] bg-[#F3F3F3]">
                            <label className="z-40 top-[-7px] absolute left-[30px] w-[59px] h-[14px] flex flex-col items-center justify-center" for="email">
                                <section className="w-full h-[50%] top-0 absolute bg-[#F3F3F3]"></section>
                                <p className="z-30 font-400 text-[10px] leading-[13px] font-pushpennyBook">email</p>
                            </label>
                            <input id="email" name="email" className="bg-[#F3F3F3] h-[60%] w-[90%] rounded-[40px]" type="text" />
                        </div>
                    </section>
                    <section>
                        <div className="flex items-center justify-start pl-2 w-full h-[62px] relative rounded-[28.5px] bg-[#F3F3F3]">
                            <label className="z-40 top-[-7px] absolute left-[30px] w-[59px] h-[14px] flex flex-col items-center justify-center" for="assign">
                                <section className="w-full h-[50%] top-0 absolute bg-[#F3F3F3]"></section>
                                <p className="z-30 font-400 text-[10px] leading-[13px] font-pushpennyBook">Assign role</p>
                            </label>
                            <input id="assign" name="assign" className="bg-[#F3F3F3] h-[60%] w-[90%] rounded-[40px]" type="text" />
                        </div>
                    </section>

                    <section className="flex justify-between relative w-full">
                        <div className="flex items-center font-pushpennyBook text-[14px] border border-[#F3F3F3] leading-[18px] font-400] justify-center pl-2 w-[186px] h-[57px] relative rounded-[28.5px]">
                            Cancel
                        </div>
                        <div className="flex items-center font-pushpennyBook text-[14px] leading-[18px] font-400] justify-center pl-2 w-[186px] h-[57px] relative rounded-[28.5px] bg-gradient-to-r text-[#ffffff] from-[#EF6B25] to-[#F6BC18]">
                            Send Invitations
                        </div>
                    </section>
                </form>
            </section>
        )
    }
}