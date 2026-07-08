import { Pencil, User2 } from "lucide-react"
import { useAuth } from "../Context";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <div className="p-15 max-sm:pb-30 max-sm:p-5 max-sm:pt-17 max-sm:m-autp-10">
        <h1 className="text-3xl font-semibold pb-3">{t('profile_info')}</h1>
        <div className="p-10 flex mt-10 justify-between gap-10 border border-gray-300 rounded-4xl shadow relative max-sm:flex-col">
        <div className="rounded-full w-40 h-40 bg-gray-400 flex items-center justify-center text-8xl text-white max-md:w-30 max-md:h-30 max-md:text-5xl max-xl:w-40 max-xl:h-40 max-xl:text-6xl"><User2 size={100}/> 
        </div>
        <div className="max-w-100">
        <p className="text-2xl mt-5 font-semibold max-xl:text-xl">{user.username}</p>
        <hr />
        <p className="text-xl mt-5 max-xl:text-lg">{t('username')}: <br></br> {user.username}</p>
        <p className="text-xl mt-5 max-xl:text-lg">{t('email')}: <br></br> {user.email}</p>
        </div>
        <button onClick={() => navigate('/dashboard/settings')} className="btn flex gap-2 text-sm cursor-pointer border-2 items-center absolute bottom-7 left-7 py-1 px-2 rounded-lg max-sm:top-7 max-sm:right-7 max-sm:bottom-auto max-sm:left-auto max-sm:py-1 max-sm:px-2 max-sm:text-sm">{t('UpdateProfile')} <Pencil size={16}/></button>
        </div>
        </div>
  )
}

export default Profile