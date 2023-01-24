
export default function UserButton({ type, text }) {
    if (type == 2) {
        return (
            <button className='bg-gradient-to-r from-[#EF6B25] to-[#F6BC18] text-white w-[126px] h-[46px] font-[400] text-[#ffffff] rounded-[23px]'>
                {text}
            </button>
        )
    }

    return (
        <button className='bg-white border border-[#777777] text-[black] w-[126px] h-[46px] font-[400] text-[#ffffff] rounded-[23px]'>
            {text}
        </button>
    )
}