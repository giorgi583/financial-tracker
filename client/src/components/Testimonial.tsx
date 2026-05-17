import {Star} from "lucide-react";
import Title from "./Title";
import {motion} from "motion/react"
export default function Testimonial() {
    return (
        <div id="testimonials" className="flex flex-col gap-15 mt-30">
<Title title="What Our Users Say" description=''/>
        <motion.div
        variants={{
            hidden: {y: 20, opacity: 0},
            visible: {transition: {staggerChildren: 0.2, delayChildren: 0.2}, y: 0, opacity: 1}
        }}
            initial="hidden"
            whileInView="visible"
        viewport={{once: true}}

        className="flex flex-wrap items-center justify-center gap-6 pt-14 pb-20">
            <motion.div
            variants={{
                hidden: {y: 20, opacity: 0},
                visible: {y: 0, opacity: 1}
            }}
            className="text-sm w-80 border border-gray-200 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5">
                <div className="flex flex-col items-center px-5 py-4 relative">
                    <img className="h-24 w-24 absolute -top-14 rounded-full" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="userImage1" />
                    <div className="pt-8 text-center">
                        <h1 className="text-lg font-medium text-gray-800">Donald Jackman</h1>
                        <p className="text-gray-800/80">Content Creator</p>
                    </div>
                </div>
                <p className="text-gray-500 px-6 text-center">I've been using monify for nearly two years and it has been incredibly user-friendly, making my work much easier.</p>
                <div className="flex justify-center pt-4">
                    <div className="flex gap-0.5">
                        <Star className="text-yellow-400" />
                        <Star className="text-yellow-400" />
                        <Star className="text-yellow-400" />
                        <Star className="text-yellow-400" />
                        <Star className="text-yellow-400" />
                    </div>
                </div>
            </motion.div>
        
            <motion.div
            variants={{
                hidden: {y: 20, opacity: 0},
                visible: {y: 0, opacity: 1}
            }}
            className="text-sm w-80 border border-gray-200 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5">
                <div className="flex flex-col items-center px-5 py-4 relative">
                    <img className="h-24 w-24 absolute -top-14 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="userImage2" />
                    <div className="pt-8 text-center">
                        <h1 className="text-lg font-medium text-gray-800">Richard Nelson</h1>
                        <p className="text-gray-800/80">Instagram Influencer</p>
                    </div>
                </div>
                <p className="text-gray-500 px-6 text-center">I've been using this website for nearly a year, primarily web version and it has been incredibly amazing, making my work much easier.</p>
                <div className="flex justify-center pt-4">
                    <div className="flex gap-0.5">
                        <Star className="text-yellow-400" />
                        <Star className="text-yellow-400" />
                        <Star className="text-yellow-400" />
                        <Star className="text-yellow-400" />
                        <Star className="text-yellow-400" />
                    </div>
                </div>
            </motion.div>
        
            <motion.div
            variants={{
                hidden: {y: 20, opacity: 0},
                visible: {y: 0, opacity: 1}
            }}
            className="text-sm w-80 border border-gray-200 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5">
                <div className="flex flex-col items-center px-5 py-4 relative">
                    <img className="h-24 w-24 absolute -top-14 rounded-full" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop" alt="userImage3" />
                    <div className="pt-8 text-center">
                        <h1 className="text-lg font-medium text-gray-800">James Washington</h1>
                        <p className="text-gray-800/80">Marketing Manager</p>
                    </div>
                </div>
                <p className="text-gray-500 px-6 text-center">I've been using this awesome website for nearly two years, primarily for my own finances and it has been incredibly user-friendly, making my work much easier.</p>
                <div className="flex justify-center pt-4">
                    <div className="flex gap-0.5">
                        <Star className="text-yellow-400" />
                        <Star className="text-yellow-400" />
                        <Star className="text-yellow-400" />
                        <Star className="text-yellow-400" />
                        <Star className="text-yellow-400" />
                    </div>
                </div>
            </motion.div>
        </motion.div>
        </div>
    );
};