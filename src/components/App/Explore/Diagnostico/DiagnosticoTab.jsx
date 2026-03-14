import { useState, useRef } from "react"
import CameraView from "./CameraView"
import ImagePreview from "./ImagePreview"
import AnalysisLoader from "./AnalysisLoader"
import DiagnosisResult from "./DiagnosisResult"
import "../../../../styles/App/Diagnostico.css"

const API_URL = "https://octaviorezendesilva-api-doencas-soja.hf.space/predict"

export default function DiagnosticoTab() {

  const videoRef = useRef(null)
  const fileInputRef = useRef(null)

  const [step, setStep] = useState("start")
  const [image, setImage] = useState(null)
  const [result, setResult] = useState(null)

  const startCamera = async () => {

    setStep("camera")

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }
    })

    videoRef.current.srcObject = stream
  }

  const stopCamera = () => {

    const stream = videoRef.current?.srcObject
    if (!stream) return

    stream.getTracks().forEach(track => track.stop())
  }

  const capturePhoto = () => {

    const video = videoRef.current

    const canvas = document.createElement("canvas")

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext("2d")
    ctx.drawImage(video, 0, 0)

    const data = canvas.toDataURL("image/jpeg")

    setImage(data)

    stopCamera()

    setStep("preview")
  }

  const openGallery = () => {
    fileInputRef.current.click()
  }

  const handleGalleryImage = (event) => {

    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = (e) => {
      setImage(e.target.result)
      setStep("preview")
    }

    reader.readAsDataURL(file)
  }

  const analyzeImage = async () => {

    setStep("analysis")

    try {

      const blob = await fetch(image).then(res => res.blob())

      const formData = new FormData()

      formData.append("file", blob, "image.jpg")

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      setResult(data)

      setStep("result")

    } catch (err) {

      console.error(err)

      setResult({
        doenca: "Erro ao analisar imagem",
        confianca: 0
      })

      setStep("result")
    }
  }

  const reset = () => {
    setImage(null)
    setResult(null)
    setStep("start")
  }

  if (step === "start") {
    return (
      <div className="diagnostic-container">

        <h2 className="diagnostic-title">Diagnóstico de Doenças da Soja</h2>

        <button className="diagnostic-btn camera" onClick={startCamera}>
          📷 Tirar Foto
        </button>

        <button className="diagnostic-btn gallery" onClick={openGallery}>
          🖼 Escolher da Galeria
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleGalleryImage}
        />

      </div>
    )
  }

  if (step === "camera") {
    return (
      <CameraView
        videoRef={videoRef}
        onCapture={capturePhoto}
        onCancel={reset}
      />
    )
  }

  if (step === "preview") {
    return (
      <ImagePreview
        image={image}
        onBack={reset}
        onAnalyze={analyzeImage}
      />
    )
  }

  if (step === "analysis") {
    return <AnalysisLoader />
  }

  if (step === "result") {
    return (
      <DiagnosisResult
        result={result}
        onRestart={reset}
      />
    )
  }

}
