import { useState, useEffect, useRef  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import './../../pages/css/Main.css';
import axios from 'axios';

library.add(faAngleDown)

const People = [
    {
        nome: 'John',
        data: '09/01/2024',
        role: 'Produção',
        photo: ''
    },
    {
        nome: 'Helena',
        data: '24/01/2024',
        role: 'Controladoria',
        photo: ''
    },
    {
        nome: 'Zezinho',
        data: '15/01/2024',
        role: 'Almoxarife',
        photo: ''
    }
]

const NiverBlock = ({Pessoas}) => {

    var PeopleFiltered = {};
    const hoje = new Date();

    const converterDataParaEsteAno = (data) => {
        const [dia, mes] = data.split('/').map(Number);
        const dataConvertida = new Date(new Date().getFullYear(), mes - 1, dia);
        return dataConvertida;
    };

    const orderData = (people) => {
        return people
            .sort((a, b) => {
                const dataA = converterDataParaEsteAno(a.data);
                const dataB = converterDataParaEsteAno(b.data);
                return dataA - dataB;
            });
    };

    const CountDias = (data) => {
        var [dia, mes] = data.split('/').map(Number);
        var anoAtual = hoje.getFullYear();
        var dataAniversarioEsteAno = new Date(anoAtual, mes - 1, dia);

        const diferencaTempo = dataAniversarioEsteAno - hoje;
        const diferencaDias = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));
    
        if (diferencaDias === 0) {
            return "É hoje! 🎉🎉" ;
        } else if (diferencaDias === 1) {
            return "Falta 1 dia 🎉" ;
        }
    
        return `Faltam ${diferencaDias} dias`;
    }

    PeopleFiltered = orderData(Pessoas)
    console.log('peopleFiltered', PeopleFiltered)



    return (
        <div className='NiverBlock'>
            <span>Aniversários</span>
            <div className='innerBlock'>
            {PeopleFiltered.map((Pessoa, index) => (
                <div className={`Niver-item N-${index} ${CountDias(Pessoa.data) === 'É hoje! 🎉🎉' ? 'Niver' : ''}`}>
                    <span>{CountDias(Pessoa.data)}</span>
                    <span>{Pessoa.nome}</span>
                    <span>{Pessoa.data}</span>
                </div>
            ))}
            </div>
        </div>
    )
}


const WheaterBlock = () =>{

    const [Weather, setWeather] = useState(null)
    const [MenuExtra, setActiveMenu] = useState(false)

    var urlApi = "https://api.openweathermap.org/data/2.5/weather?lat=-23.09028&lon=-47.21806&units=metric&lang=pt_br&appid=d2cda4a9814c6b6164e3b0662cbdb0bf";

    axios.get(urlApi)
    .then(function (response) {
    
    var data = response.data;

    setWeather({
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        city: data.name,
        icon: data.weather[0].icon,
        desc: data.weather[0].description
    })
    
    console.log(Weather);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  if (!Weather) {
    return <div className='WheaterBlock loading'>Carregando...</div>;
    }

    const ClickMenu = () => {
        setActiveMenu(!MenuExtra);
    }

    return (
        <div className='WheaterBlock'>
            <span className={`icon-menu ${MenuExtra ? 'active' : ''}`}onClick={ClickMenu} ><FontAwesomeIcon icon={'fa-angle-down'}/>
                <div class="Block-opt Weather">
                    <span>Alterar Cidade</span>
                    <span>Relatar Problemas</span>
                </div>
            </span>
            <h2 class="CardCity">{Weather.city}</h2>
            <h1 class="CardTemp">{Weather.temp}°C</h1>
            <div class="CardFlex">
                <img class="CardImg" src={`https://openweathermap.org/img/wn/${Weather.icon}.png`}/>
                <p class="CardDesc">{Weather.desc.toUpperCase()}</p>
            </div>
            <div class="CardMinMax">
                <p class="CardMin">{`Min: ${Weather.tempMin}°C`}</p>
                <p class="CardMax">{`Máx: ${Weather.tempMax}°C`}</p>
            </div>
        </div>
    )
}


const SidebarHome = () => {

    return (
        <div className="Sidebar-Home">
            <span className="Sidebar-Title">Informações</span>
            <div className='Sidebar-Content'>
                {/* <div className='SItem Wheater'>
                    <WheaterBlock /> 
                </div> */}
                <div className='SItem Birthday'>
                    <NiverBlock Pessoas={People}/>
                </div>
            </div>
        </div>
    )
}

export default SidebarHome;