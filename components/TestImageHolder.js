import Image from "next/image"

export default function TestImageHolder(props) {
    return (
        <>
        <Image
        src={props.src}
        alt={props.alt ? props.alt: "pic"}
        layout={props.layout ? props.layout: "fill"}
        priority={props.priority? props.priority : "true"}
        >            
        </Image>
        </>
    )
}