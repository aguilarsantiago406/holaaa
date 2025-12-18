import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EasterEggs = () => {
  const [foundEggs, setFoundEggs] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const easterEggs = [
    { id: 1, position: { top: '15%', right: '5%' }, emoji: '🎁', hint: 'Esquina superior derecha' },
    { id: 2, position: { bottom: '20%', left: '3%' }, emoji: '💎', hint: 'Cerca del timeline' },
    { id: 3, position: { top: '60%', right: '8%' }, emoji: '🌟', hint: 'En la galería' },
  ];

  const findEgg = (id) => {
    if (!foundEggs.includes(id)) {
      setFoundEggs(prev => [...prev, id]);
      
      if (foundEggs.length + 1 === easterEggs.length) {
        setTimeout(() => setShowReward(true), 500);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 10000); // Mostrar pista después de 10 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Easter Eggs Ocultos */}
      {easterEggs.map(egg => (
        !foundEggs.includes(egg.id) && (
          <motion.div
            key={egg.id}
            className="easter-egg"
            style={egg.position}
            onClick={() => findEgg(egg.id)}
            whileHover={{ scale: 1.2, rotate: 360 }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            {egg.emoji}
          </motion.div>
        )
      ))}

      {/* Contador de Easter Eggs */}
      {foundEggs.length > 0 && (
        <motion.div
          className="egg-counter glass-morphism"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          🥚 {foundEggs.length}/{easterEggs.length}
        </motion.div>
      )}

      {/* Pista */}
      <AnimatePresence>
        {showHint && foundEggs.length < easterEggs.length && (
          <motion.div
            className="easter-hint glass-morphism"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <p>💡 Pista: Busca {easterEggs.length} sorpresas escondidas en la página</p>
            <button onClick={() => setShowHint(false)}>Entendido</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recompensa */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            className="easter-reward"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <motion.div
              className="reward-content glass-morphism"
              animate={{
                rotate: [0, 360]
              }}
              transition={{ duration: 1 }}
            >
              <h2>🎉 ¡Felicidades! 🎉</h2>
              <p>¡Encontraste todas las sorpresas secretas!</p>
              <p className="reward-message">Eres tan curiosa y especial como Liz Leydi 💖</p>
              <button onClick={() => setShowReward(false)}>Cerrar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EasterEggs;