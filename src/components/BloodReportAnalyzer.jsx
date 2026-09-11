import React, { useState } from 'react';
import './BloodReportAnalyzer.css';

// Reference ranges & dietary recommendations
const BIOMARKER_RULES = {
  glucose: {
    label: 'Fasting Blood Sugar',
    unit: 'mg/dL',
    ranges: { low: [0, 69], normal: [70, 99], high: [100, Infinity] },
    advice: {
      low: 'Include complex carbs with proteins in meals; avoid skipping meals.',
      normal: 'Glucose levels are in an optimal range. Maintain balanced whole-food meals.',
      high: 'Focus on low-GI foods, increase soluble fiber (chia, oats, legumes), and reduce refined sugars.'
    }
  },
  vitaminD: {
    label: 'Vitamin D (25-OH)',
    unit: 'ng/mL',
    ranges: { low: [0, 29], normal: [30, 100], high: [101, Infinity] },
    advice: {
      low: 'Increase sun exposure, consume fatty fish, egg yolks, and consult for D3 supplementation.',
      normal: 'Optimal Vitamin D levels. Continue current lifestyle and moderate sun exposure.',
      high: 'Re-evaluate supplementation dosage with your doctor.'
    }
  },
  hemoglobin: {
    label: 'Hemoglobin',
    unit: 'g/dL',
    ranges: { low: [0, 11.9], normal: [12, 17.5], high: [17.6, Infinity] },
    advice: {
      low: 'Increase iron-rich foods (spinach, lentils, dark poultry) paired with Vitamin C for absorption.',
      normal: 'Hemoglobin level is normal, supporting optimal oxygen transport.',
      high: 'Ensure adequate hydration and discuss with a physician if persistent.'
    }
  },
  vitaminB12: {
    label: 'Vitamin B12',
    unit: 'pg/mL',
    ranges: { low: [0, 199], normal: [200, 900], high: [901, Infinity] },
    advice: {
      low: 'Incorporate B12-rich foods (dairy, eggs, fortified cereals) or discuss B12 supplementation.',
      normal: 'Optimal B12 levels supporting nervous system and energy production.',
      high: 'High levels are usually safe, but check for excess supplementation.'
    }
  },
  cholesterol: {
    label: 'Total Cholesterol',
    unit: 'mg/dL',
    ranges: { low: [0, 149], normal: [150, 199], high: [200, Infinity] },
    advice: {
      low: 'Ensure adequate dietary healthy fats (avocados, nuts, olive oil).',
      normal: 'Cholesterol is within the healthy range.',
      high: 'Increase Omega-3 fatty acids, reduce saturated/trans fats, and increase plant sterols.'
    }
  }
};

function BloodReportAnalyzer() {
  const [activeTab, setActiveTab] = useState('manual'); // 'manual' or 'upload'
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    glucose: '',
    vitaminD: '',
    hemoglobin: '',
    vitaminB12: '',
    cholesterol: ''
  });
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const evaluateBiomarkers = (data) => {
    const results = [];

    Object.keys(data).forEach((key) => {
      const val = parseFloat(data[key]);
      if (isNaN(val)) return;

      const rule = BIOMARKER_RULES[key];
      let status = 'normal';

      if (val >= rule.ranges.low[0] && val <= rule.ranges.low[1]) {
        status = 'low';
      } else if (val >= rule.ranges.high[0] && val <= rule.ranges.high[1]) {
        status = 'high';
      }

      results.push({
        key,
        label: rule.label,
        value: val,
        unit: rule.unit,
        status,
        advice: rule.advice[status]
      });
    });

    return results;
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);

    setTimeout(() => {
      const evaluated = evaluateBiomarkers(formData);
      setAnalysisResults(evaluated);
      setIsAnalyzing(false);
    }, 600);
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const processUploadedReport = () => {
    if (!file) return;
    setIsAnalyzing(true);

    // Mock OCR / AI parsing simulation
    setTimeout(() => {
      const mockParsedData = {
        glucose: '112',
        vitaminD: '24',
        hemoglobin: '13.5',
        vitaminB12: '340',
        cholesterol: '210'
      };

      setFormData(mockParsedData);
      setAnalysisResults(evaluateBiomarkers(mockParsedData));
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({ glucose: '', vitaminD: '', hemoglobin: '', vitaminB12: '', cholesterol: '' });
    setAnalysisResults(null);
    setFile(null);
  };

  return (
    <div className="analyzer-container">
      <div className="analyzer-header">
        <h2>🩸 Blood Report & Biomarker Analyzer</h2>
        <p>Get personalized dietary insights based on key clinical biomarkers.</p>
      </div>

      {/* Input Mode Selector */}
      <div className="tab-buttons">
        <button
          className={`tab-btn ${activeTab === 'manual' ? 'active' : ''}`}
          onClick={() => setActiveTab('manual')}
        >
          ✍️ Manual Values Entry
        </button>
        <button
          className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          📄 Upload PDF / Image
        </button>
      </div>

      {/* Upload Mode */}
      {activeTab === 'upload' && (
        <div className="upload-box">
          <input
            type="file"
            id="fileInput"
            accept=".pdf,.png,.jpeg,.jpg"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <label htmlFor="fileInput" className="dropzone">
            <span className="dropzone-icon">📁</span>
            <p>{file ? file.name : 'Click or Drag & Drop your blood report file here'}</p>
            <span className="file-types">Supports PDF, PNG, JPG</span>
          </label>

          {file && (
            <button
              className="analyze-btn"
              onClick={processUploadedReport}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? 'Extracting Lab Values...' : 'Analyze Uploaded File'}
            </button>
          )}
        </div>
      )}

      {/* Manual Input Mode */}
      {activeTab === 'manual' && (
        <form onSubmit={handleManualSubmit} className="biomarker-form">
          <div className="form-grid">
            {Object.keys(BIOMARKER_RULES).map((key) => {
              const rule = BIOMARKER_RULES[key];
              return (
                <div key={key} className="form-group">
                  <label htmlFor={key}>{rule.label} ({rule.unit})</label>
                  <input
                    type="number"
                    step="0.1"
                    id={key}
                    name={key}
                    placeholder={`e.g. ${rule.ranges.normal[0]}`}
                    value={formData[key]}
                    onChange={handleInputChange}
                  />
                </div>
              );
            })}
          </div>

          <div className="form-actions">
            <button type="submit" className="analyze-btn" disabled={isAnalyzing}>
              {isAnalyzing ? 'Evaluating...' : 'Analyze Biomarkers'}
            </button>
            <button type="button" className="reset-btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      )}

      {/* Results Output Section */}
      {analysisResults && (
        <div className="analysis-results">
          <h3>📋 Nutritional Evaluation & Action Plan</h3>

          <div className="results-grid">
            {analysisResults.map((item) => (
              <div key={item.key} className={`result-card status-${item.status}`}>
                <div className="card-header">
                  <h4>{item.label}</h4>
                  <span className={`status-badge ${item.status}`}>
                    {item.status.toUpperCase()}
                  </span>
                </div>

                <div className="value-display">
                  <span className="val-num">{item.value}</span>
                  <span className="val-unit">{item.unit}</span>
                </div>

                <p className="recommendation">
                  <strong>Dietary Recommendation:</strong> {item.advice}
                </p>
              </div>
            ))}
          </div>

          <div className="disclaimer-box">
            ⚠️ <strong>Medical Disclaimer:</strong> This automated tool provides general dietary guidance from Nourish Hub and does not replace professional medical advice or diagnosis. Always consult with Raji or your primary care physician before making drastic diet changes.
          </div>
        </div>
      )}
    </div>
  );
}

export default BloodReportAnalyzer;