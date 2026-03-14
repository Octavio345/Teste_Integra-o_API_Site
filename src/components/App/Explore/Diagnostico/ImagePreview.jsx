import React from "react";

export default function ImagePreview({ image, onBack, onAnalyze }) {

  if (!image) {
    return null;
  }

  return (

    <div className="image-preview-container">

      <h2>Prévia da Imagem</h2>

      {/* IMAGEM */}

      <div className="preview-image">

        <img
          src={image}
          alt="Imagem capturada"
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "12px",
            objectFit: "cover"
          }}
        />

      </div>

      {/* TEXTO */}

      <p style={{ marginTop: "10px", color: "#666" }}>
        Verifique se a folha está visível antes de analisar.
      </p>

      {/* BOTÕES */}

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
          justifyContent: "center"
        }}
      >

        <button
          onClick={onBack}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            background: "#6b7280",
            color: "white",
            cursor: "pointer"
          }}
        >
          Voltar
        </button>

        <button
          onClick={onAnalyze}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            background: "#16a34a",
            color: "white",
            cursor: "pointer"
          }}
        >
          Analisar com IA
        </button>

      </div>

    </div>
  );
}
