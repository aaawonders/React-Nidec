import { useState, useEffect, useRef  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import './../css/ImageSlide.css'

library.add(faArrowRight, faArrowLeft)

const Images = [
    {
        Photo: 'https://s2-g1.glbimg.com/CU-AtUiQAEfD3ZFqYnizeHuOF2g=/0x0:2800x1699/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/Y/h/Id1IhfRhm5vaJuRIGAaQ/ima-intima-braskem-a-apresentar-medidas-de-controle-e-mitigacao-de-impactos-ambientais-apos-colapso-de-mina.jpg',
        title: 'Cratera aberta por colapso de mina em Maceió comporta volume de água de 11 piscinas olímpicas'
    },
    {
        Photo: 'https://s2-g1.glbimg.com/HvUQAiyctekJnpxeqcgyUW8yfqQ=/0x0:2812x3086/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/m/D/aDTMQWSRqtABITEKZXtQ/mature-carolina-reaper-2017-.jpg',
        title: "'Dolorosamente quente': conheça Carolina Reaper, a pimenta mais ardida do mundo"
    }
]

const ImageSlide = () => {

    //{Images}
    const [activeImage, setActiveImage] = useState(0)
    const ImageLen = Images.length

    console.log('ImageLen ', ImageLen)

    const AdvanceImage = () => {
        if (ImageLen > 1) {
            setActiveImage(activeImage => 
                activeImage === ImageLen - 1 ? 0 : activeImage + 1
            );
        }
    }

    const BackImage = () => {
        if (ImageLen > 1){
            setActiveImage(activeImage => 
                activeImage === 0 ? ImageLen - 1 : activeImage - 1
            );
        }
    }

    return (
        <div className="Image-Slide">
            <div className='Img-Box'>
            {ImageLen > 0 && (
                <img src={Images[activeImage].Photo} alt={Images[activeImage].title} />
                )    
            }</div>
            {ImageLen > 1 &&(
            <>
                <div className={`Arrows-Pass `}>
                    <span onClick={BackImage}><FontAwesomeIcon icon='fa-arrow-left' /></span>
                    <span onClick={AdvanceImage}><FontAwesomeIcon icon='fa-arrow-right' /></span>
                </div>
                <div className="Dot-Indicators"></div>
            </>

            )
            }
        </div>
    )
}

export default ImageSlide;