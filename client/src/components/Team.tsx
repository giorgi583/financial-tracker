import { Zap } from "lucide-react";
import {motion} from "motion/react"
export default function Team() {
    return (
        <>
            <section id="team" className='flex flex-col items-center justify-center gap-6 py-20 px-6 md:px-16 lg:px-24 xl:px-32 w-full min-h-screen'>
                <motion.button 
                initial={{y: 20, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                transition={{duration: 0.5}}
                viewport={{once: true}}
                className='flex items-center gap-2 text-indigo-600 text-sm px-6 py-3 rounded-full bg-indigo-50'>
                    <Zap size={16} />
                    Our team
                </motion.button>
                <motion.h2 
                initial={{y: 20, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                transition={{duration: 0.5, delay: 0.2}}
                viewport={{once: true}}
                className='font-semibold text-2xl text-gray-800 md:text-3xl max-w-lg text-center leading-10'>Meet the expert driving creativity and innovation</motion.h2>
                <motion.div 
                initial = 'hidden'
                whileInView = 'visible'
                variants={{
                    hidden: {y: 20, opacity: 0},
                    visible: {transition: {staggerChildren: 0.2, delayChildren: 0.2, duration: 0.5}, y: 0, opacity: 1}
                }}
                viewport={{once: true}}
                className="flex flex-wrap items-center justify-center gap-6 mt-6">
                    <motion.div variants={{hidden: {y: 20, opacity: 0}, visible: {y: 0, opacity: 1}}} className='relative group w-full max-w-2xs rounded-3xl overflow-hidden transform transition duration-300 hover:-translate-y-1'>
                        <img className='rounded-3xl' src='https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/team/user-1.png' alt="user1" />
                        <div className='absolute inset-0 bg-linear-to-b from-transparent via-[#951a20]/50 to-violet-500 pointer-events-none opacity-80'></div>
                        <div className='absolute bottom-6 left-6 right-6 flex items-center justify-between'>
                            <h3 className='text-xl text-white'>Jessica Brown</h3>
                            <div className="relative h-9 w-9 overflow-hidden rounded-full bg-violet-100 text-violet-900 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="absolute size-4.5 transition-transform duration-300 group-hover:translate-x-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"> <path d="M5 12h14" /> <path d="m12 5 7 7-7 7" /> </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" className="absolute size-4.5 -translate-x-6 transition-transform duration-300 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"> <path d="M5 12h14" /> <path d="m12 5 7 7-7 7" /></svg>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div variants={{hidden: {y: 20, opacity: 0}, visible: {y: 0, opacity: 1}}} className='relative group w-full max-w-2xs rounded-3xl overflow-hidden transform transition duration-300 hover:-translate-y-1'>
                        <img src='https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/team/user-2.png' alt="user2" />
                        <div className='absolute inset-0 bg-linear-to-b from-transparent via-[#951a20]/50 to-violet-500 pointer-events-none opacity-80'></div>
                        <div className='absolute bottom-6 left-6 right-6 flex items-center justify-between'>
                            <h3 className='text-xl text-white'>Lillian Rivera</h3>
                            <div className="relative h-9 w-9 overflow-hidden rounded-full bg-violet-100 text-violet-900 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="absolute size-4.5 transition-transform duration-300 group-hover:translate-x-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"> <path d="M5 12h14" /> <path d="m12 5 7 7-7 7" /> </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" className="absolute size-4.5 -translate-x-6 transition-transform duration-300 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"> <path d="M5 12h14" /> <path d="m12 5 7 7-7 7" /></svg>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div variants={{hidden: {y: 20, opacity: 0}, visible: {y: 0, opacity: 1}}} className='relative group w-full rounded-3xl max-w-2xs overflow-hidden transform transition duration-300 hover:-translate-y-1'>
                        <img src='https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/team/user-3.png' alt="user3" />
                        <div className='absolute inset-0 bg-linear-to-b from-transparent via-[#951a20]/50 to-violet-500 pointer-events-none opacity-80'></div>
                        <div className='absolute bottom-6 left-6 right-6 flex items-center justify-between'>
                            <h3 className='text-xl text-white'>Michael Brown</h3>
                            <div className="relative h-9 w-9 overflow-hidden rounded-full bg-violet-100 text-violet-900 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="absolute size-4.5 transition-transform duration-300 group-hover:translate-x-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"> <path d="M5 12h14" /> <path d="m12 5 7 7-7 7" /> </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" className="absolute size-4.5 -translate-x-6 transition-transform duration-300 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"> <path d="M5 12h14" /> <path d="m12 5 7 7-7 7" /></svg>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>
        </>
    );
};