import { useState, useRef  } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import './../css/cropper.css'

var img = 'https://plus.unsplash.com/premium_photo-1689266188052-704d33673e69?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const ShapePreviewCircle = ({src}) => {

  return (
    <div className="Shape Circle-Shaped">
      <label className="Shape-label">Visualização em Circulo</label>
      <div className="Shape-border circle">
        <img src={src}/>
      </div>
    </div>
  )
}

const ShapePreviewSquare = ({src}) => {

  return (
    <div className="Shape Square-Shaped">
      <label className="Shape-label">Visualização em Circulo</label>
      <div className="Shape-border square">
        <img src={src}/>
      </div>
    </div>
  )
}

const CropPopup = ({foto}) => {

  const [Preview, setPreview] = useState(false);
  const [CropPhoto, setCropPhoto] = useState('');
  const cropperRef = useRef(null);

  const CropDemo = ({src, define}) => {

    var cropper;

    const onCrop = () => {
      cropper = cropperRef.current?.cropper;
    };

    const setCrop = () => {
      setPreview(true);
      setCropPhoto(cropperRef.current.getCroppedCanvas().toDataURL()); // Corrigindo o acesso à referência
      console.log("crop ", CropPhoto);
    }

    return (
      <Cropper
      src={src}
      style={{ height: 400, width: "100%" }}
      // Cropper.js options
      initialAspectRatio={3 / 4}
      guides={true}
      ref={cropperRef}
      crop={onCrop}
      zoomable={true}
      dragMode={'move'}
      setCrop={setCrop}
      viewMode={1}
      cropBoxResizable={false}
      scalable={true}
    />
    )
  }

    return (
        <div className="Pop-up">
              {!Preview && (
            <div className="Cropper">
                <div className="CropArea">
                    <CropDemo src={ img }/>
                </div>
                <div className="Crop-Tools">
                    <button>Cancelar</button>
                    <button onClick={() => setCrop()}>Prosseguir</button>
                </div>
                <span className="info">Use o scroll do mouse para ajustar o zoom</span>
            </div>)}
            {Preview&& (
            <div className="Preview">
              <span>Preview</span>
              <div className="PreviewArea">
                <ShapePreviewCircle src={CropPhoto} />
                <ShapePreviewSquare src={CropPhoto}/>
              </div>
              <div className="Preview-Tools">
                    <button>Voltar</button>
                    <button>Cortar</button>
                </div>
            </div>
            )}

        </div>
    )
}

export default CropPopup;