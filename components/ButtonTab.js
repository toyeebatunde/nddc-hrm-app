
import { useRouter } from "next/router"
import Link from "next/link"

export default function ButtonTab({ name, activeTab, setTab, tabKey, link = false, url }) {
    if (link) {
        return (
            <button key={tabKey} onClick={() => { setTab(name) }} className={`font-400 ${activeTab == name ? "system-active" : ""} z-30 h-full font-pushpennyBook text-gray leading-[23.44px] text-[12px] mdxl:text-[18px] flex items-start`}>
                <Link href={`${url}`}>
                    {name}
                </Link>
            </button>
        )
    }
    return (
        <button key={tabKey} onClick={() => { setTab(name) }} className={`font-400 ${activeTab == name ? "system-active" : ""} z-30 h-[44px] font-pushpennyBook text-gray leading-[23.44px] text-[12px] mdxl:text-[18px] flex items-start`}>{name}</button>
    )
}