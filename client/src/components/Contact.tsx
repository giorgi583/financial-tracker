
import { BuildingIcon, Mail, Phone } from "lucide-react";
import {motion} from "motion/react"
export default function Contact() {
    return (
        <motion.div
        initial={{x: 50, opacity: 0}}
        whileInView={{x: 0, opacity: 1}}
        transition={{duration: 0.8, delay: 0.5}}
        viewport={{once: true}}
        className="max-w-5xl w-full mx-auto p-10 pb-32 text-gray-800" id="contact">
            <span className="px-2 py-1 text-xs border border-gray-300 rounded-full">Reach Out To Us</span>
            <h1 className="text-4xl font-bold text-left mt-4">
                We'd love to Hear From You.
            </h1>
            <p className="text-left mt-4">
                Or just reach out manually to 
                <a href="mailto:contact@monify.com" className="text-indigo-600 hover:underline"> contact@monify.com</a>
            </p>
            <div className="grid md:grid-cols-3 mt-16">
                <div>
                    <Mail className="text-indigo-500 bg-indigo-500/20 p-2.5 aspect-square rounded-full size-10" />
                    <p className="text-lg font-bold mt-2">Email Support</p>
                    <p className="text-gray-500 mt-1 mb-4">Our team can respond in real time.</p>
                    <a href="mailto:contact@monify.com" className="text-indigo-600 font-semibold">
                        contact@monify.com
                    </a>
                </div>
                <div>
                    <BuildingIcon className="text-indigo-500 bg-indigo-500/20 p-2.5 aspect-square rounded-full size-10" />
                    <p className="text-lg font-bold mt-2">Visit Our Office</p>
                    <p className="text-gray-500 mt-1 mb-4">Visit our location in real life.</p>
                    <span className="text-indigo-600 font-semibold">
                        221b Elementary Avenue, NY
                    </span>
                </div>
                <div>
                    <Phone className="text-indigo-500 bg-indigo-500/20 p-2.5 aspect-square rounded-full size-10" />
                    <p className="text-lg font-bold mt-2">Call Us Directly</p>
                    <p className="text-gray-500 mt-1 mb-4">Available during working hours.</p>
                    <span className="text-indigo-600 font-semibold">
                        (+1) 234 - 4567 - 789
                    </span>
                </div>
            </div>
        </motion.div>
    );
};
                   


