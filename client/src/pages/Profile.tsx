import { Pencil } from "lucide-react"

const Profile = () => {
  return (
    <div className="p-15 max-sm:pb-30 max-sm:p-5 max-sm:pt-17 max-sm:m-auto">
        <h1 className="text-3xl font-semibold pb-3">Profile Information</h1>
        <div className="p-10 flex mt-10 justify-between gap-10 border border-gray-300 rounded-4xl shadow relative max-sm:flex-col">
        <div className="rounded-full w-50 h-50 bg-gray-400 flex items-center justify-center text-8xl text-white max-md:w-30 max-md:h-30 max-md:text-5xl max-xl:w-40 max-xl:h-40 max-xl:text-6xl"><img src="" alt="" />JS
        </div>
        <div className="max-w-100">
        <p className="text-2xl mt-5 font-semibold max-xl:text-xl">John Smith</p>
        <hr />
        <p className="text-xl mt-5 max-xl:text-lg">Username: <br></br> jsmith</p>
        <p className="text-xl mt-5 max-xl:text-lg">Email: <br></br> 2bY5K@example.com</p>
        <p className="text-lg mt-5 max-xl:text-md max-xl:max-w-xs">Bio: <br></br> Highly perspectived software developer with a passion for problem-solving and a strong commitment to excellence.</p>
        </div>
        <button className="btn flex gap-2 cursor-pointer border-2 items-center absolute bottom-7 left-7 py-2 px-4 rounded-lg max-sm:top-7 max-sm:right-7 max-sm:bottom-auto max-sm:left-auto max-sm:py-1 max-sm:px-2 max-sm:text-sm">Edit Profile <Pencil size={16}/></button>
        </div>
        </div>
  )
}

export default Profile