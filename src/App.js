import './App.css';
import './components/styles/index.css';
import {Route, Routes} from "react-router-dom"
import { useState, useEffect } from "react";
import { Session } from './requests';
import NavBar from './components/NavBar';
import GoalIndexPage from './components/GoalIndexPage';
import GoalShowPage from './components/GoalShowPage';
import EditGoalPage from './components/EditGoalPage';
import SignInPage from './components/SignInPage';
import NewUserPage from './components/NewUserPage';
import EditUserPage from './components/EditUserPage';
import Overlay from "./components/Overlay"
import NewGoalPage from "./components/NewGoalPage";
import AuthRoutes from './components/AuthRoutes';
import { IoAddCircle } from "react-icons/io5";


const App = () => {
  const [user, setUser] = useState(null)
  const [showGoals, setShowGoals] = useState(false)
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = () => {
    Session.current().then(currentUser => {
      console.log(currentUser)
      if(currentUser?.id){
        setUser(currentUser)
      }
    })
  }

  return(
    <>
      {
        !user ? (
          <>
          <Routes>
            <Route path="/sign_up" element={<NewUserPage getCurrentUser={() => getCurrentUser()}/>}/>
            <Route path="/" element={<SignInPage getCurrentUser={() => getCurrentUser()}/>}/>
            <Route path="/login" element={<SignInPage getCurrentUser={() => getCurrentUser()}/>}/>
            <Route path="*" element={<SignInPage/>} />
          </Routes>
          </>
        ) : (
        <>
          <NavBar 
            currentUser={user}
            setUser={(e) => setUser(e)}
          />
          {
            display ? (
              <Overlay
              setDisplay = {(event) => setDisplay(event)}
              component = {
                  <NewGoalPage 
                  setDisplay = {(event) => setDisplay(event)}
                  />
              }
              />
            ) : ("")
          }
          <div className='flex flex-col items-center w-max fixed z-10 text-[#4CAF4F] bottom-20 left-14'>
              <IoAddCircle 
              className='w-[6rem] h-[6rem] hover:cursor-pointer hover:text-[#6ed872]'
              onClick={() => {
                  setDisplay(true)
              }}
              />
              <h1 className='font-bold'>New Goal</h1>
          </div> 
          <Routes>
            <Route element={<AuthRoutes isAuthenticated={!!user}/>}>
              <Route exact path="/" element={
                <GoalIndexPage
                showGoals = {showGoals}
                setShowGoals = {(e) => setShowGoals(e)}
                setDisplay = {(e) => {setDisplay(e)}}            
                />
              }/>
            </Route>
            
            <Route element={<AuthRoutes isAuthenticated={!!user}/>}>
              <Route exact path="/goals" element={
                <GoalIndexPage
                showGoals = {showGoals}
                setShowGoals = {(e) => setShowGoals(e)}
                setDisplay = {(e) => {setDisplay(e)}}
                />
              }/>
            </Route>
            <Route element={<AuthRoutes isAuthenticated={!!user}/>}>
                  <Route path="/goals/:id" element={<GoalShowPage />} />
            </Route>
            <Route element={<AuthRoutes isAuthenticated={!!user}/>}>
              <Route path="/edit_goal/:id" element={<EditGoalPage/>}/>
            </Route>

            <Route element={<AuthRoutes isAuthenticated={!!user}/>}>
              <Route path="/edit_user" element={<EditUserPage getCurrentUser={() => getCurrentUser()}/>}/>
            </Route>
          </Routes>
        </>
        )
      }
     </>
  )
}

export default App;