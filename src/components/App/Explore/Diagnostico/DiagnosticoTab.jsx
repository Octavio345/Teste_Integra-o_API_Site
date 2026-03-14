import { useRef, useState, useEffect } from "react"

import CameraView from "./CameraView"
import ImagePreview from "./ImagePreview"
import AnalysisLoader from "./AnalysisLoader"
import DiagnosisResult from "./DiagnosisResult"

const API_URL = "https://octaviorezendesilva-api-doencas-soja.hf.space/predict"

export default function DiagnosticoTab({ active }) {

  const videoRef = useRef(null)
  const fileInputRef = useRef(null)

  const [step, setStep] = useState("start")
  const [capturedImage, setCapturedImage] = useState(null)
  const [result, setResult] = useState(null)

  const [stream, setStream] = useState(null)
  const [facingMode, setFacingMode] = useState("environment")

  // ===============================
  // INICIAR CAMERA
  // ===============================

  const startCamera = async () => {

    setStep("camera")

    try {

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode }
      })

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }

      setStream(mediaStream)

    } catch (err) {

      console.error("Erro ao acessar câmera:", err)

    }

  }

  // ===============================
  // TROCAR CAMERA
  // ===============================

  const switchCamera = () => {

    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }

    setFacingMode(prev =>
      prev === "environment" ? "user" : "environment"
    )

  }

  // ===============================
  // CAPTURAR FOTO
  // ===============================

  const captureImage = () => {

    const video = videoRef.current

    const canvas = document.createElement("canvas")

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext("2d")

    ctx.drawImage(video, 0, 0)

    const imageData = canvas.toDataURL("image/jpeg")

    setCapturedImage(imageData)

    setStep("preview")

  }

  // ===============================
  // GALERIA
  // ===============================

  const openGallery = () => {
    fileInputRef.current.click()
  }

  const handleGalleryImage = (event) => {

    const file = event.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = (e) => {

      setCapturedImage(e.target.result)

      setStep("preview")

    }

    reader.readAsDataURL(file)

  }

  // ===============================
  // ANALISAR IMAGEM
  // ===============================

  const analyzeImage = async () => {

    setStep("analysis")

    try {

      const blob = await fetch(capturedImage).then(res => res.blob())

      const formData = new FormData()

      formData.append("file", blob, "image.jpg")

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      setResult(data)

      setStep("result")

    } catch (error) {

      console.error("Erro ao analisar imagem:", error)

      setResult({
        erro: "Erro ao comunicar com a IA"
      })

      setStep("result")

    }

  }

  // ===============================
  // RESET
  // ===============================

  const reset = () => {

    setCapturedImage(null)
    setResult(null)
    setStep("start")

  }

  // ===============================
  // PROTEÇÃO TROCA DE ABA
  // ===============================

  useEffect(() => {

    if (!active && videoRef.current?.srcObject) {

      const tracks = videoRef.current.srcObject.getTracks()

      tracks.forEach(track => track.stop())

    }

  }, [active])

  // ===============================
  // PROTEÇÃO APP MINIMIZADO
  // ===============================

  useEffect(() => {

    const handleVisibility = () => {

      if (document.hidden && videoRef.current?.srcObject) {

        const tracks = videoRef.current.srcObject.getTracks()

        tracks.forEach(track => track.stop())

      }

    }

    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility)
    }

  }, [])

  // ===============================
  // RENDER
  // ===============================

  if (step === "start") {

    return (

      <div className="diagnostic-start">

        <h2>Diagnóstico de Doenças da Soja</h2>

        <button onClick={startCamera} className="diagnostic-btn">
          📷 Tirar foto
        </button>

        <button onClick={openGallery} className="diagnostic-btn">
          🖼 Escolher da galeria
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
        onCapture={captureImage}
        onSwitchCamera={switchCamera}
        onClose={reset}
      />

    )

  }

  if (step === "preview") {

    return (

      <ImagePreview
        image={capturedImage}
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
