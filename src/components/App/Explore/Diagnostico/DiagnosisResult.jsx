export default function DiagnosisResult({ result, onRestart }) {

  const disease = result?.doenca || "Não identificado"
  const confidence = result?.confianca || 0

  const percent = (confidence * 100).toFixed(2)

  return (

    <div className="diagnosis-result">

      <h2>Resultado do Diagnóstico</h2>

      <p><b>Doença detectada:</b> {disease}</p>

      <p><b>Confiança da IA:</b> {percent}%</p>

      {result?.probabilidades && (

        <div>

          <h3>Outras probabilidades</h3>

          <ul>

            {Object.entries(result.probabilidades).map(([name, value]) => (

              <li key={name}>
                {name}: {(value * 100).toFixed(2)}%
              </li>

            ))}

          </ul>

        </div>

      )}

      <button onClick={onRestart}>
        Novo Diagnóstico
      </button>

    </div>

  )

}
