import {motion} from "motion/react"
export default function Footer() {
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 bg-linear-to-r from-indigo-50 to-indigo-100">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                <motion.div 
                initial={{x: -50, opacity: 0}}
                whileInView={{x: 0, opacity: 1}}
                transition={{duration: 0.5}}
                viewport={{once: true}}
                className="md:max-w-96">
                    <h1 className="text-2xl font-bold text-gray-800">Monify</h1>
                    <p className="mt-6 text-sm">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </p>
                </motion.div>
                <motion.div 
                initial={{x: 50, opacity: 0}}
                whileInView={{x: 0, opacity: 1}}
                transition={{duration: 0.5}}
                viewport={{once: true}}
                className="flex-1 flex items-start md:justify-end gap-20">
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About us</a></li>
                            <li><a href="#">Contact us</a></li>
                            <li><a href="#">Privacy policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-800 mb-5">Subscribe to our newsletter</h2>
                        <div className="text-sm space-y-2">
                            <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
                            <div className="flex items-center gap-2 pt-4">
                                <input type="email" name="email" id="email" className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2" placeholder="Enter your email" />
                                <button className="bg-indigo-600 w-24 h-9 text-white rounded">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <motion.p 
            initial={{y: 20, opacity: 0}}
            whileInView={{y: 0, opacity: 1}}
            transition={{duration: 0.5, delay: 0.2}}
            viewport={{once: true}}
            className="pt-4 text-center text-xs md:text-sm pb-5">
                Copyright 2024 © <a href="#">Monify</a>. All Right Reserved.
            </motion.p>
        </footer>
    );
};