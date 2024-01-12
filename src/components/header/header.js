import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCompass, faNewspaper, faPerson, faUser } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import './../css/header.css'
import Logo from './../../assets/Logo-white.png';
// import ConfigPopUp from './../config_user/config_user';

library.add(faHome, faCompass, faNewspaper, faPerson, faUser)

const User = {
    Nome: 'John',
    User: 'John13',
    Photo: ''
}

const Icons = [
    {
        name: 'Início',
        icon: 'fa-home',
        desc: 'Página principal',
        link: '/'
    },
    {
        name: 'Menu',
        icon: 'fa-compass',
        desc: 'Seleção de categorias',
        link: '/categories'
    },
    {
        name: 'Noticias',
        icon: 'fa-newspaper',
        desc: 'Feed com informações',
        link: '/news'
    },
    {
        name: 'Pessoas',
        icon: 'fa-person',
        desc: 'Amigos',
        link: '/people'
    }
]

const Icon = ({ icon }) => {

    return (
        <span><FontAwesomeIcon icon={icon} /></span>
    )
} 

const HButton = ({
    name,
    key,
    icon,
    desc,
    link,
    onClick,
    isActive
}) =>{

    return (
        <Link to={link} data-desc={desc ? desc : ''} onClick={onClick} className={`Button-h ${desc ? 'desc' : ''} ${isActive ? 'active' : ''}`}>
            {icon && <Icon icon={icon}/>}
        </Link>
    )
}

const Account = ({
    Name,
    User,
    Photo
}) => {

    const [ activeMenu, setActiveMenu] = useState(false);

    const OpenMenu = () => {
        !activeMenu ? setActiveMenu(true) : setActiveMenu(false);
        console.log(activeMenu);
    }

    return (
        <div className='Account'>
            <span className='AccountIcon' onClick={OpenMenu}>{!Photo && <Icon icon={'fa-user'}/>}</span>
            <div className={`AccountMenu ${activeMenu? 'active' : ''}`}>
                <span>Configurações</span>
                <span>Galeria</span>
                <span>Sair</span>
            </div>
        </div>
    )
}

const Header = () => {

    const location = useLocation();
    const [ activeItem, setActiveItem] = useState('')

    const handleClick = (item) => {
         setActiveItem(item)
         console.log("Active ", activeItem)
         console.log("Link ", location.pathname)
    }

    useEffect(() => {
        const currentPage = Icons.find(icon => icon.link === location.pathname);
        if (currentPage) {
            setActiveItem(currentPage.name);
        } else {
            setActiveItem(''); // Ou defina um valor padrão se necessário
        }
    }, [location]);

    return (
        <div className="Header">
            <span className="Logo"><img src={Logo} /></span>
            <div className="Icons">
                {Icons.map((item) => (
                    <HButton 
                    key={item.key} 
                    onClick={() => {handleClick(item.name)}} 
                    isActive={activeItem === item.name} 
                    desc={item.name}
                    link={item.link} 
                    icon={item.icon} />
                ))}
            </div>
            <div className="User">
                <Account />
            </div>
            <div className="headerMenu"></div>
            {/* <ConfigPopUp /> */}
        </div>
    )
}

export default Header;