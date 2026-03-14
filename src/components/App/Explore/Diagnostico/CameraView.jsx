import { useEffect } from "react"
import "../../../../styles/App/Explore.css"

export default function CameraView({
  videoRef,
  onCapture,
  onSwitchCamera,
  onClose
}) {

  // DESLIGA A CÂMERA AO SAIR DO COMPONENTE
  useEffect(() => {

    return () => {

      if (videoRef && videoRef.current && videoRef.current.srcObject) {

        const tracks = videoRef.current.srcObject.getTracks()

        tracks.forEach(track => track.stop())

      }

    }

  }, [videoRef])

  return (

    <div className="camera-container">

      {/* VIDEO DA CAMERA */}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="camera-video"
      />

      {/* GUIA VISUAL */}

      <div className="camera-overlay">

        <div className="camera-frame">

          <div className="corner tl" />
          <div className="corner tr" />
          <div className="corner bl" />
          <div className="corner br" />

        </div>

        {/* TEXTO GUIA */}

        <p className="camera-instruction">
          Posicione a folha de soja dentro do quadro
        </p>

      </div>

      {/* CONTROLES */}

      <div className="camera-controls">

        <button
          onClick={onClose}
          className="camera-btn"
        >
          ✕
        </button>

        <button
          onClick={onCapture}
          className="capture-btn"
        >
          <div className="capture-inner" />
        </button>

        <button
          onClick={onSwitchCamera}
          className="camera-btn"
        >
          🔄
        </button>

      </div>

    </div>

  )
}
