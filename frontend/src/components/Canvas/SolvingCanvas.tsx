import React, { useEffect, useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';

const styles = {
  canvasContainer: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginTop: '20px'
  },
  controls: {
    display: 'flex',
    gap: '10px',
    marginBottom: '12px'
  },
  button: {
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    transition: 'all 0.2s ease'
  },
  clearButton: {
    background: '#ef4444',
    color: 'white'
  },
  undoButton: {
    background: '#f59e0b',
    color: 'white'
  },
  colorPicker: {
    width: '30px',
    height: '30px',
    padding: '0',
    border: '2px solid #e5e7eb',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  brushSize: {
    width: '100px'
  },
  saveButton: {
    background: '#10b981',
    color: 'white'
  },
  loadButton: {
    background: '#6366f1',
    color: 'white'
  }
};

const updatedStyles = {
  ...styles,
  statusMessage: {
    textAlign: 'center' as const,
    color: '#10b981',
    fontWeight: 'bold',
    marginBottom: '10px',
    height: '24px',
    fontSize: '14px'
  }
};

export const SolvingCanvas: React.FC = () => {
  const canvasRef = useRef<any>(null);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushRadius, setBrushRadius] = useState(3);
  const [savedDrawings, setSavedDrawings] = useState<string[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('savedDrawings');
    if (saved) {
      setSavedDrawings(JSON.parse(saved));
    }
  }, []);


  const handleClear = () => {
    canvasRef.current.clear();
  };

  const handleUndo = () => {
    canvasRef.current.undo();
  };

  const handleSave = () => {
    if (canvasRef.current) {
      const data = canvasRef.current.getSaveData();
      localStorage.setItem('lastDrawing', data);
      setStatus('✅ Drawing saved successfully!');
      setTimeout(() => setStatus(''), 2000); 
    }
  };

  const handleLoad = () => {
    const savedData = localStorage.getItem('lastDrawing');
    if (savedData && canvasRef.current) {
      canvasRef.current.loadSaveData(savedData, true);
      setStatus('✨ Drawing loaded successfully!');
      setTimeout(() => setStatus(''), 2000);
    }
  };
  return (
    <div style={updatedStyles.canvasContainer}>
      <div style={updatedStyles.controls}>
        <button 
          style={{ ...styles.button, ...styles.clearButton }}
          onClick={handleClear}
        >
          🗑️ Clear
        </button>
        <button 
          style={{ ...styles.button, ...styles.undoButton }}
          onClick={handleUndo}
        >
          ↩️ Undo
        </button>
        <button 
          style={{ ...styles.button, ...styles.saveButton }}
          onClick={handleSave}
        >
          💾 Save
        </button>
        <button 
          style={{ ...styles.button, ...styles.loadButton }}
          onClick={handleLoad}
        >
          📂 Load Last
        </button>
        <input
          type="color"
          value={brushColor}
          onChange={(e) => setBrushColor(e.target.value)}
          style={styles.colorPicker}
          title="Select color"
        />
        <input
          type="range"
          min="1"
          max="10"
          value={brushRadius}
          onChange={(e) => setBrushRadius(Number(e.target.value))}
          style={styles.brushSize}
          title="Brush size"
        />
      </div>

      <div style={updatedStyles.statusMessage}>
        {status}
      </div>      
      
      <CanvasDraw
        ref={canvasRef}
        brushColor={brushColor}
        brushRadius={brushRadius}
        lazyRadius={0}
        canvasWidth={window.innerWidth < 700 ? window.innerWidth - 64 : 650}
        canvasHeight={400}
        hideGrid
        backgroundColor="#f8fafc"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
};
