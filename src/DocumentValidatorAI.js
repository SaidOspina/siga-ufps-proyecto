import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, Brain, Users, BarChart3, Settings } from 'lucide-react';

const DocumentValidatorAI = () => {
  const [activeTab, setActiveTab] = useState('training');
  const [trainingDocs, setTrainingDocs] = useState({
    valid: [],
    invalid: []
  });
  const [validationResults, setValidationResults] = useState([]);
  const [modelTrained, setModelTrained] = useState(false);
  const [isTraining, setIsTraining] = useState(false);

  // Simulación de características extraídas de documentos
  const extractFeatures = (file) => {
    const features = {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      hasValidExtension: /\.(pdf|jpg|jpeg|png)$/i.test(file.name),
      sizeInMB: (file.size / (1024 * 1024)).toFixed(2),
      timestamp: Date.now()
    };
    
    // Simulación de análisis más profundo del contenido
    const randomFeatures = {
      hasRequiredFields: Math.random() > 0.3,
      textQuality: Math.random(),
      documentStructure: Math.random(),
      signaturePresent: Math.random() > 0.5,
      dateValid: Math.random() > 0.2,
      contentRelevance: Math.random()
    };
    
    return { ...features, ...randomFeatures };
  };

  // Agregar documentos de entrenamiento
  const addTrainingDocument = (type, files) => {
    if (!files || files.length === 0) return;
    
    const newDocs = Array.from(files).map(file => {
      const features = extractFeatures(file);
      return {
        id: Date.now() + Math.random(),
        name: file.name,
        type: type,
        features: features,
        addedAt: new Date().toLocaleString()
      };
    });

    setTrainingDocs(prev => ({
      ...prev,
      [type]: [...prev[type], ...newDocs]
    }));
  };

  // Entrenar el modelo (simulación)
  const trainModel = async () => {
    setIsTraining(true);
    
    // Simulación de entrenamiento con progreso
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setModelTrained(true);
    setIsTraining(false);
  };

  // Validar documento
  const validateDocument = (files) => {
    if (!modelTrained) {
      alert('Primero debe entrenar el modelo con documentos válidos e inválidos');
      return;
    }

    if (!files || files.length === 0) return;

    const results = Array.from(files).map(file => {
      const features = extractFeatures(file);
      
      // Simulación de predicción del modelo
      const validityScore = calculateValidityScore(features);
      const isValid = validityScore > 0.6;
      
      return {
        id: Date.now() + Math.random(),
        name: file.name,
        isValid: isValid,
        confidence: (validityScore * 100).toFixed(1),
        features: features,
        reasons: generateValidationReasons(features, isValid),
        validatedAt: new Date().toLocaleString()
      };
    });

    setValidationResults(prev => [...results, ...prev]);
  };

  // Calcular score de validez basado en características
  const calculateValidityScore = (features) => {
    let score = 0;

    if (features.hasValidExtension) score += 0.2;
    if (features.hasRequiredFields) score += 0.25;
    if (features.signaturePresent) score += 0.15;
    if (features.dateValid) score += 0.15;
    if (features.fileSize > 10000 && features.fileSize < 5000000) score += 0.1;
    
    score += features.textQuality * 0.1;
    score += features.documentStructure * 0.05;
    
    return Math.min(score, 1);
  };

  // Generar razones de validación
  const generateValidationReasons = (features, isValid) => {
    const reasons = [];
    
    if (!features.hasValidExtension) reasons.push('Formato de archivo no válido');
    if (!features.hasRequiredFields) reasons.push('Faltan campos obligatorios');
    if (!features.signaturePresent) reasons.push('Falta firma o sello');
    if (!features.dateValid) reasons.push('Fecha inválida o expirada');
    if (features.fileSize < 10000) reasons.push('Archivo demasiado pequeño');
    if (features.fileSize > 5000000) reasons.push('Archivo demasiado grande');
    
    if (isValid && reasons.length === 0) {
      reasons.push('Documento cumple todos los criterios de validez');
    }
    
    return reasons;
  };

  const stats = {
    totalTraining: trainingDocs.valid.length + trainingDocs.invalid.length,
    validDocs: trainingDocs.valid.length,
    invalidDocs: trainingDocs.invalid.length,
    validatedDocs: validationResults.length,
    accuracyRate: validationResults.length > 0 ? 
      ((validationResults.filter(r => r.confidence > 80).length / validationResults.length) * 100).toFixed(1) : 0
  };

  return (
    <div className="container">
      <div className="main-card">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <div className="header-title">
              <Brain size={32} />
              <div>
                <h1>SIGA-UFPS</h1>
                <p>Sistema Inteligente de Validación de Documentos</p>
              </div>
            </div>
            <div className="header-stats">
              <div className="stat-item">
                <div className="stat-number">{stats.totalTraining}</div>
                <div className="stat-label">Docs Entrenamiento</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{stats.validatedDocs}</div>
                <div className="stat-label">Docs Validados</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="navigation">
          {[
            { id: 'training', label: 'Entrenamiento', icon: Users },
            { id: 'validation', label: 'Validación', icon: CheckCircle },
            { id: 'results', label: 'Resultados', icon: BarChart3 },
            { id: 'settings', label: 'Configuración', icon: Settings }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-button ${activeTab === tab.id ? 'active' : ''}`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="content">
          {/* Pestaña de Entrenamiento */}
          {activeTab === 'training' && (
            <div>
              <div className="upload-grid">
                {/* Documentos Válidos */}
                <div className="upload-area valid">
                  <CheckCircle size={48} color="#16a34a" className="upload-icon" />
                  <h3 className="upload-title" style={{color: '#166534'}}>
                    Documentos Válidos
                  </h3>
                  <p className="upload-description" style={{color: '#16a34a'}}>
                    Sube ejemplos de documentos correctos y completos
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => addTrainingDocument('valid', e.target.files)}
                    className="hidden"
                    id="valid-docs"
                  />
                  <label htmlFor="valid-docs" className="upload-button valid">
                    <Upload size={16} />
                    Subir Documentos Válidos
                  </label>
                  <div style={{marginTop: '16px', fontSize: '14px', color: '#166534'}}>
                    {trainingDocs.valid.length} documentos agregados
                  </div>
                </div>

                {/* Documentos Inválidos */}
                <div className="upload-area invalid">
                  <XCircle size={48} color="#dc2626" className="upload-icon" />
                  <h3 className="upload-title" style={{color: '#991b1b'}}>
                    Documentos Inválidos
                  </h3>
                  <p className="upload-description" style={{color: '#dc2626'}}>
                    Sube ejemplos de documentos incorrectos o incompletos
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => addTrainingDocument('invalid', e.target.files)}
                    className="hidden"
                    id="invalid-docs"
                  />
                  <label htmlFor="invalid-docs" className="upload-button invalid">
                    <Upload size={16} />
                    Subir Documentos Inválidos
                  </label>
                  <div style={{marginTop: '16px', fontSize: '14px', color: '#991b1b'}}>
                    {trainingDocs.invalid.length} documentos agregados
                  </div>
                </div>
              </div>

              {/* Botón de Entrenamiento */}
              {stats.totalTraining >= 4 && !modelTrained && (
                <div style={{textAlign: 'center', margin: '32px 0'}}>
                  <button
                    onClick={trainModel}
                    disabled={isTraining}
                    className="train-button"
                  >
                    <Brain size={20} />
                    {isTraining ? 'Entrenando Modelo...' : 'Entrenar Modelo de IA'}
                  </button>
                </div>
              )}

              {modelTrained && (
                <div className="success-message">
                  <CheckCircle size={24} />
                  ¡Modelo entrenado exitosamente! Ya puedes validar documentos.
                </div>
              )}

              {/* Lista de documentos de entrenamiento */}
              {stats.totalTraining > 0 && (
                <div style={{marginTop: '32px'}}>
                  <h4 style={{fontSize: '18px', fontWeight: '600', marginBottom: '16px'}}>
                    Documentos de Entrenamiento
                  </h4>
                  <div className="docs-grid">
                    {[...trainingDocs.valid, ...trainingDocs.invalid].map(doc => (
                      <div key={doc.id} className="doc-card">
                        <div className="doc-header">
                          <div className="doc-info">
                            <FileText size={16} color="#6b7280" />
                            <span className="doc-name">{doc.name}</span>
                          </div>
                          <span className={`doc-type ${doc.type}`}>
                            {doc.type === 'valid' ? 'Válido' : 'Inválido'}
                          </span>
                        </div>
                        <div className="doc-date">
                          Agregado: {doc.addedAt}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Pestaña de Validación */}
          {activeTab === 'validation' && (
            <div style={{textAlign: 'center'}}>
              <h3 style={{fontSize: '24px', fontWeight: '600', marginBottom: '16px'}}>
                Validar Nuevos Documentos
              </h3>
              <p style={{color: '#6b7280', marginBottom: '32px'}}>
                Sube los documentos que deseas validar con el modelo entrenado
              </p>
              
              {modelTrained ? (
                <div className="upload-area" style={{maxWidth: '500px', margin: '0 auto'}}>
                  <Upload size={64} color="#2563eb" className="upload-icon" />
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => validateDocument(e.target.files)}
                    className="hidden"
                    id="validate-docs"
                  />
                  <label htmlFor="validate-docs" className="upload-button">
                    <FileText size={20} />
                    Seleccionar y Validar Documentos
                  </label>
                </div>
              ) : (
                <div className="warning-message">
                  <Brain size={24} />
                  Primero debes entrenar el modelo con documentos válidos e inválidos
                </div>
              )}
            </div>
          )}

          {/* Pestaña de Resultados */}
          {activeTab === 'results' && (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px'}}>
                <h3 style={{fontSize: '24px', fontWeight: '600'}}>Resultados de Validación</h3>
                <div style={{fontSize: '14px', color: '#6b7280'}}>
                  Precisión del modelo: {stats.accuracyRate}%
                </div>
              </div>

              {validationResults.length === 0 ? (
                <div className="empty-state">
                  <BarChart3 size={64} className="empty-icon" />
                  <p>No hay resultados de validación aún</p>
                  <p style={{fontSize: '14px'}}>Los resultados aparecerán aquí después de validar documentos</p>
                </div>
              ) : (
                <div className="results-grid">
                  {validationResults.map(result => (
                    <div key={result.id} className={`result-card ${result.isValid ? 'valid' : 'invalid'}`}>
                      <div className="result-header">
                        <div className="result-info">
                          {result.isValid ? (
                            <CheckCircle size={24} color="#16a34a" />
                          ) : (
                            <XCircle size={24} color="#dc2626" />
                          )}
                          <div>
                            <div style={{fontWeight: '600'}}>{result.name}</div>
                            <div style={{fontSize: '14px', color: '#6b7280'}}>
                              Validado: {result.validatedAt}
                            </div>
                          </div>
                        </div>
                        <div className="result-status">
                          <div className={`status-label ${result.isValid ? 'valid' : 'invalid'}`}>
                            {result.isValid ? 'VÁLIDO' : 'INVÁLIDO'}
                          </div>
                          <div className="confidence">
                            Confianza: {result.confidence}%
                          </div>
                        </div>
                      </div>
                      
                      <div className="analysis-section">
                        <h5>Análisis detallado:</h5>
                        <ul className="analysis-list">
                          {result.reasons.map((reason, idx) => (
                            <li key={idx} className={`analysis-item ${result.isValid ? 'valid' : 'invalid'}`}>
                              <span className="dot"></span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Pestaña de Configuración */}
          {activeTab === 'settings' && (
            <div>
              <h3 style={{fontSize: '24px', fontWeight: '600', marginBottom: '24px'}}>
                Configuración del Sistema
              </h3>
              
              <div className="settings-grid">
                <div className="settings-card">
                  <h4>Parámetros del Modelo</h4>
                  <div className="form-group">
                    <label className="form-label">
                      Umbral de Confianza
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="0.95"
                      step="0.05"
                      defaultValue="0.6"
                      className="form-range"
                    />
                    <div className="form-help">60% - Mínimo para considerar válido</div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Tamaño máximo de archivo (MB)
                    </label>
                    <input
                      type="number"
                      defaultValue="5"
                      className="form-input"
                      min="1"
                      max="50"
                    />
                  </div>
                </div>

                <div className="settings-card">
                  <h4>Estadísticas del Sistema</h4>
                  <div className="stats-item">
                    <span className="stats-label">Documentos válidos:</span>
                    <span className="stats-value valid">{stats.validDocs}</span>
                  </div>
                  <div className="stats-item">
                    <span className="stats-label">Documentos inválidos:</span>
                    <span className="stats-value invalid">{stats.invalidDocs}</span>
                  </div>
                  <div className="stats-item">
                    <span className="stats-label">Total validaciones:</span>
                    <span className="stats-value">{stats.validatedDocs}</span>
                  </div>
                  <div className="stats-item">
                    <span className="stats-label">Precisión:</span>
                    <span className="stats-value primary">{stats.accuracyRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentValidatorAI;