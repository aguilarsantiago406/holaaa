import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BlowCandles = () => {
  const [candles, setCandles] = useState([
    { id: 1, lit: true },
    { id: 2, lit: true },
    { id: 3, lit: true },
  ]);
  const [allBlown, setAllBlown] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const blowCandle = (id) => {
    setCandles(prev => 
      prev.map(candle => 
        candle.id === id ? { ...candle, lit: false } : candle
      )
    );

    const allOut = candles.filter(c => c.id !== id).every(c => !c.lit);
    if (allOut) {
      setTimeout(() => {
        setAllBlown(true);
        setShowMessage(true);
      }, 500);
    }
  };

  const resetCandles = () => {
    setCandles([
      { id: 1, lit: true },
      { id: 2, lit: true },
      { id: 3, lit: true },
    ]);
    setAllBlown(false);
    setShowMessage(false);
  };

  return (
    <div className="blow-candles-container">
      <h3 className="blow-candles-title">¡Sopla las Velas! 🎂</h3>
      <p className="blow-candles-subtitle">Haz click en cada vela para apagarlas</p>
      
      <div className="candles-wrapper">
        {candles.map((candle) => (
          <motion.div
            key={candle.id}
            className="candle-container"
            whileHover={{ scale: 1.1 }}
            onClick={() => candle.lit && blowCandle(candle.id)}
          >
            <motion.div 
              className="candle-body"
              animate={{ 
                rotate: candle.lit ? [0, -2, 2, 0] : 0 
              }}
              transition={{ 
                duration: 0.5, 
                repeat: candle.lit ? Infinity : 0 
              }}
            >
              🕯️
            </motion.div>
            
            <AnimatePresence>
              {candle.lit && (
                <motion.div
                  className="candle-flame"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: 1,
                    y: [-2, -5, -2]
                  }}
                  exit={{ 
                    scale: 2, 
                    opacity: 0,
                    y: -20
                  }}
                  transition={{ 
                    duration: 0.5,
                    repeat: Infinity 
                  }}
                >
                  🔥
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="wish-message glass-morphism"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <div className="wish-emoji">🎉✨🎂✨🎉</div>
            <p className="wish-text">¡Que todos tus deseos se hagan realidad!</p>
            <button 
              className="reset-button"
              onClick={resetCandles}
            >
              Volver a encender 🕯️
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlowCandles;