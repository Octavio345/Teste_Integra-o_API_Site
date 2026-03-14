import React from "react";

export default function DiagnosisResult({ image, result, onReset }) {

  if (!result) {
    return null;
  }

  const getSeverityColor = (severity) => {

    switch (severity) {

      case "Leve":
        return "#22c55e";

      case "Moderada":
        return "#f59e0b";

      case "Grave":
        return "#ef4444";

      default:
        return "#64748b";
    }
  };

  return (

    <div className="diagnosis-result">

      <h2>Resultado do Diagnóstico</h2>

      {/* IMAGEM ANALISADA */}

      <div className="result-image">

        <img
          src={image}
          alt="Folha analisada"
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "12px"
          }}
        />

      </div>

      {/* DOENÇA */}

      <div className="result-disease">

        <h3>{result.disease}</h3>

        <p>
          Confiança da IA: <strong>{result.confidence}%</strong>
        </p>

      </div>

      {/* SEVERIDADE */}

      {result.severity && (

        <div
          style={{
            background: getSeverityColor(result.severity),
            padding: "8px 16px",
            borderRadius: "8px",
            color: "white",
            display: "inline-block",
            marginBottom: "15px"
          }}
        >
          Severidade: {result.severity}
        </div>

      )}

      {/* DESCRIÇÃO */}

      {result.description && (

        <div className="result-section">

          <h4>Descrição</h4>

          <p>{result.description}</p>

        </div>

      )}

      {/* TRATAMENTO */}

      {result.treatment && (

        <div className="result-section">

          <h4>Tratamento</h4>

          <p>{result.treatment}</p>

        </div>

      )}

      {/* PREVENÇÃO */}

      {result.prevention && (

        <div className="result-section">

          <h4>Prevenção</h4>

          <p>{result.prevention}</p>

        </div>

      )}

      {/* BOTÃO */}

      <div style={{ marginTop: "20px" }}>

        <button
          onClick={onReset}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            background: "#16a34a",
            color: "white",
            cursor: "pointer"
          }}
        >
          Novo Diagnóstico
        </button>

      </div>

    </div>
  );
}
