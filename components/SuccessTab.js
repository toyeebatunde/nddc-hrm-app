
import ImageHolder from "./ImageHolder"

export default function SuccessTab() {
    return (
        <div className="bg-[#21D184] w-full lg:w-[410px] h-[32px] flex items-center justify-center gap-[20px] font-pushpennyBook font-[400] text-[14px] text-[white]">
            <div className="w-[24px] h-[24px]">
                <ImageHolder src="/icons/check-circle.svg" />
            </div>
            <span>Success. Awaiting approval</span>
        </div>
    )
}