import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCompass, faNewspaper, faPerson, faUser } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import './../css/config_user.css'

library.add(faHome, faCompass, faNewspaper, faPerson, faUser);

const ConfigPopUp = () => {

    const [ activeItem, setActiveItem] = useState('')

    const handleClick = (item) => {
         setActiveItem(item)
         console.log("Active ", activeItem)
    }

    return (
        <div className="Config Pop-Up">

        </div>
    )
}

export default ConfigPopUp;