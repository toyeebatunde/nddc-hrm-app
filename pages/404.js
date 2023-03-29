import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function FourOhFour() {
    const [user, setUser] = useState()    

    useEffect(()=>{
        // async function setUser(user) {}
        const newUser = localStorage.getItem("user")
        setUser(JSON.parse(newUser))
    }, [])
    console.log(user?.name)
  return <>
    <h1 className='mt-[30%] w-[120px] m-auto text-center'>
        {`Hi ${user?.name} -yes we know it's you-, Angala Tech is still building this page, please try another tab.
        Thank You`}
    </h1>
    
  </>
}