import Image from "next/image"

export default function ImageHolder({src, alt, priority=true}) {
    return (
        <>
        <Image
        src={src}
        alt={alt}
        layout="fill"
        priority={priority}
        >            
        </Image>
        </>
    )
}