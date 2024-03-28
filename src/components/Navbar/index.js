import {Link} from 'react-router-dom'
import AppContext from '../../context/AppContext';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiHome } from "react-icons/fi";
import { GoOrganization } from "react-icons/go";
import { BsBox } from "react-icons/bs";
import { PiArrowsDownUp } from "react-icons/pi";
import { GiSandsOfTime } from "react-icons/gi";
import { PiWallet } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { BiHelpCircle } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import './index.css'


const Navbar = () => (
    <AppContext.Consumer>
    {value => {
      const {navItemsList, activeId, updateActiveId} = value

      const changeNavigation = (id) => {
            updateActiveId(id)
      }

     const getIcon = (name) => {
        switch(name) {
            case "Home" :
                return <FiHome className='sidebar-icon'/>
            case "Organization" :
                return <GoOrganization className='sidebar-icon'/>
            case "Assets" :
                return <BsBox className='sidebar-icon'/>
            case "Trade" :
                return <PiArrowsDownUp className='sidebar-icon'/>
            case "History" :
                return <GiSandsOfTime className='sidebar-icon'/>
            case "Wallet" :
                return <PiWallet className='sidebar-icon'/>
            default :
                return null;
         }
     }

      return (
        <>
            <input type="checkbox" id="check" />
            <label for="check">
                <GiHamburgerMenu id="btn" />
                <GiHamburgerMenu id="cancel" />
            </label>
            <label id="overlay" for="check"></label>
            <div className='sidebar'>
                <div className='logo-text-container'>
                    <img className='company-logo' src="https://res.cloudinary.com/jayakrishnavamsi/image/upload/v1711588591/logo-bg-removed_vlkmpp.png" alt="logo" />
                    <h1 className='company-name'>Carbon <span>Cell</span></h1>
                </div>
                <div className='search-container'>
                    <FiSearch className='search-icon' />
                    <input type="search" placeholder='Search' />
                </div>
                <div className='navbar-scroll-container'>
                    <ul className='route-links-container'>
                        {navItemsList.map(eachNavItem => (
                            <Link className="link-item" to={eachNavItem.path} key={eachNavItem.id}>
                                <li className={`route-link-item ${eachNavItem.id === activeId ? 'green' : 'white'}`}>
                                    <button onClick={() => changeNavigation(eachNavItem.id)} type="button" className={`${eachNavItem.id === activeId ? 'green' : 'white'}`}>
                                        {getIcon(eachNavItem.name)}
                                        <p>{eachNavItem.name}</p>
                                    </button>
                                </li>
                            </Link>
                        ))}
                    </ul>
                    <div>
                    <ul className='route-links-container bottom-features'>
                        <li className='route-link-item white'>
                            <IoNotificationsOutline className='sidebar-icon'/>
                            <p className='notification-text'>Notifications</p>
                            <div className='notification-count-container'>
                                <p>12</p>
                            </div>
                        </li>
                        <li className='route-link-item white'>
                            <BiHelpCircle className='sidebar-icon'/>
                            <p>Support</p>
                        </li>
                        <li className='route-link-item white'>
                            <IoSettingsOutline className='sidebar-icon'/>
                            <p>Settings</p>
                        </li>
                    </ul>
                    <div className='profile-container'>
                        <img className='profile-pic' src ="https://res.cloudinary.com/jayakrishnavamsi/image/upload/v1711597335/purple-man-with-blue-hair_24877-82003_vxmtth.avif" alt="profile-pic" />
                        <div className='profile-text-container'>
                            <p className='profile-user-name'> Brooklyn Simmons </p>
                            <p className='profile-user-email'> brooklyn@simmons.com </p>
                        </div>
                        <BsThreeDotsVertical className='profile-three-dots'/>
                    </div>
                    </div>
                </div>
            </div>
            </>
      )
    }}
  </AppContext.Consumer>
)

export default Navbar 
