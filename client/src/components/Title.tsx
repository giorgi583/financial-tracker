import {motion} from "motion/react"


const Title = ({title, description}: {title: string, description: string}) => {
  return (
    <motion.div 
    initial={{y: 50, opacity: 0}}
    whileInView={{y: 0, opacity: 1}}
    transition={{duration: 0.5}}
    viewport={{once: true}}
    className="text-center max-w-2xl mx-auto">
      <h1 className="text-5xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-600 mt-2">{description}</p>
    </motion.div>
  )
}

export default Title