import { Session } from "../requests"
import { useNavigate } from "react-router-dom";

const UserComponent = props => {
    const {currentUser, setDisplay, setUser} = props
    const navigate = useNavigate()

    const onSignOut = () => {
        Session.destroy().then(sessionData => {
          if (sessionData.errors) {
            console.log(sessionData.errors);
          }
        })
        setUser(null)
      }

    return(
        <div className="flex flex-col place-content-center items-center w-1/3 h-max bg-white fixed z-10 rounded-lg p-16 gap-12">
            <h1 className="text-[2rem] font-light">{currentUser.first_name+" "+currentUser.last_name}</h1>
            <div 
                className="flex place-content-center items-center w-16 h-16 bg-[#AD4747] text-white rounded-full text-slate-700"
            >
                {currentUser.first_name[0]+currentUser.last_name[0]}
            </div>
            <div className="flex gap-5">
                <button className="border border-slate-700 rounded-full px-5 text-slate-700" 
                onClick={() => {
                    setDisplay()
                    onSignOut()
                    navigate("/")
                }}>Sign Out</button>
                <button className="border border-slate-700 rounded-full px-3 text-slate-700" 
                onClick={() =>{
                    setDisplay()
                    navigate("/edit_user")
                }}>Edit Profile</button>
            </div>
        </div>
    )
}

export default UserComponent