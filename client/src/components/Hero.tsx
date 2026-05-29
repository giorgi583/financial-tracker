import { MenuIcon, XIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import {motion} from "motion/react"
const Hero = () => {
     const [mobileOpen, setMobileOpen] = React.useState(false)

    return (
        <>
            <section id="hero" className='flex flex-col items-center bg-linear-to-b from-[#D9D9FF] to-[#F8F3F9] px-4 py-4' >
                <motion.nav
                animate={{y: [-50, 0], opacity: [0, 1]}}
                transition={{duration: 0.5}}
                className="flex items-center justify-between gap-8 bg-white/60 border border-white rounded-full px-4 md:px-2 py-2.5 w-full max-w-4xl" >
                    <a href="#" className='flex items-center md:pl-3'>
                        <h1 className="text-3xl font-bold text-sky-900">Monify</h1>
                    </a>
                    <div className='w-0.5 h-8 bg-gray-50 hidden md:flex'></div>
                    <div id="menu" className={`max-md:absolute max-md:bg-white/70 max-md:h-[785px] max-md:overflow-hidden max-md:transition-[width] max-md:duration-300 max-md:top-0 max-md:left-0 max-md:flex-col max-md:justify-center max-md:backdrop-blur flex items-center gap-8 z-50 md:gap-10 flex-1 ${mobileOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>
                        <a href="#hero" onClick={() => setMobileOpen(false)} className="text-gray-600 hover:text-gray-700 text-sm">Company</a>
                        <a href="#testimonials" onClick={() => setMobileOpen(false)} className="text-gray-600 hover:text-gray-700 text-sm">Testimonials</a>
                        <a href="#team" onClick={() => setMobileOpen(false)} className="text-gray-600 hover:text-gray-700 text-sm">Team</a>
                        <a href="#contact" onClick={() => setMobileOpen(false)} className="text-gray-600 hover:text-gray-700 text-sm">Contact Us</a>

                        <button id="close-menu" onClick={() => setMobileOpen(false)} className="md:hidden bg-sky-500 active:bg-sky-600 text-white p-2 rounded-md aspect-square font-medium transition">
                            <XIcon size={20} /> 
                        </button>
                    </div>

                    <div className="flex items-center gap-2 md:pr-1">
                        <Link to="/register" className="text-gray-700 hover:text-gray-900 text-sm transition">
                        <button className="!bg-sky-600 hover:bg-sky-700 !text-white hidden md:inline-block px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm transition cursor-pointer">
                            Sign Up
                        </button> </Link>

                        <button id="open-menu" onClick={() => setMobileOpen(true)} className="md:hidden text-gray-700 p-2 rounded-md aspect-square font-medium transition">
                            <MenuIcon />
                        </button>
                    </div>
                </motion.nav>

                <motion.div 
                animate={{y: [50, 0], opacity: [0, 1]}}
                transition={{duration: 0.5, delay: 0.2}}
                className="flex flex-wrap items-center justify-center gap-2 pl-2 pr-4 py-1.5 mt-30 rounded-full bg-white/50 border border-white">
                    <div className="relative flex size-3.5 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-300"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-green-600"></span>
                    </div>
                    <p className="text-sm text-black/60">Join 1000+ people growing with us</p>
                </motion.div>

                <motion.h1 
                animate={{y: [50, 0], opacity: [0, 1]}}
                transition={{duration: 0.5, delay: 0.4}}
                className='text-4xl md:text-[66px]/19 text-center max-w-2xl mt-8 text-gray-800 bg-clip-text leading-tight font-medium'>Your Financial Assistant powered by AI</motion.h1>
                <motion.p 
                animate={{y: [50, 0], opacity: [0, 1]}}
                transition={{duration: 0.5, delay: 0.6}}
                className="text-sm text-gray-600 text-center max-w-[630px] mt-4">
                    We help thousands of people easily manage their money and have full information about their financial wellbeing. 
                </motion.p>

                <motion.div 
                animate={{y: [50, 0], opacity: [0, 1]}}
                transition={{duration: 0.5, delay: 0.8}}
                className='mt-10'>
                    <Link to='/register'><button className="bg-sky-600 hover:bg-sky-700 text-white text-xs md:text-sm px-6 py-3 rounded-lg transition cursor-pointer">
                        Get Started Now
                    </button></Link>
            
                </motion.div>

                <div className='w-full max-w-[800px] h-[3px] mt-10 bg-linear-to-r from-white/10 via-sky-600 to-white/10'></div>

                <motion.div 
                initial={{y: 50, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                transition={{duration: 0.5, delay: 1}}
                viewport={{once: true}}
                className='grid grid-cols-2 md:grid-cols-4 gap-8 py-18 max-w-[930px] w-full'>
                    <div className='text-center'>
                        <h2 className='font-medium text-2xl md:text-3xl text-gray-800'>20+</h2>
                        <p className='text-xs md:text-sm text-gray-500'>Years Experience</p>
                    </div>
                    <div className='text-center'>
                        <h2 className='font-medium text-2xl md:text-3xl text-gray-800'>12k+</h2>
                        <p className='text-xs md:text-sm text-gray-500'>Projects Completed</p>
                    </div>
                    <div className='text-center'>
                        <h2 className='font-medium text-2xl md:text-3xl text-gray-800'>5k+</h2>
                        <p className='text-xs md:text-sm text-gray-500'>Happy Customers</p>
                    </div>
                    <div className='text-center'>
                        <h2 className='font-medium text-2xl md:text-3xl text-gray-800'>5+</h2>
                        <p className='text-xs md:text-sm text-gray-500'>Countries</p>
                    </div>
                </motion.div>
            </section>
        </>
    )
}

export default Hero