import ImageHolder from "./ImageHolder"
import configSettingIcon from "../public/icons/config-setting.svg"

export default function ConfigCards({url, nodeKey, title, detail}) {
    return(
        <div key={nodeKey} className="px-2 shadow-md cursor-pointer hover:shadow-xl bg-white hover:border-gray hover:border w-[250px] h-[150px] xl:w-[318px] xl:h-[180px] flex flex-col rounded-[10px]">
            <section className="relative">
                <div className="relative w-[40px] h-[40px]">
                <ImageHolder src={url} />
                </div>
            </section>
            <p className="w-full mt-2 text-[17px] font-500 leading-[27px] font-pushpennyMedium">{title}</p>
            <p className=" w-full mt-2 text-[#6F6F6F] font-pushpennyBook text-[14px] leading-[22px]">{detail}</p>
        </div>
    )
}