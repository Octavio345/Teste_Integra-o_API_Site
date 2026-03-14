export default function ImagePreview({ image, onBack, onAnalyze }) {

  return (

    <div className="preview-container">

      <h2>Pré-visualização</h2>

      <img
        src={image}
        alt="Imagem selecionada"
        className="preview-image"
      />

      <div className="preview-actions">

        <button className="btn back" onClick={onBack}>
          🔄 Nova Imagem
        </button>

        <button className="btn analyze" onClick={onAnalyze}>
          🤖 Analisar com IA
        </button>

      </div>

    </div>

  )
}
