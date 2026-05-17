import Banner from "../components/Banner"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import ProgressBar from "../components/ProgressBar"
import Team from "../components/Team"
import Testimonial from "../components/Testimonial"


const home = () => {
  return (
    <>
    <ProgressBar/>
    <Banner />
    <Hero />
    <Testimonial />
    <Team/>
    <Contact/>
    <Footer/>
    </>
  )
}

export default home