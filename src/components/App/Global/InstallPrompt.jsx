// components/App/Global/InstallPrompt.jsx
import { motion } from "framer-motion"
import { FaDownload, FaTimes, FaAndroid, FaApple, FaChrome, FaMobile } from 'react-icons/fa'
import '../../../styles/Global/InstallPrompt.css'

const InstallPrompt = ({ onInstall, onClose, isIOS, isAndroid, hasPrompt }) => {
  return (
    <motion.div 
      className="install-prompt-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="install-prompt"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="install-prompt-close" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="install-prompt-icon">
          <FaDownload size={32} />
        </div>
        
        <h3>Instalar AgroVoo</h3>
        
        <p className="install-subtitle">
          Tenha acesso rápido e offline ao app diretamente da sua área de trabalho!
        </p>

        {/* Instruções específicas por dispositivo */}
        <div className="device-instructions">
          {isIOS ? (
            <div className="ios-instructions">
              <div className="device-header">
                <FaApple size={24} />
                <span>iPhone / iPad</span>
              </div>
              <ol>
                <li>Toque no <strong>botão Compartilhar</strong> <span className="share-icon">📤</span></li>
                <li>Role para baixo e escolha <strong>"Adicionar à Tela de Início"</strong></li>
                <li>Toque em <strong>"Adicionar"</strong> no canto superior direito</li>
              </ol>
              <div className="instruction-note">
                <FaMobile size={16} />
                <span>O app aparecerá na sua tela inicial como um app nativo!</span>
              </div>
            </div>
          ) : isAndroid ? (
            <div className="android-instructions">
              <div className="device-header">
                <FaAndroid size={24} />
                <span>Android</span>
              </div>
              
              {hasPrompt ? (
                <>
                  <p className="ready-text">✅ Seu dispositivo está pronto para instalar!</p>
                  <button className="install-button" onClick={onInstall}>
                    <FaDownload /> Instalar AgroVoo
                  </button>
                </>
              ) : (
                <ol>
                  <li>Toque no <strong>menu ⋮</strong> (3 pontos) do Chrome</li>
                  <li>Selecione <strong>"Instalar app"</strong> ou <strong>"Adicionar à tela inicial"</strong></li>
                  <li>Confirme a instalação</li>
                </ol>
              )}
              
              <div className="instruction-note">
                <FaMobile size={16} />
                <span>Após instalar, o app abrirá automaticamente fora do navegador!</span>
              </div>
            </div>
          ) : (
            <div className="desktop-instructions">
              <div className="device-header">
                <FaChrome size={24} />
                <span>Computador</span>
              </div>
              
              {hasPrompt ? (
                <>
                  <p className="ready-text">✅ Pronto para instalar no seu computador!</p>
                  <button className="install-button" onClick={onInstall}>
                    <FaDownload /> Instalar AgroVoo
                  </button>
                </>
              ) : (
                <ol>
                  <li>Clique no <strong>ícone de instalação</strong> <span className="install-icon">⬇️</span> na barra de endereços</li>
                  <li>Selecione <strong>"Instalar"</strong></li>
                </ol>
              )}
            </div>
          )}
        </div>

        {/* Benefícios */}
        <div className="install-benefits">
          <div className="benefit-item">
            <span>✓ Acesso rápido</span>
          </div>
          <div className="benefit-item">
            <span>✓ Modo offline</span>
          </div>
          <div className="benefit-item">
            <span>✓ Sem navegador</span>
          </div>
        </div>

        {!hasPrompt && !isIOS && (
          <p className="install-note">
            ⚡ O botão de instalação aparecerá automaticamente quando disponível
          </p>
        )}

        <button className="install-prompt-later" onClick={onClose}>
          Instalar depois
        </button>
      </motion.div>
    </motion.div>
  )
}

export default InstallPrompt