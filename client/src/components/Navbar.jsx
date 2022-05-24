import { useState } from "react";
import { useAppContext } from "../context/appContext";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import Logo from './Logo'
import Wrapper from "../assets/wrappers/Navbar";

const Navbar = () => {
  return (
     <Wrapper>
       <div className="nav-center">
         <button className='toggle-btn' onClick={() => console.log('toggle')}>
           <FaAlignLeft/>
         </button>
       </div>

     </Wrapper>)
}

export default Navbar