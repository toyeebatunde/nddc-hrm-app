
import Image from "next/image"
export default function ImageHolder({src, alt="image", priority=true, uop=false}) {
    if(uop) {
        return (
            <>
            <Image
            unoptimized
            src={src}
            alt={alt}
            // layout="fill"
            fill
            priority={priority}
            id="img"
            >            
            </Image>
            </>
        )
    } 
    
    return (
        <>
        <Image
        src={src}
        alt={alt}
        // layout="fill"
        fill
        priority={priority}
        id="img"
        >            
        </Image>
        </>
    )
}