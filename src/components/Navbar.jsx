import { Nav,NavLinks,Logo,MenuButton } from "../Navbar.style";
import { NavLink } from 'react-router-dom';
import { LoginCloseButton, PrivateLink, PublicLink, AdminLink } from '../pages/PrivateLink'
import { FaBars,FaTimes } from "react-icons/fa"
import logo from '../assets/omniamusta_eitaustaa.png'
import { useState } from 'react'


const Navbar = () => {
    const [openmenu, setOpenmenu] = useState(false)
    let menu = openmenu ? "flex" : ""
    console.log("rendering Navbar,menu:",menu)
  
    return (
    <Nav>
      <Logo src={logo}></Logo>
      <NavLinks menu={menu}>
        <NavLink to="/" activeclassname="active">Home</NavLink>
        <NavLink to="/jobs" activeclassname="active">Jobs</NavLink>
        <PrivateLink to="/add-job" activeclassname="active">Add Job</PrivateLink>
        <AdminLink to="/users" activeclassname="active">Users</AdminLink>
        <LoginCloseButton/> 
      </NavLinks>
      <MenuButton onClick={() => setOpenmenu(!openmenu)}>
        {openmenu ? <FaTimes/> : <FaBars/>}
      </MenuButton>
    </Nav>
    )
  }
export {Navbar};