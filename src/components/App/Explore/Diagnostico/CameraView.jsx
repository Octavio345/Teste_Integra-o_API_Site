export default function CameraView({ videoRef, onCapture, onClose }) {

  return (

    <div className="camera-view">

      <video
        ref={videoRef}
        autoPlay
        playsInline
      />

      <div className="camera-buttons">

        <button onClick={onCapture}>
          📸 Capturar
        </button>

        <button onClick={onClose}>
          Cancelar
        </button>

      </div>

    </div>

  )

}
