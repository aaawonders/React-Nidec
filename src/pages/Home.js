import { useState, useEffect, useRef  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
// import ImageSlide from './../components/ImageSlide/ImageSlide.js'
import SidebarHome from '../components/home/sidebar.jsx';
import './css/Main.css'

library.add(faEllipsis)

const News = [
    {
        id: '0',
        title: 'Cratera aberta por colapso de mina em Maceió comporta volume de água de 11 piscinas olímpicas',
        desc: 'Medidas constam em um documento da Defesa Civil Municipal, que cita ainda a impossibilidade de monitorar 3 minas próximas da que se rompeu sob a lagoa Mundaú; um novo equipamento está sendo preparado para tentar descobrir a gravidade da situação.',
        Photos: {
            Main: 'https://s2-g1.glbimg.com/CU-AtUiQAEfD3ZFqYnizeHuOF2g=/0x0:2800x1699/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/Y/h/Id1IhfRhm5vaJuRIGAaQ/ima-intima-braskem-a-apresentar-medidas-de-controle-e-mitigacao-de-impactos-ambientais-apos-colapso-de-mina.jpg',
            Others: [
                ''
            ]
        },
        PostedBy: 'Cau Rodrigues',
        DatePosted: '05/01/2024'
    },
    {
        id: '2',
        title: 'Após semana com tempo instável, chuva ainda aparece nesta sexta, mas diminui no fim de semana; veja previsão',
        desc: 'Depois de um início de ano com tempo instável em boa parte do país, a chuva ainda aparece nesta sexta-feira (5), mas diminui de intensidade ao longo do fim de semana. De acordo com a Climatempo, cidades do Centro-Sul ainda podem enfrentar temporais, mas devem ser menos fortes do que os registrados nos últimos dias.',
        Photos: {
            Main: 'https://s2-g1.glbimg.com/h2I_AasdvAhjgh4MBVaiODYAvuE=/0x0:1200x1822/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/k/7/kXEOfmSHOlM6VWOKm61Q/04-01-24-mapa-chuvas-v.png',
            Others: [
                ''
            ]
        },
        PostedBy: 'Júlia Carvalho',
        DatePosted: '05/01/2024'
    }
]

const SmallNews = (
    {id,
    title,
    desc,
    Photo,
    PostedBy,
    Date,
    Onclick}
) => {

    const [activeContext, setActiveContext] = useState(false)
    const contextMenuRef = useRef(null);

    const openContext = () => {
        if(!activeContext){
            setActiveContext(true)
        } else {
            setActiveContext(false)
        }

        console.log(activeContext)
    }

    const handleClickOutside = (event) => {
        if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
            setActiveContext(false);
        }
    };

    useEffect(() => {
        // Adiciona listener ao documento
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Limpa o listener quando o componente é desmontado
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const truncateString = (str, num) => {
        if (str.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };

    console.log("Small ",Photo)

    return(
        <div className='SmallNews' id={`I-${id}`}>
            <div className='SNews-Photo'><img src={Photo} alt={title} /></div>
            <div className='SNews-Text'>
                <span>{truncateString(title, 200)}</span>
                <span>{truncateString(desc, 120)}</span>
            </div>
            <div className='SNews-By'>
                <span>{Date}</span>
                <span>{PostedBy}</span>
            </div>
            <div className={`Context-Menu`} onClick={openContext} ><FontAwesomeIcon icon='fa-ellipsis' /></div>
            <div className={`Context-Menu-list ${activeContext ? 'active' : ''}`} ref={contextMenuRef}>
                <span class>Editar</span>
                <span class>Apagar</span>
            </div>
        </div>
    )
}

const Feed = () => {

    return (
        <div className='Feed-Contentt'>
            {News.map((news) => (
                <SmallNews 
                    id={news.id}
                    title={news.title}
                    desc={news.desc}
                    Photo={news.Photos.Main}
                    PostedBy={news.PostedBy}
                    Date={news.DatePosted}
                />
            ))}
        </div>
    )
}


const Home = () => {

    return (
        <div className="Main Home">
            <div className='Sidebar'>
                <SidebarHome />
            </div>
            <div className='Feed'>
                <span>Feed de Notícias</span>
                <div className='Feed-Content'>
                    <Feed />
                </div>
            </div>
            {/* <ImageSlide /> */}
        </div>
    )
}

export default Home;