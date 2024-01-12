import { useState } from 'react';
import './css/Main.css'
import './css/PeopleReg.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faUser } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import CropPopup from '../components/cropper/cropper';

library.add(faCalendar, faUser)

const Input = ({name, label, type}) => {

    return (
        <div className='input-sp'>
            <label className='label-in'>{label}</label>
            <input className={`input-in ${name}`} type={type} />
        </div>
    )
}

const InputCalendar = ({name, label}) => {
    const [date, changeDate] = useState(new Date().toLocaleDateString());
    const [openCalendar, setCalendar] = useState(false)

    const OpenCalendar = () => {
        setCalendar(!openCalendar);
        console.log(openCalendar);
    }

    const getDate = (e) => {
        changeDate(e.toLocaleDateString())
        setCalendar(false)
        console.log("DATA: ",date)
    }

    return (
        <div className='input-calendar'>
            <label className='label-in'>{label}</label>
            <input value={date} className={`input-in ${name}`} type='text' />
            <button onClick={OpenCalendar} className={`btn-OpenCal ${openCalendar ? 'active' : ''}`}><FontAwesomeIcon icon={"fa-calendar"}/></button>
            <div className={`calendar ${openCalendar ? 'active' : ''}`}>
                {openCalendar && <Calendar locale={'pt-BR'} onChange={(e) => getDate(e)} />}
            </div>
        </div>
    )
}

const InputFoto = ({label}) => {
    return (
        <div className='input-foto'>
            <label className='label-in'>{label}</label>
            <div className='click-area-photo'><FontAwesomeIcon icon={"fa-user"}/></div>
        </div>
    )
}


const PeopleReg = () => {

    return (
        <div className="Main PeopleRegister">
            <div className='Register-Area'>
                <div className='header'>
                    <span>Adicionar novo funcionário</span>
                    <div className='Tools'></div>
                </div>
                <div className='Reg-input'>

                    <div className='field-name'>
                        <Input name={'nome'} label={'Nome'} type={'text'} />
                        <Input name={'sobrenome'} label={'Sobrenome'} type={'text'} />
                    </div>

                    <div className='field-name'>
                        <InputCalendar name={'dataAdmissao'} label={"Data de Admissão"}/>
                        <InputCalendar name={'dataNasc'} label={'Data de Nascimento'}/>
                    </div>
                    <div className='field-name'>
                        <Input name={'email'} label={'Email'} type={'text'} />
                    </div>
                    <div className='field-name'>
                        <InputFoto label={'Foto'} />
                    </div>

                </div>
            </div>
            {/* <CropPopup /> */}
        </div>
    )
}

export default PeopleReg;