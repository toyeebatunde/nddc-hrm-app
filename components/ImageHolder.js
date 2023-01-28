import Image from "next/image"

export default function ImageHolder({src, alt="image", priority=true}) {
    return (
        <>
        <Image
        src={src}
        alt={alt}
        layout="fill"
        priority={priority}
        id="img"
        >            
        </Image>
        </>
    )
}