export default function CameraView({ videoRef, onCapture, onCancel }) {

  return (

    <div className="camera-container">

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="camera-video"
      />

      <div className="camera-actions">

        <button className="btn capture" onClick={onCapture}>
          📸 Capturar
        </button>

        <button className="btn cancel" onClick={onCancel}>
          Cancelar
        </button>

      </div>

    </div>

  )
}
