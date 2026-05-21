import { Pencil } from "lucide-react"

const Profile = () => {
  return (
    <div className="p-15 ">
        <h1 className="text-3xl font-semibold pb-3">Profile Information</h1>
        <div className="p-10 flex mt-10 justify-between gap-10 border border-gray-300 rounded-4xl shadow relative">
        <div className="rounded-full w-70 h-70 bg-gray-400 flex items-center justify-center text-9xl text-white"><img src="" alt="" />JS
        </div>
        <div className="max-w-100">
        <p className="text-2xl mt-5 font-semibold">John Smith</p>
        <hr />
        <p className="text-xl mt-5 ">Username: <br></br> jsmith</p>
        <p className="text-xl mt-5 ">Email: <br></br> 2bY5K@example.com</p>
        <p className="text-lg mt-5">Bio: <br></br> Highly perspectived software developer with a passion for problem-solving and a strong commitment to excellence.</p>
        </div>
        <button className="flex gap-2 cursor-pointer border-2 border-blue-300 bg-linear-to-r from-blue-200 items-center to-blue-100 text-blue-700 absolute bottom-7 left-7 py-2 px-4 rounded-lg">Edit Profile <Pencil size={16}/></button>
        </div>
        </div>
  )
}

export default Profile