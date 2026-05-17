
import { ArrowUp } from 'lucide-react'
import {useState, useEffect} from 'react'

const ProgressBar = () => {
    const [scrolledperc, setscrolledperc] = useState(0)
    const [upscroll, setupscroll] = useState(false)
    function handlescroll() {
        const scrolled = window.scrollY
        const scrollable = document.documentElement.scrollHeight - window.innerHeight
        setscrolledperc((scrolled/scrollable)*100)
        scrolled > 1500 ? setupscroll(true) : setupscroll(false)
        console.log(scrolled)
    }
useEffect(()=> {
window.addEventListener('scroll', ()=> { handlescroll()})
return window.removeEventListener('scroll', ()=> { handlescroll()})
}, [])
  return ( <>
    <div className='fixed z-10 top-0 left-0 h-1.5 bg-indigo-800' style={{width: `${scrolledperc}%`}}></div>
   {upscroll && <div onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'})}} className='fixed rounded-full z-10 cursor-pointer ring-2 ring-gray-100 p-3 flex items-center justify-center bottom-10 right-10 text-blue-950'><ArrowUp color='blue'/></div>} 
  </>
  )
}

export default ProgressBar