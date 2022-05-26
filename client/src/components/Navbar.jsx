import { useState } from "react";
import { useAppContext } from "../context/appContext";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import Logo from './Logo'
import Wrapper from "../assets/wrappers/Navbar";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false)
  const { toggleSidebar, user, logoutUser } = useAppContext()


  return (
     <Wrapper>
       <div className="nav-center">
         <button
            type='button'
            className='toggle-btn'
            onClick={toggleSidebar}>
           <FaAlignLeft/>
         </button>
         <div>
           <Logo/>
           <h3 className='logo-text'>Dashboard</h3>
         </div>
         <div className="btn-container">
           <button
              type='button'
              className='btn'
              onClick={() => setShowLogout(!showLogout)}>
             <FaUserCircle/>
             {user?.name}
             <FaCaretDown/>
           </button>
           <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
             <button
                className="dropdown-btn"
                type='button'
                onClick={logoutUser}
             >Logout
             </button>
           </div>
         </div>
       </div>

     </Wrapper>)
}

export default Navbar