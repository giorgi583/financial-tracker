import {ArrowRight} from "lucide-react"
import {Link} from "react-router-dom"
import {motion} from "motion/react"
export default function Banner() {
    return (
        <motion.div 
        animate={{y: [50, 0], opacity: [0, 1]}}
        transition={{duration: 0.5}}
        className="flex flex-wrap items-center justify-between w-full px-4 md:px-14 py-2 font-medium text-sm text-white text-center bg-linear-to-r from-violet-500 to-purple-100">
            <p>Keep track of your finances with monify</p>
            <Link to="/register" className="flex items-center gap-1 px-3 py-1 rounded-lg text-violet-600 bg-violet-50 hover:bg-slate-100 transition active:scale-95 ml-3">
                Explore now
                <ArrowRight size={15} />
            </Link>
        </motion.div>
    );
};