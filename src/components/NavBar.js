import { Link } from "react-router-dom";
import "./styles/navbar.css";
import { useState } from "react";
import Overlay from "./Overlay";
import UserComponent from "./UserComponent";

const NavBar = props => {
    const {currentUser, onSignOut, setUser} = props
    const [display, setDisplay] = useState(false)


    if (currentUser === null) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className="navbar">
                <div className="left items-center">
                    <div className="logo-circle">
                        <div className="checkmark"></div>
                    </div>
                    <div className="h-[40%] m-[1rem] border border-[#e8e8e8]"></div>
                    <h1 className="title">Goal Tracker</h1>
                </div>
                
                <div className="right items-center">
                    <Link to={`/`}>
                        <div className="title-container hover:cursor-pointer">
                            <h2>Home</h2>
                            <div className="hl"></div>
                        </div>
                    </Link>
                    <div className="profile-container gap-2 divide-x">
                        <div 
                            className="flex place-content-center items-center w-10 h-10 bg-[#AD4747] text-white rounded-full hover:cursor-pointer"
                            onClick={() => setDisplay(true)}
                        >
                            {currentUser.first_name[0]+currentUser.last_name[0]}
                        </div>
                        <span className="pl-2">{currentUser.first_name+" "+currentUser.last_name}</span>
                    </div>
                </div>
            </div>
            {
                display ? (
                    <Overlay
                    setDisplay = {(event) => setDisplay(event)}
                    component = {
                        <UserComponent
                        onSignout = {() => onSignOut()}
                        setUser = {(event) => setUser(event)}
                        setDisplay = {() => setDisplay(false)}
                        currentUser = {currentUser}
                        />
                    }
                    />
                ) : (
                    ""
                )
            }
        </>
    )
}

export default NavBar